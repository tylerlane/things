exports.openMainWindow = function(_tab){
	_tab.open($.child_window2);
};
var args = arguments[0] || {};
$.child_window2_label.setText(args.genre || 'No Genre clicked');
$.child_window2.title = "Genre: " + args.genre;
var myRequest = Ti.Network.createHTTPClient({
    onload: function(e) {
            jsonObject = JSON.parse(this.responseText);
            var events = jsonObject;
            // $.textArea.value= genres.length;
            listEvents(events);
        },
    onerror: function(e) {
        alert(e.error);
    },
    timeout:5000
});
myRequest.open("GET", "http://data.news-leader.com/things/genre/" + args.genre );
myRequest.send();


function listEvents(events)
{
	var text = "";
	for(var i = 0; i < events.length; i++)
	{
		var button = Ti.UI.createButton({
			title: events[i]["fields"]["name"],
			buttonName: events[i]["fields"]["name"],
			eventID: events[i]["pk"],
			width:'auto',
			height:'auto',
			top: i * 105,
			borderRadius: 10,
			paddingLeft: 10,
			paddingRight:10
			
		});
		button.addEventListener('click',function(e){
			Ti.API.info(e.source.title + " ( " + e.source.eventID + " ) button clicked");
			var eventDetailController = Alloy.createController('EventDetail',{eventid:e.source.eventID});
			eventDetailController.openMainWindow($.tab_two);	
		});
		view.add(button);
	}
}

var scrollView = Ti.UI.createScrollView({
  contentWidth: 'auto',
  contentHeight: 'auto',
  showVerticalScrollIndicator: true,
  showHorizontalScrollIndicator: true,
  height: '80%',
  width: '80%'
});
var view = Ti.UI.createView({
  // backgroundColor:'#336699',
  borderRadius: 10,
  top: 10,
 });
scrollView.add(view);
$.child_window2.add(scrollView);