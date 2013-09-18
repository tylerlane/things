//settings args and titles etc
var args = arguments[0] || {};
$.parentController = args.parentTab;
if( args.genre != "undefined" )
{
    $.child_window2.title = args.genre;    
}

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
    top:20,
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
        fontSize:16,
        fontWeight:'bold'
    },
    textAlign:'center'
    });
filterView.add(filterLabel);

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
//storage for our gps coords
function dataStorage() {
    this.lat;
    this.lon;
}
var g = new dataStorage();

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
       if( where !=" where_anywhere")
       {
           Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
 
            //
            //  SET DISTANCE FILTER.  THIS DICTATES HOW OFTEN AN EVENT FIRES BASED ON THE DISTANCE THE DEVICE MOVES
            //  THIS VALUE IS IN METERS
            //
            Titanium.Geolocation.distanceFilter = 10;
             
            //
            // GET CURRENT POSITION - THIS FIRES ONCE
            //
            
            Titanium.Geolocation.getCurrentPosition(function(e){
                if (e.error)
                {
                    alert('HFL cannot get your current location');
                    return;
                }
                g.lon = e.coords.longitude;
                g.lat = e.coords.latitude;
                var altitude = e.coords.altitude;
                var heading = e.coords.heading;
                var accuracy = e.coords.accuracy;
                var speed = e.coords.speed;
                var timestamp = e.coords.timestamp;
                var altitudeAccuracy = e.coords.altitudeAccuracy;
                
                Ti.API.info( "INSIDE the callback function. Lat: " + g.lat + " ; long: " + g.lon );
            });
       }
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
var filter_button_view = Ti.UI.createView({
    layout: "horizontal",
    left: 30,
    top: 10,
    width: Ti.UI.FILL,
    height: Ti.UI.SIZE
});
var reset_button = Ti.UI.createButton({
    title: "Reset",
    width : "35%",
    height : "25",
    // bottom : 0,
    // left : 115,
    font : {
        fontSize : 16,
    },
    bubbleParent: false,
    style: 'none',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    color: "#065365",
    backgroundColor: "white"
});
reset_button.addEventListener("click",function(e){
    Ti.API.info(" Reset button pressed. resetting the when/where/time vars and the tableview");
    when[0] = "when_7_days";
    when[1] = "Next 7 Days";
    where[0] = "where_anywhere";
    where[1] = "Anywhere";
    time[0] = "time_anytime";
    time[1] = "Anytime";
    //building the data for the table.
    var data = [
        {title:'When? ' + when[1], itemid:"when", hasChild:true, selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
        {title:'Where? ' + where[1], itemid: "where", hasChild:true,  selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
        {title:'What time? ' + time[1], itemid:"time", hasChild:true, selectedColor:'#fff',font:{fontSize:12,fontWeight:"bold"}},
    ];
    tableview.setData(data);
});

var filter_button = Ti.UI.createButton({
    title: "Filter",
    width : "35%",
    height : "25",
    // bottom : 0,
    left : 10,
    font : {
        fontSize : 16,
    },
    bubbleParent: false,
    style: 'none',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    color: "#065365",
    backgroundColor: "white" 
});
filter_button.addEventListener("click",function(e){
    var url = ""; 
    Ti.API.info("Filter button pressed");
    Ti.API.info("WHEN: " + when[0] + " ; WHERE: " + where[0] + " ; TIME: " + time[0]);
    url =  "http://data.news-leader.com/things/events/search?genre=" + args.genre + "&when=" + encodeURIComponent(when[0]) + "&time=" + encodeURIComponent(time[0]) + "&where=" + encodeURIComponent(where[0]);
    //if where has anything other than the default we need pull GPS coords
    if( where[0] != "where_anywhere" )
    {
        
        Ti.API.info( "Outside of the call back function. Lat: " + g.lat + " ; long: " + g.lon );
        url = url + "&lat=" + encodeURIComponent( g.lat );
        url = url + "&lng=" + encodeURIComponent( g.lon );
        // // Ti.API.info( "Coords = " + coords );
        // Ti.API.info( "Lat: " + latitude + " ; long: " + longitude );
    }
    Ti.API.info("URL: " + url );
    //now we can build the request url for the data server
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
    myRequest.open("GET", url );
    myRequest.send();  
    menubutton.fireEvent("click");
});
filter_button_view.add(reset_button);
filter_button_view.add(filter_button);
filterView.add(filter_button_view);
$.child_window2.add(filterView);
/* end of filtering section */
//animation stuff
var anim_out = Titanium.UI.createAnimation();
anim_out.opacity=0;
anim_out.duration = 250;
var anim_in = Ti.UI.createAnimation();
anim_in.opacity=1;
anim_in.duration = 250;
//var to hold the animation state.
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
var url = "";
if( args.name != undefined)
{
    //else it's a search'
    url = "http://data.news-leader.com/things/events/search?";
    //?genre=" + args.genre + "&when=" + encodeURIComponent(when[0]) + "&time=" + encodeURIComponent(time[0]) + "&where=" + encodeURIComponent(where[0]);
    if( args.genre != undefined )
    {
        url = url + "genre=" + encodeURIComponent(args.genre) + "&";
    }
    if( args.name != undefined || ar )
    {
        url = url + "name=" + encodeURIComponent(args.name) + "&";
    }
    
}
else
{   
    url = "http://data.news-leader.com/things/genre/" + encodeURIComponent(args.genre);
    //getting the events by genre
    myRequest.open("GET", "http://data.news-leader.com/things/genre/" + args.genre); 
}
Ti.API.info( "URL being fetched: " + url );
myRequest.open("GET", url);   
myRequest.send();

function listEvents(events) {
    // create table view data object
    var CustomData = [];
    if( events.length >= 1 )
    { 
        for (var i = 0; i < events.length; i++) {
            var temp_row = {
                pic : "http://data-media.news-leader.com/" + events[i]["fields"]["main_photo"],
                title : events[i]["fields"]["name"],
                address : events[i]["fields"]["contact_address"],
                eventID : events[i]["pk"],
                excitement : events[i]["fields"]["excitement"],
                short_description : events[i]["fields"]["short_description"],
                start_time : events[i]["fields"]["start_time"],
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
                    fontSize : 12,
                    // fontWeight : 'bold',
                },
                width : Ti.UI.SIZE,
                textAlign : 'left',
                height : Ti.UI.SIZE
            });
            event_view.add(where);
             var when = Titanium.UI.createLabel({
                // text: CustomData[i].date,
                text: "When: " + Date.parse(CustomData[i].start_time).toString("MMM d, yyyy hh:ss tt"),
                font: {
                    fontSize : 12,
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
                    fontSize : 12,
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
                    fontSize : 12,
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
                eventDate: CustomData[i]["start_time"],
                title : "I'm Going!",
                width : "45%",
                height : "15",
                // bottom : 0,
                // left : 115,
                font : {
                    fontSize : 12,
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
                    var query = "INSERT INTO my_events(id,event_name,event_date,status)VALUES('" +  e.source.eventID +"','" + e.source.eventTitle + "', '" + e.source.eventDate + "','going');";
                    // //Ti.API.info( "query = " + query);
                    db.execute(query);
                    //reversing the button colors if you hit i'm going.
                    e.source.setBackgroundColor("#065365");
                    e.source.setColor("white");
                }
                check_rs.close();
                apptentiveModule.presentMessageCenter(); 
            });
            button_view.add(going_button);
            var maybe_button = Ti.UI.createButton({
                title : "I'm Interested",
                eventID: CustomData[i]["eventID"],
                eventTitle: CustomData[i]["title"],
                eventDate: CustomData[i]["start_time"],
                style: 'none',
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 5,
                color: "#065365",
                height : "15",
                left: 5,
                width: "45%",
                font : {
                    fontSize : 12,
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
                    var query = "INSERT INTO my_events(id,event_name,event_date,status)VALUES('" +  e.source.eventID +"','" + e.source.eventTitle + "', '" + e.source.eventDate + "','interested');";
                    //Ti.API.info( "query = " + query);
                    db.execute(query);
                }
                check_rs.close();
                
            });
            button_view.add(maybe_button);
            event_view.add(button_view);
            row.add(pic);
            row.add(event_view);
            //  
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
    else
    {
        var tableview = Titanium.UI.createTableView({
            id : "tableview",
            objName : 'tableview',
            //maxRowHeight: 175,
            height: Ti.UI.Size,
            // search : search,
            // filterAttribute : title,
            // separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE
        });
        var data = [
            {title:'No Events returned. Please try a different category or search'},
            // {title:'Go Back', itemid:"go_back", selectedColor:'#fff',font:{fontSize:12,fontStyle:"italic"}},
       ];
       tableview.setData( data);
       view.add(tableview);
    }
}

function showClickEventInfo(e, islongclick) {
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
// var feeback_label = Ti.UI.createLabel({
    // text: "Tell us what you think!",
    // // top:8,
    // bottom:5,
    // font:{
        // fontSize:14
    // }
// });
// feedback_label.addEventListener("click",function(){
// 
// });
// $.child_window2.add(feedback_label);
Titanium.Analytics.featureEvent('Genre Detail page: ' + args.genre );
tracker.trackEvent({ category: "Genre Detail Page", action: "clicked", label: "Event Id", value: args.genre });
