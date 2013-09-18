var alloy = require('alloy');
require('datejs/date');
//open our db object
var db = Ti.Database.open("Things");
db.execute("CREATE TABLE IF NOT EXISTS my_events(id INTEGER PRIMARY KEY UNIQUE, event_name TEXT, event_date TEXT,status TEXT);");
if(Ti.Platform.name != "android" )
{
    //apparently apple will reject apps backing up unnecessary files so setting the local db to not be backed up.
    db.file.setRemoteBackup(false);    
}
var genres = "";
var myRequest = Ti.Network.createHTTPClient({
    onload : function(e) {
        jsonObject = JSON.parse(this.responseText);
        genres = jsonObject;
        // $.textArea.value= genres.length;
        // Ti.API.info( "fetched the genres: " + genres );
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
    if (genres_view != undefined )
    {   
        if(genres_view.children != undefined)
        {
           Ti.API.info( "reminder_wrapper has children." );
            // Save childrens       
            var removeData = [];
            for (i = genres_view.children.length; i > 0; i--){
                removeData.push(genres_view.children[i - 1]);  
            };
            // Remove childrens
            for (i = 0; i < removeData.length; i++){
                genres_view.remove(removeData[i]);
            }
            removeData = null; 
        }
    };
    var genres_view = Ti.UI.createView({
        width : "100%",
        height : Ti.UI.SIZE,
        // left: 50,
        top : 5,
        bottom:5,
        // borderWidth: 1,
        // borderColor: "orange"
    });
    // genres_view.addEventListener("click", function(e){
        // Ti.API.info( "click in the genres view");
    // }); 
    for (var i = 0; i < genres.length; i++) {
        var buttonview = Ti.UI.createView({
            layout : 'vertical',
            top : genres[i]["fields"]["app_layout"].split(",")[0],
            left : genres[i]["fields"]["app_layout"].split(",")[1],
            width : Ti.UI.SIZE,
            height : Ti.UI.SIZE,
            // borderWidth: 1,
            // borderColor: ( i % 2==0 ) ? 'blue' : 'red',
            title : genres[i]["fields"]["name"],
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
        buttonview.addEventListener('click', function(e) {
            // Ti.API.info(e.source.title + " button clicked");
            if( e.source.title != "Dining" )
            {
                var ListEventsByGenreController = Alloy.createController('ListEventsByGenre', {
                    genre : e.source.title,
                    parentTab : $.tab_two
                });
                $.tab_two.open(ListEventsByGenreController.getView());    
            }
            else
            {
                var DiningController = Alloy.createController('Dining', {
                    genre : e.source.title,
                    parentTab : $.tab_two
                });
                $.tab_two.open(DiningController.getView());
            }
        });
        //Ti.API.info( "creating event listener for button for: " + genres[i]["fields"]["name"] );
        buttonview.add(button);
        // Ti.API.info( "adding button to the buttonview for: " + genres[i]["fields"]["name"] );

        var label = Ti.UI.createLabel({
            text : genres[i]["fields"]["name"],
            color : "white",
            font : {
                fontSize: 14,
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
    // Ti.API.info( "Adding genres_view to logo_view" );

}

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
    height: "auto",
    width: "auto",
    // borderWidth: 1,
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
    hires: true
});
logo_view.add(logo);
var reminder_container = Ti.UI.createView({
    width: Ti.UI.FILL,
    height:Ti.UI.SIZE,
    layout: "vertical",
    // borderWidth: 1,
    // borderColor: 'purple',
});
logo_view.add(reminder_container);
view.add(logo_view);

scrollView.add(view);
$.tab_two_win.add(scrollView);

$.tab_two_win.addEventListener("focus", function(e){
    // put in code to check for reminders here.
    var check_query = "SELECT * FROM my_events where status='going'";
    ////Ti.API.info( "check_query: " + check_query );
    var check_rs = db.execute(check_query);
    //Ti.API.info("check_rs: " + check_rs);
    var num_reminders = check_rs.getRowCount();
    //Ti.API.info( "num_reminders: " + num_reminders.toString() );
    if( Ti.App.Properties.getBool("show_reminders")) {
        if(check_rs.getRowCount() >= 1)
        {
            if( reminder_container.children != undefined )
            {
                // Ti.API.info( "reminders are set. "  + reminders );
                if (reminder_container && reminder_container.children != undefined)
                {   
                    // Ti.API.info( "reminder_wrapper has children." );
                    // Save childrens       
                    var removeData = [];
                    for (i = reminder_container.children.length; i > 0; i--){
                        removeData.push(reminder_container.children[i - 1]);  
                    };
                 
                    // Remove childrens
                    for (i = 0; i < removeData.length; i++){
                        reminder_container.remove(removeData[i]);
                    }
                    removeData = null;
                }
                
            }
            // Ti.API.info( "reminders are undefined" );
            var reminders = Ti.UI.createImageView({
                image : "reminders.png",
                width : 310,
                top : 5,
                title : "reminders"
            });
            // Ti.API.info( "adding reminders to logo view");
            reminder_container.add(reminders);
            var reminder_wrapper = Ti.UI.createView({
               layout: "vertical",
               height: Ti.UI.SIZE,
               // borderWidth: 3,
               // borderColor: 'blue'
               
            });
            //Ti.API.info( "adding reminder_wrapper to the logo view ");
            //logo_view.add(reminder_wrapper);
        
            reminder_wrapper.addEventListener("click", function(e) {
                    // Ti.API.info("click event received in reminder listing");
                    // Ti.API.info("source title = " + e.source.title);
                    var eventDetailController = Alloy.createController('EventDetail', {
                        eventid : e.source.eventID,
                        parentTab : $.tab_two
                    });
                    $.tab_two.open(eventDetailController.getView());
                });
            while (check_rs.isValidRow()) {
                // Ti.API.info( "looping through check_rs");
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
                        fontSize : 14,
                        fontFamily : "Tall Dark and Handsome Condensed",
                        fontWeight : "bold"
                    }
                });
                // Ti.API.info( "adding label text to reminder_view");
                reminder_view.add(reminder_label_text);
                // Ti.API.info( "Date: " + Date.parse("9-30-13 5:00pm").toString("MMM ddd d, yy") );
                var reminder_label_date = Ti.UI.createLabel({
                    eventID : check_rs.fieldByName('id'),
                    //text : check_rs.fieldByName('event_date'),
                    text: Date.parse(check_rs.fieldByName('event_date')).toString("MMM d, yyyy"),
                    right : 0,
                    color : "white",
                    width : "30%",
                    textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
                    font : {
                        fontSize : 14,
                        fontFamily : "Tall Dark and Handsome Condensed",
                        fontWeight : "bold"
                    }
                });
                // Ti.API.info( "adding label text to reminder_view");
                reminder_view.add(reminder_label_date);
                // Ti.API.info( "looping to next result in the set.");
                check_rs.next();
                // Ti.API.info( "adding reminder_view to reminder_wrapper");
                reminder_wrapper.add(reminder_view);
                // Ti.API.info( "reminder_wrapper = " + reminder_wrapper);
            }
            reminder_container.add(reminder_wrapper);
            //close result set and db
            check_rs.close();
        }
        else
        {
            // Ti.API.info( "reminders are set. "  + reminders );
            if (reminder_container && reminder_container.children != undefined)
            {   
                // Ti.API.info( "reminder_wrapper has children." );
                // Save childrens       
                var removeData = [];
                for (i = reminder_container.children.length; i > 0; i--){
                    removeData.push(reminder_container.children[i - 1]);  
                };
             
                // Remove childrens
                for (i = 0; i < removeData.length; i++){
                    reminder_container.remove(removeData[i]);
                }
                removeData = null;
            };
        }
    }
    else
    {
        // Ti.API.info( "reminders are set. "  + reminders );
        if (reminder_container && reminder_container.children != undefined)
        {   
            // Ti.API.info( "reminder_wrapper has children." );
            // Save childrens       
            var removeData = [];
            for (i = reminder_container.children.length; i > 0; i--){
                removeData.push(reminder_container.children[i - 1]);  
            };
         
            // Remove childrens
            for (i = 0; i < removeData.length; i++){
                reminder_container.remove(removeData[i]);
            }
            removeData = null;
        };
    }
});
Titanium.Analytics.featureEvent('Genres page');
tracker.trackEvent({ category: "Genres Page", action: "loaded"});