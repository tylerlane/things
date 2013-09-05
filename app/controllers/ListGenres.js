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

var myRequest = Ti.Network.createHTTPClient({
    onload : function(e) {
        jsonObject = JSON.parse(this.responseText);
        var genres = jsonObject;
        // $.textArea.value= genres.length;
        Ti.API.info( "fetched the genres: " + genres );
        loadGenres(genres);
        
    },
    onerror : function(e) {
        Ti.API.info( "fetching error: " + e.error );
        alert(e.error);
    },
    timeout : 5000
});
myRequest.open("GET", "http://data.news-leader.com/things/genres");
myRequest.send();

function loadGenres(genres) {
    genres_view = Ti.UI.createView({
        width : "100%",
        height : "100%",
        // left: 50,
        top : 5,
        // borderWidth: 3,
        // borderColor: "green"
    });
    
    for (var i = 0; i < genres.length; i++) {
        var buttonview = Ti.UI.createView({
            layout : 'vertical',
            top : genres[i]["fields"]["app_layout"].split(",")[0],
            left : genres[i]["fields"]["app_layout"].split(",")[1],
            width : Ti.UI.SIZE,
            height : "auto",
            // borderWidth: 3,
            // borderColor: ( i % 2==0 ) ? 'blue' : 'red',
        });
        // Ti.API.info( "creating button view for: " + genres[i]["fields"]["name"] );
        var button = Ti.UI.createImageView({
            title : genres[i]["fields"]["name"],
            // buttonName: genres[i]["fields"]["name"],
            width : '75',
            height : '75',
            // borderRadius: 5,
            image : "http://data-media.news-leader.com/" + genres[i]["fields"]["photo"],
        });
        // Ti.API.info( "creating button for: " + genres[i]["fields"]["name"] );
        button.addEventListener('click', function(e) {
            Ti.API.info(e.source.title + " button clicked");
            var ListEventsByGenreController = Alloy.createController('ListEventsByGenre', {
                genre : e.source.title,
                parentTab : $.tab_two
            });
            $.tab_two.open(ListEventsByGenreController.getView());
        });
        // Ti.API.info( "creating event listener for button for: " + genres[i]["fields"]["name"] );
        buttonview.add(button);
        // Ti.API.info( "adding button to the buttonview for: " + genres[i]["fields"]["name"] );

        var label = Ti.UI.createLabel({
            text : genres[i]["fields"]["name"],
            color : "white",
            font : {
                fontSize: 12,
                fontFamily: "Tall Dark and Handsome Condensed",
                fontWeight: "bold"
            }
        });
        // Ti.API.info( "creating label for: " + genres[i]["fields"]["name"] );
        buttonview.add(label);
        // Ti.API.info( "adding label to buttonview for: " + genres[i]["fields"]["name"] );
        genres_view.add(buttonview);
        // Ti.API.info( "adding buttonview to genres_view for: " + genres[i]["fields"]["name"] );

    }
    logo_view.add(genres_view);
    Ti.API.info( "Adding genres_view to logo_view" );

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
    layout : "vertical",
    top : 0,
    height : "auto",
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

var check_query = "SELECT * FROM my_events where status='going'";
Ti.API.info( "check_query: " + check_query );
var check_rs = db.execute(check_query);
Ti.API.info("check_rs: " + check_rs);
var num_reminders = check_rs.getRowCount();
Ti.API.info( "num_reminders: " + num_reminders.toString() );
if( Ti.App.Properties.getBool("show_reminders")) {
    if(check_rs.getRowCount() >= 1)
    {
        var reminders = Ti.UI.createImageView({
            image : "reminders.png",
            width : 310,
            top : 5,
            title : "reminders"
        });
        logo_view.add(reminders);
        var reminder_wrapper = Ti.UI.createView({
           layout: "vertical",
           height: Ti.UI.SIZE,
        });
        logo_view.add(reminder_wrapper);
        reminder_wrapper.addEventListener("click", function(e) {
                Ti.API.info("click event received in reminder listing");
                Ti.API.info("source title = " + e.source.title);
                var eventDetailController = Alloy.createController('EventDetail', {
                    eventid : e.source.eventID,
                    parentTab : $.tab_two
                });
                $.tab_two.open(eventDetailController.getView());
            });
        while (check_rs.isValidRow()) {
            Ti.API.info( "looping through check_rs");
            var reminder_view = Ti.UI.createView({
                layout : "horizontal",
                width : Ti.UI.FILL,
                height : Ti.UI.SIZE,
                top : 0,
                left : 25,
                eventID : "2",
                // borderWidth: 3,
                // borderColor: 'yellow'
            });
            var reminder_label_text = Ti.UI.createLabel({
                text : check_rs.fieldByName('event_name'),
                eventID : check_rs.fieldByName('id'),
                left : 0,
                color : "white",
                width : "65%",
                font : {
                    fontSize : 12,
                    fontFamily : "Tall Dark and Handsome Condensed",
                    fontWeight : "bold"
                }
            });
            reminder_view.add(reminder_label_text);
            var reminder_label_text = Ti.UI.createLabel({
                eventID : check_rs.fieldByName('id'),
                text : check_rs.fieldByName('event_date'),
                right : 0,
                color : "white",
                width : "30%",
                textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
                font : {
                    fontSize : 12,
                    fontFamily : "Tall Dark and Handsome Condensed",
                    fontWeight : "bold"
                }
            });
            reminder_view.add(reminder_label_text);
            check_rs.next();
            reminder_wrapper.add(reminder_view);
        }
        //close result set and db
        check_rs.close();
        db.close();
    }
}

scrollView.add(view);
$.tab_two_win.add(scrollView);

