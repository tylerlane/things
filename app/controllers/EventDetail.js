require('datejs/date');
require('alloy');
var args = arguments[0] || {};
$.parentController = args.parentTab;

var scrollView = Ti.UI.createScrollView({
    contentWidth : "auto",
    contentHeight : "auto",
    showVerticalScrollIndicator : true,
    showHorizontalScrollIndicator : false,
    height : '100%',
    width : '100%'
});
var view = Ti.UI.createView({
    top : 0,
    height : "auto",
    width : "auto",
    layout : "vertical"
    // borderWidth: 1,
    // borderColor: 'yellow'
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
    // var image = Ti.UI.createImageView({  // creates thumb
    // image:"http://data-media.news-leader.com/" + event_detail["fields"]["main_photo"], // sets image to smaller version of image
    // //largeImage:shots[i].image_url,
    // height:400, // sets width
    // top:75,
    // // sets height
    // });
    // $.event_detail_win.add(image);
    //$.event_detail_win.setTitle(event_detail["fields"]["name"] );
    // Ti.API.info("Adding image to view1. url is " + image.getImage());
    // $.label1.setText(event_detail["fields"]["name"]);
    // $.label2.setText(event_detail["fields"]["description"]);
    // // $.label3.setText(event_detail);
    Ti.API.info("title: " + event_detail["fields"]["name"]);

    var label = Ti.UI.createLabel({
        text : event_detail["fields"]["name"].toUpperCase(),
        color : "white",
        font : {
            fontSize : 20,
            fontFamily : "Helvetica",
            fontWeight : "bold"
        },
        top : 5,
        left : 25,

    });
    view.add(label);
    var picture_view = Ti.UI.createView({
        //backgroundColor : "#065365",
        backgroundColor: "#c0c0c0",
        width : Ti.UI.FILL,
        height : 150,
        layout : "horizontal",
        // borderColor : "blue",
        // borderWidth : 1,

    });
    view.add(picture_view);
    var image = Ti.UI.createImageView({// creates thumb
        image : "http://data-media.news-leader.com/" + event_detail["fields"]["main_photo"], // sets image to smaller version of image
        //largeImage:shots[i].image_url,
        //height:125, // sets height
        width : 125, // sets width
        left : 10,
        top : 8,
        // backgroundColor : "white",
        borderRadius: 3,
    });
    picture_view.add(image);
    var text_view = Ti.UI.createView({
        layout : "vertical",
        width : Ti.UI.FILL,
        height: Ti.UI.FILL,
        right: 5,
        left : 10,
        // backgroundColor: "yellow",
        // borderColor : "yellow",
        // borderWidth : 1,
    });
    picture_view.add(text_view);
    var foo = Ti.UI.createLabel({
        title: "when",
        // color: "yellow",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 5,
        left: 5,
        font : {
            fontSize : 10,
            fontFamily : "Helvetica",
            fontWeight : "bold"
        },
        borderColor : "orange",
        borderWidth : 1,
    });
    text_view.add(foo);
    Ti.API.info( text_view.children);
    // Ti.API.info( Date.parse(event_detail['fields']["start_date"] + " " + event_detail['fields']["start_time"]).toString("MMM d, yyyy hh:ss tt") );
    var when_text = Ti.UI.createLabel({
        title : Date.parse(event_detail['fields']["start_date"] + " " + event_detail['fields']["start_time"]).toString("MMM d, yyyy hh:ss tt"),
        font : {
            fontSize : 10,
            fontFamily : "Helvetica",
            // fontWeight : "bold"
        },
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        borderColor : "orange",
        borderWidth : 1,
    });
    text_view.add(when_text);
    Ti.API.info( text_view.children);
    //adding our text_view tot he pictureview
    
}

function EventGoingClick(e) {
    Ti.API.info(e.source + " has been clicked");
}