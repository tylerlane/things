var myRequest = Ti.Network.createHTTPClient({
    onload : function(e) {
        jsonObject = JSON.parse(this.responseText);
        var genres = jsonObject;
        // $.textArea.value= genres.length;
        loadGenres(genres);
    },
    onerror : function(e) {
        alert(e.error);
    },
    timeout : 5000
});
myRequest.open("GET", "http://data.news-leader.com/things/genres");
myRequest.send();

function loadGenres(genres) {
    genres_view = Ti.UI.createView({
        width: "100%",
        height: "100%",
        // left: 50,
        top: 5,
        // borderWidth: 3,
        // borderColor: "green"
    });
    var text = "";
    for (var i = 0; i < genres.length; i++) {
        var buttonview = Ti.UI.createView({
            layout : 'vertical',
            // top : genres[i]["fields"]["app_layout"].split(",")[0],
            // left : genres[i]["fields"]["app_layout"].split(",")[1],
            top : genres[i]["fields"]["app_layout"].split(",")[0],
            left : genres[i]["fields"]["app_layout"].split(",")[1],
            width : Ti.UI.SIZE,
            height : "auto",
            // borderWidth: 3,
            // borderColor: ( i % 2==0 ) ? 'blue' : 'red',
        });
        var button = Ti.UI.createImageView({
            title : genres[i]["fields"]["name"],
            // buttonName: genres[i]["fields"]["name"],
            width : '75',
            height : '75',
            // borderRadius: 5,
            image : "http://data-media.news-leader.com/" + genres[i]["fields"]["photo"],
        });
        button.addEventListener('click', function(e) {
            Ti.API.info(e.source.title + " button clicked");
            var ListEventsByGenreController = Alloy.createController('ListEventsByGenre', {
                genre : e.source.title,
                parentTab : $.tab_two
            });
            $.tab_two.open(ListEventsByGenreController.getView());
            // tabViewTwoChildController.openMainWindow($.tab_two);
        });
        buttonview.add(button);
        var label = Ti.UI.createLabel({
            text : genres[i]["fields"]["name"],
            color : "white",
            font: {
               fontSize:12,
               fontFamily: "Tall Dark and Handsome"
            }
        });
        buttonview.add(label);
        genres_view.add(buttonview);
    }
    logo_view.add(genres_view);
}

var scrollView = Ti.UI.createScrollView({
    contentWidth : 'auto',
    contentHeight : 'auto',
    showVerticalScrollIndicator : true,
    showHorizontalScrollIndicator : false,
    height : '100%',
    width : '100%'
});
var view = Ti.UI.createView({
    top : 0,
    // borderWidth: 3,
    // borderColor: 'yellow'
});
var logo_view = Ti.UI.createView({
   layout: "vertical",
   top:0,
   height: "auto",
   // borderWidth: 3,
   // borderColor: 'red'
});
var logo = Ti.UI.createImageView({
    image : "NL-Events-logo.png",
    width : 310,
    title : "logo",
});
logo_view.add(logo);
view.add(logo_view);
// put in code to check for reminders here.
var has_reminders = true;
if( has_reminders )
{
    var reminders = Ti.UI.createImageView({
        image : "reminders.png",
        width: 310,
        top: 5,
        title: "reminders"
    });
    logo_view.add(reminders);
    var reminder_view = Ti.UI.createView({
       layout:  "horizontal",
       width: Ti.UI.FILL,
       height: Ti.UI.SIZE,
       left: 25,
       eventID: "2",
       // borderWidth: 3,
       // borderColor: 'yellow'
    });
    reminder_view.addEventListener("click",function(e){
       var eventDetailController = Alloy.createController('EventDetail', {
            eventid : e.source.eventID,
            parentTab : $.tab_two
        });
        $.tab_two.open(eventDetailController.getView()); 
    });
    var reminder_label_text = Ti.UI.createLabel({
       text: "(1) FIRST REMINDER",
       eventID: "2",
       left: 0,
       color: "white",
       width: Ti.UI.SIZE,
       font: {
           fontSize:12,
           fontFamily: "Tall Dark and Handsome"
       }
    });
    reminder_view.add(reminder_label_text);
    var reminder_label_text = Ti.UI.createLabel({
       eventID: "2",
       text: "08/31/13",
       right: 0, 
       color: "white",
       width: Ti.UI.SIZE,
       font: {
           fontSize: 14,
           fontFamily: "Tall Dark and Handsome",
           fontWeight: "bold"
           
       }
    });
    reminder_view.add(reminder_label_text);
    logo_view.add(reminder_view);
}   
scrollView.add(view);
$.tab_two_win.add(scrollView); 