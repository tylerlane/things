require('datejs/date');
require('alloy');
//open our db object
var db = Ti.Database.open("Things");
db.execute("CREATE TABLE IF NOT EXISTS my_events(id INTEGER PRIMARY KEY UNIQUE, event_name TEXT, event_date TEXT,status TEXT);");
if(Ti.Platform.name != "android" )
{
    //apparently apple will reject apps backing up unnecessary files so setting the local db to not be backed up.
    db.file.setRemoteBackup(false);    
}

var args = arguments[0] || {};
$.parentController = args.parentTab;

var scrollView = Ti.UI.createScrollView({
    contentWidth : "auto",
    contentHeight : "auto",
    showVerticalScrollIndicator : true,
    showHorizontalScrollIndicator : false,
    height : 'auto',
    width : 'auto',
});
var view = Ti.UI.createView({
    top : 0,
    height : 'auto',
    width : 'auto',
    layout : "vertical",
    // borderWidth: 1,
    // borderColor: 'green'
});

scrollView.add(view);
$.event_detail_win.add(scrollView);

var myRequest = Ti.Network.createHTTPClient({
    onload : function(e) {
        jsonObject = JSON.parse(this.responseText);
        var event_detail = jsonObject;
        // $.event_text_area.value= event_detail[0];
        eventDetail(event_detail[0]);
    },
    onerror : function(e) {
        alert(e.error);
    },
    timeout : 5000
});
myRequest.open("GET", "http://data.news-leader.com/things/event/" + args.eventid);
myRequest.send();

function eventDetail(event_detail) {
    // Ti.API.info("title: " + event_detail["fields"]["name"]);
    var label = Ti.UI.createLabel({
        text : event_detail["fields"]["name"],
        color : "white",
        font : {
            fontSize : 24,
            // fontFamily : "Helvetica",
            fontWeight : "bold"
        },
        top : 5,
        left : 25,
    });
    view.add(label);
    var outer_wrapper_view = Ti.UI.createView({
        layout: "vertical",
        // height: Ti.UI.FILL,
        height: 400,
        width: Ti.UI.FILL,
        top: 5,
        bottom:5,
        left:5,
        right: 5,
        borderRadius: 5, 
        // borderColor: "blue",
        // borderWidth: 1,
        backgroundColor : "#065365",
        // borderColor:"yellow",
        // borderWidth:1,

    });
    view.add(outer_wrapper_view);
    var picture_view = Ti.UI.createView({
        width : Ti.UI.FILL,
        layout : "vertical",
        // borderColor: "orange",
        // borderWidth: 1,
        height: Ti.UI.SIZE,
    });
    outer_wrapper_view.add(picture_view);
    var image = Ti.UI.createImageView({// creates thumb
        image : "http://data-media.news-leader.com/" + event_detail["fields"]["main_photo"], // sets image to smaller version of image
        //largeImage:shots[i].image_url,
        height:175, // sets height
        //width : 125, // sets width
        // left : 10,
        top : 8,
        hires: true,
        // backgroundColor : "#61929d",
        backgroundColor: "white",
        borderRadius : 5,
        // borderColor: "green",
        // borderWidth: 1
    });
    picture_view.add(image);
    var text_view = Ti.UI.createView({
        layout : "vertical",
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE,
        right : 5,
        left : 5,
        // backgroundColor: "yellow",
        // borderColor : "yellow",
        // borderWidth : 1,
        // zIndex : 100,
    });
    picture_view.add(text_view);
    var when = Ti.UI.createLabel({
        text : "WHEN",
        color : "yellow",
        // backgroundColor: "green",
        height : Ti.UI.SIZE,
        width : Ti.UI.FILL,
        top : 5,
        left : 5,
        font : {
            fontSize : 16,
            fontFamily : "Helvetica",
            fontWeight : "bold"
        },
        // borderColor : "orange",
        // borderWidth : 1,
    });
    text_view.add(when);

    var when_text = Ti.UI.createLabel({
        text : Date.parse(event_detail['fields']["start_date"] + " " + event_detail['fields']["start_time"]).toString("M/d/yy hh:ss tt"),
        font : {
            fontSize : 16,
            fontFamily : "Helvetica",
            fontWeight : "bold"
        },
        left : 5,
        top : -3,
        height : Ti.UI.SIZE,
        width : Ti.UI.Fill,
        color : "white"
        // borderColor : "orange",
        // borderWidth : 1,
    });
    text_view.add(when_text);
    //adding our text_view tot he pictureview
    var where = Ti.UI.createLabel({
        text : "WHERE",
        font : {
            fontSize : 16,
            fontFamily : "Helvetica",
            fontWeight : "bold"
        },
        top : 0,
        left : 5,
        height : Ti.UI.SIZE,
        width : Ti.UI.FILL,
        color : "yellow",
    });
    text_view.add(where);
    var where_text = Ti.UI.createLabel({
        text : event_detail["fields"]["contact_address"],
        font : {
            fontSize : 16,
            fontFamily : "Helvetica",
            fontWeight : "bold"
        },
        left : 5,
        top : -3,
        height : Ti.UI.SIZE,
        width : Ti.UI.FILL,
        color : "white"
        // borderColor : "orange",
        // borderWidth : 1,
    });
    text_view.add(where_text);

    var cost = Ti.UI.createLabel({
        text : "COST",
        font : {
            fontSize : 16,
            fontFamily : "Helvetica",
            fontWeight : "bold"
        },
        top : 0,
        left : 5,
        height : Ti.UI.SIZE,
        width : Ti.UI.FILL,
        color : "yellow",
    });
    text_view.add(cost);
    
    var cost_text = Ti.UI.createLabel({
       text: event_detail["fields"]["cost_description"],
       font : {
            fontSize : 16,
            fontFamily : "Helvetica",
            fontWeight : "bold"
        },
        left : 5,
        top : -3,
        height : Ti.UI.SIZE,
        width : Ti.UI.Fill,
        color : "white"
        // borderColor : "orange",
        // borderWidth : 1, 
    });
    text_view.add(cost_text);
    button_view = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        top: 3,
        bottom:0,
        // borderColor: "red",
        // borderWidth: 1
    });
    var going_button = Ti.UI.createButton({
        eventID : event_detail["pk"],
        eventTitle: event_detail["fields"]["name"],
        eventDate: event_detail["fields"]["start_date"] + " " + event_detail["fields"]['start_time'],
        title : "I'm Going!",
        width : "45%",
        height : "30",
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
    });
    button_view.add(going_button);
    var maybe_button = Ti.UI.createButton({
        title : "I'm Interested",
        eventID : event_detail["pk"],
        eventTitle: event_detail["fields"]["name"],
        eventDate: event_detail["fields"]["start_date"] + " " + event_detail["fields"]['start_time'],
        style: 'none',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        color: "#065365",
        height : "30",
        left: 5,
        width: "45%",
        font : {
            fontSize : 16,
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
    outer_wrapper_view.add(button_view);
    var description_view = Ti.UI.createView({
       width: Ti.UI.FILL,
       height: Ti.UI.SIZE,
       layout: "horizontal",
       top:5,
       bottom:5,
       left:5,
       bottom:5 
    });
    
    var description_text = Ti.UI.createLabel({
        text: event_detail["fields"]["description"],
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        left: 10,
        right: 10,
        font:{
            fontSize: 16,
            fontFamily: "Helvetica",
        },
        color: "white",
        //borderColor:"blue",
        //borderWidth:1
    });
    description_view.add(description_text);
    view.add(description_view);
}
Titanium.Analytics.featureEvent('Event Detail: ' + args.eventid );
tracker.trackEvent({ category: "Event Detail: ", action: "loaded", label: "Event ID", value: args.eventid });