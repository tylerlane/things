//settings args and titles etc
var args = arguments[0] || {};
$.parentController = args.parentTab;
$.child_window2.title = args.genre;
//require alloy
var alloy = require('alloy');
//open our db object
var db = Ti.Database.open("Things");
db.execute("CREATE TABLE IF NOT EXISTS my_events(id INTEGER PRIMARY KEY UNIQUE, event_name TEXT, event_date TEXT,status TEXT);");
db.close();
var db = Ti.Database.open("Things");

if(Ti.Platform.name != "android" )
{
    //apparently apple will reject apps backing up unnecessary files so setting the local db to not be backed up.
    db.file.setRemoteBackup(false);    
}


//customizing the title bar button
var menubutton = Ti.UI.createButton({
        title:'Filter',
        id: "menubutton",
        objName: "menubutton",
        image: "filter.png",
        style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN, 
});
var filterView =  Titanium.UI.createView({
    width:205,
    height:57,
    backgroundImage:"bubble.png",
    top:0,
    right:3,
});
var filterLabel =  Titanium.UI.createLabel({
    text:'Continue reading',
    color:'#fff',
    width:205,
    height:34,
    top:16,
    font:{
        fontFamily:'Helvetica Neue',
        fontSize:13,
        fontWeight:'bold'
    },
    textAlign:'center'
    });
 
filterView.add(filterLabel);
$.child_window2.add(filterView);
//animation stuff
var anim_out = Titanium.UI.createAnimation();
anim_out.opacity=0;
anim_out.duration = 250;
Ti.API.info( "menu button created" + menubutton );
//setting the button on the current window
$.child_window2.setRightNavButton(menubutton);
//adding a call back
menubutton.addEventListener('click', function(e)
{
   Ti.API.info( "menu button clicked");
   var zindex = filterview.getZIndex();
   if( zindex == "undefined" || zindex !="100" )
   {
       filterview.setZIndex(100);
   }
   else
   {
       filterview.setZIndex(0);
   }
   filterView.animate(anim_out);
});

// 

var myRequest = Ti.Network.createHTTPClient({
    onload : function(e) {
        jsonObject = JSON.parse(this.responseText);
        var events = jsonObject;
        // $.textArea.value= genres.length;
        listEvents(events);
    },
    onerror : function(e) {
        alert(e.error);
    },
    timeout : 5000
});
myRequest.open("GET", "http://data.news-leader.com/things/genre/" + args.genre);
myRequest.send();

function listEvents(events) {
    // create table view data object
    var CustomData = [];
    for (var i = 0; i < events.length; i++) {
        var temp_row = {
            pic : "http://data-media.news-leader.com/" + events[i]["fields"]["main_photo"],
            title : events[i]["fields"]["name"],
            address : events[i]["fields"]["contact_address"],
            eventID : events[i]["pk"],
            excitement : events[i]["fields"]["excitement"],
            short_description : events[i]["fields"]["short_description"],
            date: events[i]["fields"]["date"],
            cost: events[i]["fields"]["cost_description"],
            resized : false
        };
        Ti.API.info("temp row: " + temp_row);
        CustomData.push(temp_row);
    }

    // // create table view
    var tableview = Titanium.UI.createTableView({
        id : "tableview",
        objName : 'tableview',
        maxRowHeight: 175,
        height: Ti.UI.Size,
        // search : search,
        // filterAttribute : title,
        // separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE
    });

    Ti.API.info("CustomData: " + CustomData);
    var data = [];
    // for (var i = CustomData.length - 1; i <= 0; i--)
    for (var i = 0; i < CustomData.length; i++) {
        // Ti.API.info("CustomData[i]" + CustomData[i]);
        var row = Titanium.UI.createTableViewRow({
            eventID : CustomData[i]["eventID"],
            // maxHeight : 200,
            pic : NaN,
            address : NaN,
            hasDetail : NaN,
            resized : false,
            layout: "horizontal",
            height: Ti.UI.SIZE,
            backgroundImage: "tableRowBackground.png",
            // backgroundColor: "#2a6970",
        });
        
        //setting up the di
        var pic = Titanium.UI.createImageView({
            image : CustomData[i].pic,
            backgoundColor: "white",
            width : 100,
            //height : 95,
            hires: true,
            preventDefaultImage:true,
            left : 2,
            top : 2
        });
        Ti.API.info(pic + " " + pic.image);
        pic.addEventListener('error', function(e) {
            Ti.API.info(e.source.image + " did not load!");
        });
        pic.addEventListener('load', function(e) {
            Ti.API.info(e.source.image + " loaded properly!");
            // if (!e.source.resized) {
                // //get the blob of the image
                // var blob = e.source.toImage();
                // 
                // var thumbnail = blob.imageAsThumbnail("100", "3", "5");
                // e.source.setImage(thumbnail);
                // Ti.API.info("generating thumbnail 100x100 (hopefully!)");
                // e.source.resized = true;
            // }
        });
        var event_view = Ti.UI.createView({
            layout: "vertical",
            //top: 2,
            right: 0,
            left: 2,
            height: Ti.UI.SIZE,
            width: 210,
                   
        });
        
        var title = Titanium.UI.createLabel({
            text : CustomData[i].title,
            font : {
                fontSize : 20,
                fontWeight : 'bold'
            },
            maxHeight: 100,
            width : 'auto',
            textAlign : 'left',
            // top : 2,
            // left : 110,
            // height : 'auto'
        });
        event_view.add(title);
        
        var where = Ti.UI.createLabel({
            text : "Where: " + CustomData[i].address,
            left: 0,
            font : {
                fontSize : 10,
                // fontWeight : 'bold',
            },
            width : Ti.UI.SIZE,
            textAlign : 'left',
            height : Ti.UI.SIZE
        });
        event_view.add(where);
         var when = Titanium.UI.createLabel({
            // text: CustomData[i].date,
            text: "When: ",
            font: {
                fontSize : 10,
                // fontWeight : 'bold'
            },
            width : Ti.UI.SIZE,
            textAlign : 'left',
            left: 0,
        });
        event_view.add(when);
        var cost = Ti.UI.createLabel({
            text : "Cost: " + CustomData[i].cost,
            left: 0,
            font : {
                fontSize : 10,
                // fontWeight : 'bold',
            },
            width : Ti.UI.SIZE,
            textAlign : 'left',
            height : Ti.UI.SIZE
        });
        event_view.add(cost);
        
        var description = Ti.UI.createLabel({
            text : CustomData[i].short_description,
            font : {
                fontSize : 10,
                // fontWeight: 'bold',
            },
            // width : 175,
            maxHeight: "45%",
            minHeight: Ti.UI.SIZE,
            textAlign : 'left',
            left: 0,
            top: 0,
            // bottom : 50,
            // left : 110,
        });
        event_view.add(description);
        //buttons!
        button_view = Ti.UI.createView({
            layout: "horizontal",
            width: Ti.UI.SIZE,
            top: 3,
            bottom:0
        });
        var going_button = Ti.UI.createButton({
            eventID : CustomData[i]["eventID"],
            eventTitle: CustomData[i]["title"],
            title : "I'm Going!",
            width : "45%",
            height : "15",
            // bottom : 0,
            // left : 115,
            font : {
                fontSize : 10,
            },
            bubbleParent: false,
            style: 'none',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 5,
            color: "#065365",
            backgroundColor: "white"
        });
        
        going_button.addEventListener('click', function(e) {
            // Ti.API.info("going button in event listing clicked");
            
            var check_query = "SELECT * from my_events where id = '" + e.source.eventID + "'";
            Ti.API.info( "check_query = " + check_query);
            var check_rs = db.execute( check_query );
            if( check_rs.isValidRow() )
            {
                // Ti.API.info("event already exists in my events");
                var query = "DELETE FROM my_events where id='"+ e.source.eventID +"'";
                db.execute(query);
                //reversing the button colors if you hit i'm going.
                e.source.setBackgroundColor("white");
                e.source.setColor("#065365");
            }
            else
            {
                //if the event is not already in the db, then we add it.    
                var query = "INSERT INTO my_events(id,event_name,event_date,status)VALUES('" +  e.source.eventID +"','" + e.source.eventTitle + "', '9-31-13 5:00pm','going');";
                // Ti.API.info( "query = " + query);
                db.execute(query);
                //reversing the button colors if you hit i'm going.
                e.source.setBackgroundColor("#065365");
                e.source.setColor("white");
            }
            check_rs.close();
        });
        button_view.add(going_button);
        var maybe_button = Ti.UI.createButton({
            title : "I'm Interested",
            eventID: CustomData[i]["eventID"],
            eventTitle: CustomData[i]["title"],
            style: 'none',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 5,
            color: "#065365",
            height : "15",
            left: 5,
            width: "45%",
            font : {
                fontSize : 10,
            },
            bubbleParent: false,
            style: 'none',
            backgroundColor: "white"
        });
        maybe_button.addEventListener('click', function(e) {
            Ti.API.info("maybe button in event listing clicked");
            var check_query = "SELECT * from my_events where id = '" + e.source.eventID + "'";
            
            Ti.API.info( "check_query = " + check_query);
            var check_rs = db.execute( check_query );
            if( check_rs.isValidRow() )
            {
                Ti.API.info("event already exists in my events");
                var query = "DELETE FROM my_events where id='"+ e.source.eventID +"'";
                db.execute(query);
            }
            else
            {
                //if the event is not already in the db, then we add it.    
                var query = "INSERT INTO my_events(id,event_name,event_date,status)VALUES('" +  e.source.eventID +"','" + e.source.eventTitle + "', '9-31-13 5:00pm','interested');";
                Ti.API.info( "query = " + query);
                db.execute(query);
            }
            check_rs.close();
            
        });
        button_view.add(maybe_button);
        event_view.add(button_view);
        row.add(pic);
        row.add(event_view);
        // row.add(title);
        // row.add(where);
        // row.add(address);
        // row.add(description);
        // row.add(going_button);
        // row.add(maybe_button);
        //row.add(when);

        // row.add(percent);
        // row.add(trend);
        // row.hasDetail = CustomData[i].hasDetail;

        row.className = 'EventListing';
        //send the row we made to our data
        data.push(row);
        tableview.setData(data);
    };

    // create table view event listener
    tableview.addEventListener('click', function(e) {
        showClickEventInfo(e);
    });
    tableview.addEventListener('longclick', function(e) {
        showClickEventInfo(e, true);
    });
    view.add(tableview);
}

function showClickEventInfo(e, islongclick) {
    // event data
    // var index = e.index;
    // var section = e.section;
    // var row = e.row;
    // var rowdata = e.rowData;
    // Ti.API.info('detail ' + e.detail);
    // var msg = 'row ' + row + ' index ' + index + ' section ' + section + ' row data ' + rowdata;
    // if (islongclick) {
        // msg = "LONGCLICK " + msg;
    // }
    // 
    // Ti.API.info(e.rowData.title + " ( " + e.rowData.eventID + " ) button clicked");
    //launching the event detail page
    var eventDetailController = Alloy.createController('EventDetail', {
        eventid : e.rowData.eventID,
        parentTab : args.parentTab
    });
    args.parentTab.open(eventDetailController.getView());
}

var scrollView = Ti.UI.createScrollView({
    contentWidth : 'auto',
    contentHeight : 'auto',
    showVerticalScrollIndicator : true,
    showHorizontalScrollIndicator : true,
    height : '100%',
    width : '100%'
});
var view = Ti.UI.createView({
    // backgroundColor:'#336699',
    borderRadius : 0,
    top : 0,
});
scrollView.add(view);
$.child_window2.add(scrollView);