//settings args and titles etc
var args = arguments[0] || {};
$.parentController = args.parentTab;
$.child_window2.title = args.genre;
//require alloy
var alloy = require('alloy');
//open our db object
var db = Ti.Database.open("Things");
//db.execute("CREATE TABLE IF NOT EXISTS my_events(id INTEGER PRIMARY KEY UNIQUE, event_name TEXT, event_date TEXT,status TEXT);");

if(Ti.Platform.name != "android" )
{
    //apparently apple will reject apps backing up unnecessary files so setting the local db to not be backed up.
    db.file.setRemoteBackup(false);    
}


/* This is the section to handle filter of resuls */
var menubutton = Ti.UI.createButton({
        title:'Filter',
        id: "menubutton",
        objName: "menubutton",
        image: "filter.png",
        style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN, 
});
var filterView =  Titanium.UI.createView({
    width:205,
    height:200,
    backgroundImage:"bubble_big.png",
    top:0,
    right:3,
    opacity:0,
    zIndex:100,
    layout:"vertical",
    borderRadius: 5
});
var filterLabel =  Titanium.UI.createLabel({
    text:'Filter events',
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
//list view for the tooltip window
// var listView = Ti.UI.createListView({
    // style: Titanium.UI.iPhone.ListViewStyle.GROUPED,
    // width:185,
    // height: 185,
    // borderRadius: 5,
    // // top:16,
// });
// var sections = [];
// var DateSection = Ti.UI.createListSection({
        // headerTitle: "Dates",
        // className: "listheader",
        // width: 195,
        // font:{
            // fontFamily: "Helvetica Neue",
            // fontSize:10,
        // }
    // });
// var dateDataSet = [
    // { properties: { 
        // title: "Next seven days",
        // itemid: "next_7_days",
        // accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_CHECKMARK,
        // height: 20,
        // font:{
            // fontFamily: "Helvetica Neue",
            // fontSize:10,
            // },
        // }},
    // { properties: { 
        // title: "Today",
        // itemid: "today",
        // height: 20,
        // font:{
            // fontFamily: "Helvetica Neue",
            // fontSize:10,
            // },
        // }},
    // { properties: { 
        // title: "Tomorrow",
        // itemid: "tomorrow",
        // height: 20,
        // font:{
            // fontFamily: "Helvetica Neue",
            // fontSize:10,
            // },
        // }},
    // { properties: { 
        // title: "Next three days",
        // itemid: "next_3_days",
        // height: 20,
        // font:{
            // fontFamily: "Helvetica Neue",
            // fontSize:10,
            // },
        // }},
// ];
// DateSection.setItems(dateDataSet);
// sections.push(DateSection);
// 
// var WhereSection = Ti.UI.createListSection({
        // headerTitle: "Where",
        // height: 25,
        // width: 195,
        // font:{
            // fontFamily: "Helvetica Neue",
            // fontSize:10,
        // }
// });
// var whereDataSet = [
    // { properties: { 
        // title: "Anywhere",
        // itemid: "anywhere",
        // accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_CHECKMARK,
        // height: 20,
        // font:{
            // fontFamily: "Helvetica Neue",
            // fontSize:10,
            // },
        // }},
    // { properties: { 
        // title: "Within a half mile",
        // itemid: "within_half_mile",
        // height: 20,
        // font:{
            // fontFamily: "Helvetica Neue",
            // fontSize:10,
            // },
        // }},
    // { properties: { 
        // title: "Within one mile",
        // itemid: "within_1_mile",
        // height: 20,
        // font:{
            // fontFamily: "Helvetica Neue",
            // fontSize:10,
            // },
        // }},
    // { properties: { 
        // title: "Within five miles",
        // itemid: "within_5_miles",
        // height: 20,
        // font:{
            // fontFamily: "Helvetica Neue",
            // fontSize:10,
            // },
        // }},
// ];
// WhereSection.setItems(whereDataSet);
// sections.push(WhereSection);
// var WhenSection = Ti.UI.createListSection({
        // headerTitle: "When",
        // width: 195,
        // font:{
            // fontFamily: "Helvetica Neue",
            // fontSize:10,
        // }
// });
// var whenDataSet = [
    // { properties: { 
        // title: "Any time",
        // itemid: "any_time",
        // accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_CHECKMARK,
        // height: 20,
        // font:{
            // fontFamily: "Helvetica Neue",
            // fontSize:10,
            // },
        // }},
     // { properties: { 
        // title: "Morning",
        // itemid: "morning",
        // height: 20,
        // font:{
            // fontFamily: "Helvetica Neue",
            // fontSize:10,
            // },
        // }},
     // { properties: { 
        // title: "Afternoon",
        // itemid: "afternoon",
        // height: 20,
        // font:{
            // fontFamily: "Helvetica Neue",
            // fontSize:10,
            // },
        // }},
     // { properties: { 
        // title: "Evening",
        // itemid: "evening",
        // height: 20,
        // font:{
            // fontFamily: "Helvetica Neue",
            // fontSize:10,
            // },
        // }},
// ];
// WhenSection.setItems(whenDataSet);
// sections.push(WhenSection);
// listView.sections = sections;
// filterView.add(listView);

var when = new Array();
when[0] = "when_7_days";
when[1] = "Next 7 Days";
var where = new Array();
where[0] = "where_anywhere";
where[1] = "Anywhere";
var time = new Array();
time[0] = "time_anytime";
time[1] = "Anytime";

var data = [
    {title:'When? ' + when[1], itemid:"when", hasChild:true, selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
    {title:'Where? ' + where[1], itemid: "where", hasChild:true,  selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
    {title:'What time? ' + time[1], itemid:"time", hasChild:true, selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
];
// create table view
var tableview = Titanium.UI.createTableView({
    data:data,
    font:{fontSize:10},
    height: Ti.UI.SIZE,
    width: 180,
    rowHeight:25,
    borderRadius: 5,
});
tableview.addEventListener('click',function(e){
    //Ti.API.info( e.source.itemid + ' has been clicked');
    //setting the checkmark
    e.source.hasCheck = true;
   if( e.source.itemid == "when" )
   {
       var when_data = [
            {title:'Next 7 days', itemid:"when_7_days", hasCheck: ( when == "when_7_days") ? true : false, selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
            {title:'Today', itemid: "when_today", hasCheck: ( when == "when_today" ) ? true : false, selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
            {title:'Tomorrow', itemid:"when_tomorrow", hasCheck: ( when == "when_tomorrow"  ) ? true : false, selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
            {title:'Next 3 days', itemid:"when_3_days",hasCheck: ( e.source.itemid == "when_3_days" ) ? true : false, selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
            // {title:'Go Back', itemid:"go_back", selectedColor:'#fff',font:{fontSize:12,fontStyle:"italic"}},
       ];
       tableview.setData( when_data);
   } 
   else if( e.source.itemid == "where" )
   {
       var where_data = [
            {title:'Within a half mile', itemid:"where_half_mile", hasCheck: ( where == "where_half_mile" ) ? true : false, selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
            {title:'Within 1 mile', itemid: "where_one_mile", hasCheck: ( where == "where_one_mile" ) ? true : false, selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
            {title:'Within 5 miles', itemid:"where_5_miles", hasCheck: ( where == "where_5_miles" ) ? true : false, selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
            {title:'Anywhere', itemid:"where_anywhere",hasCheck: ( where == "where_anywhere" ) ? true : false,selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
            // {title:'Go Back', itemid:"go_back", selectedColor:'#fff',font:{fontSize:12,fontStyle:"italic"}},
       ];
       tableview.setData( where_data );
   }
   else if(e.source.itemid == "time")
   {
       var time_data = [
            {title:'Any time', itemid:"time_anytime", hasCheck: ( time == "time_anytime" ) ? true : false,selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
            {title:'Morning', itemid: "time_morning",  hasCheck: ( time == "time_morning" ) ? true : false,selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
            {title:'Afternoon', itemid:"time_afternoon", hasCheck: ( time == "time_afternoon") ? true : false,selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
            {title:'Evening', itemid:"time_evening",hasCheck: ( time == "time_evening" ) ? true : false,selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
            // {title:'Go Back', itemid:"go_back", selectedColor:'#fff',font:{fontSize:12,fontStyle:"italic"}},
       ];
       tableview.setData( time_data);
   }
   else{
        //setting the table back to it's default data.'
      
       Ti.API.info( e.source.itemid + " has been clicked!");
       var tmp = e.source.itemid.split("_")[0];
       if(tmp == "when")
       {
           when[0] = e.source.itemid;
           when[1] = e.source.title;
       }
       else if( tmp == "where" )
       {
           where[0] = e.source.itemid;
           where[1] = e.source.title;
       }
       else if(tmp == "time")
       {
           time[0] = e.source.itemid;
           time[1] = e.source.title;
       }
       var data = [
            {title:'When? ' + when[1], itemid:"when", hasChild:true, selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
            {title:'Where? ' + where[1], itemid: "where", hasChild:true,  selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
            {title:'What time? ' + time[1], itemid:"time", hasChild:true, selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
        ];
       tableview.setData(data);
   }
});
filterView.add(tableview);
$.child_window2.add(filterView);
/* end of filtering section */
//animation stuff
var anim_out = Titanium.UI.createAnimation();
anim_out.opacity=0;
anim_out.duration = 250;
var anim_in = Ti.UI.createAnimation();
anim_in.opacity=1;
anim_in.duration = 250;
var animated = "out";
//Ti.API.info( "menu button created" + menubutton );
//setting the button on the current window
$.child_window2.setRightNavButton(menubutton);
//adding a call back
menubutton.addEventListener('click', function(e)
{
   //Ti.API.info( "menu button clicked");
   if( animated != "in" )
   {
       filterView.animate(anim_in);
       animated = "in";
   }
   else
   {
       filterView.animate(anim_out);
       animated = "out";
   }
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
        //Ti.API.info("temp row: " + temp_row);
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

    //Ti.API.info("CustomData: " + CustomData);
    var data = [];
    // for (var i = CustomData.length - 1; i <= 0; i--)
    for (var i = 0; i < CustomData.length; i++) {
        // //Ti.API.info("CustomData[i]" + CustomData[i]);
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
        //Ti.API.info(pic + " " + pic.image);
        pic.addEventListener('error', function(e) {
            //Ti.API.info(e.source.image + " did not load!");
        });
        pic.addEventListener('load', function(e) {
            //Ti.API.info(e.source.image + " loaded properly!");

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
            // //Ti.API.info("going button in event listing clicked");
            
            var check_query = "SELECT * from my_events where id = '" + e.source.eventID + "'";
            //Ti.API.info( "check_query = " + check_query);
            var check_rs = db.execute( check_query );
            if( check_rs.isValidRow() )
            {
                // //Ti.API.info("event already exists in my events");
                var query = "DELETE FROM my_events where id='"+ e.source.eventID +"'";
                db.execute(query);
                //reversing the button colors if you hit i'm going.
                e.source.setBackgroundColor("white");
                e.source.setColor("#065365");
            }
            else
            {
                //if the event is not already in the db, then we add it.    
                var query = "INSERT INTO my_events(id,event_name,event_date,status)VALUES('" +  e.source.eventID +"','" + e.source.eventTitle + "', '9-30-13 5:00pm','going');";
                // //Ti.API.info( "query = " + query);
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
            //Ti.API.info("maybe button in event listing clicked");
            var check_query = "SELECT * from my_events where id = '" + e.source.eventID + "'";
            
            //Ti.API.info( "check_query = " + check_query);
            var check_rs = db.execute( check_query );
            if( check_rs.isValidRow() )
            {
                //Ti.API.info("event already exists in my events");
                var query = "DELETE FROM my_events where id='"+ e.source.eventID +"'";
                db.execute(query);
            }
            else
            {
                //if the event is not already in the db, then we add it.    
                var query = "INSERT INTO my_events(id,event_name,event_date,status)VALUES('" +  e.source.eventID +"','" + e.source.eventTitle + "', '9-30-13 5:00pm','interested');";
                //Ti.API.info( "query = " + query);
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
    // //Ti.API.info('detail ' + e.detail);
    // var msg = 'row ' + row + ' index ' + index + ' section ' + section + ' row data ' + rowdata;
    // if (islongclick) {
        // msg = "LONGCLICK " + msg;
    // }
    // 
    // //Ti.API.info(e.rowData.title + " ( " + e.rowData.eventID + " ) button clicked");
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