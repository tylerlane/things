var args = arguments[0] || {};
$.parentController = args.parentTab;

// exports.openMainWindow = function(){
	// Ti.API.info( $.event_detail);
	// // Ti.API.info( Alloy.createController('tabViewTwo'));
	// $.tab_group.activeTab.open($.event_detail);
// };

$.event_detail_win.setTitle( args.eventid ); 

var myRequest = Ti.Network.createHTTPClient({
    onload: function(e) {
            jsonObject = JSON.parse(this.responseText);
            var event_detail = jsonObject;
            // $.event_text_area.value= event_detail[0];
            eventDetail(event_detail[0]);
        },
    onerror: function(e) {
        alert(e.error);
    },
    timeout:5000
});
myRequest.open("GET", "http://data.news-leader.com/things/event/" + args.eventid );
myRequest.send();


function eventDetail(event_detail)
{
	var image = Ti.UI.createImageView({  // creates thumb
            image:"http://data-media.news-leader.com/" + event_detail["fields"]["main_photo"], // sets image to smaller version of image
            //largeImage:shots[i].image_url,
            height:400, // sets width
            top:75,
             // sets height
        });
    $.event_detail_win.add(image);
    Ti.API.info("Adding image to view1. url is " + image.getImage());
	$.label1.setText(event_detail["fields"]["name"]);
	$.label2.setText(event_detail["fields"]["description"]);
	// $.label3.setText(event_detail);
}

function EventGoingClick(e){
	Ti.API.info("I'm going button has been clicked");
}
