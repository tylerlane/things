var args = arguments[0] || {};
$.parentController = args.parentTab;
// exports.openMainWindow = function(_tab){
	// _tab.open($.child_window2);
// };
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
	// create table view data object
	var data = [];
	for(var i = 0; i < events.length; i++)
	{
		var row = {title:events[i]["fields"]["name"],eventID:events[i]["pk"],hasDetail:true,color:'blue'};
		data.push(row);
	}
	
	// create table view
	var tableview = Titanium.UI.createTableView({
		data:data
	});
	// create table view event listener
	tableview.addEventListener('click', function(e)
	{
		showClickEventInfo(e);
	});
	tableview.addEventListener('longclick', function(e)
	{
		showClickEventInfo(e, true);
	});
	view.add(tableview);
	

}



function showClickEventInfo(e, islongclick) {
	// event data
	var index = e.index;
	var section = e.section;
	var row = e.row;
	var rowdata = e.rowData;
	Ti.API.info('detail ' + e.detail);
	var msg = 'row ' + row + ' index ' + index + ' section ' + section  + ' row data ' + rowdata;
	if (islongclick) {
		msg = "LONGCLICK " + msg;
	}
	
	Ti.API.info(e.source.title + " ( " + e.source.eventID + " ) button clicked");
	Ti.API.info(msg);
	// var eventDetailController = Alloy.createController('EventDetail',{eventid:e.source.eventID}).getView();
	// eventDetailController.openMainWindow($.tab_two);
	var eventDetailController = Alloy.createController('EventDetail',{eventid:e.rowData.eventID,parentTab: args.parentTab});
	args.parentTab.open(eventDetailController.getView());
	
	// Titanium.UI.createAlertDialog({title:'Table View',message:msg}).show();
}


var scrollView = Ti.UI.createScrollView({
  contentWidth: 'auto',
  contentHeight: 'auto',
  showVerticalScrollIndicator: true,
  showHorizontalScrollIndicator: true,
  height: '80%',
  width: '95%'
});
var view = Ti.UI.createView({
  // backgroundColor:'#336699',
  borderRadius: 10,
  top: 10,
 });
scrollView.add(view);
$.child_window2.add(scrollView);