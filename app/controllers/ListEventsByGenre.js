var args = arguments[0] || {};
$.parentController = args.parentTab;
// exports.openMainWindow = function(_tab){
// _tab.open($.child_window2);
// };
var args = arguments[0] || {};
// $.child_window2_label.setText(args.genre || 'No Genre clicked');
$.child_window2.title = args.genre;
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
			description : events[i]["fields"]["description"],
			hasDetail : true,
			color : 'blue',
			resized: false
		};
		Ti.API.info("temp row: " + temp_row);
		CustomData.push(temp_row);
	}
	// create table view
	var tableview = Titanium.UI.createTableView({
		id : "tableview",
		objName : 'tableview',
		// style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
		separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE
	});
	Ti.API.info("CustomData: " + CustomData);
	var data = [];
	// for (var i = CustomData.length - 1; i <= 0; i--)
	for (var i = 0; i < CustomData.length; i++) {
		// Ti.API.info("CustomData[i]" + CustomData[i]);
		var row = Titanium.UI.createTableViewRow({
			eventID : CustomData[i]["eventID"],
			height:150,
			pic: NaN,
			address: NaN,
			hasDetail: NaN,
			resized: false,
		});
		
		//setting up the di
		var pic = Titanium.UI.createImageView({
			image : CustomData[i].pic,
			// width : 100,
			// height : 150,
			left : 4,
			top : 2
		});
		Ti.API.info(pic + " " + pic.image );
		pic.addEventListener('error',function(e){
			Ti.API.info(e.source.image + " did not load!");
		});
		var resize = false;
		pic.addEventListener('load',function(e){
			Ti.API.info(e.source.image + " loaded properly!");
			//height and width of platform
			Ti.API.info("Width: " +  Ti.Platform.displayCaps.platformWidth);
			Ti.API.info("Height: " + Ti.Platform.displayCaps.platformHeight);
		    //height and width of the row it's in
		    Ti.API.info("Parent Width/Height: " + e.source.getParent().getWidth() + " / "+ e.source.getParent().getHeight());
		    Ti.API.info("Parent Size: " + e.source.getParent().getSize());
			if( !e.source.resized )
			{
				//get the blob of the image
				var blob = e.source.toImage();
				
				var thumbnail = blob.imageAsThumbnail("100","3","5");
				e.source.setImage(thumbnail);
				Ti.API.info("generating thumbnail 100x100 (hopefully!)");
				e.source.resized = true;	
			}
			
		});
		var title = Titanium.UI.createLabel({
			text : CustomData[i].title,
			font : {
				fontSize : 20,
				fontWeight : 'bold'
			},
			width : '150',
			textAlign : 'left',
			top : 2,
			left : 110,
			height : 20
		});
		var when = Ti.UI.createLabel({
		   text: "Where: ",
		   font: {
		       fontSize:10,
		       fontWeight: 'bold',
		   },
		   width: 'auto',
		   textAlign: 'left',
		   bottom : 20,
           left : 110,
           height : 10
		   
		});
		var description = Ti.UI.createLabel({
		   text: CustomData[i].description,
		   font: {
               fontSize:10,
               // fontWeight: 'bold',
           },
           width: 175,
           height: 75,
           textAlign: 'left',
           bottom : 50,
           left : 110,
		});
		// Ti.API.info("address = " + CustomData[i].address);
		var address = Titanium.UI.createLabel({
			text :  CustomData[i].address,
			font : {
				fontSize : 10,
				fontStyle : 'italic'
			},
			width : 'auto',
			textAlign : 'left',
			bottom : 20,
			left : 150,
			height : 10
		});
		var going_button = Ti.UI.createButton({
		    title:"I'm Going!",
		    width: "auto",
		    height: "15",
		    bottom: 0,
		    left: 115,
		    font : {
                fontSize : 10,
            },
		});
		going_button.addEventListener('click',function(e){
		   Ti.API.info( "going button in event listing clicked"); 
		});
		
		var maybe_button = Ti.UI.createButton({
            title:"Maybe?",
            width: "auto",
            height: "15",
            bottom: 0,
            left: 200,
            font : {
                fontSize : 10,
            },
            color: "#065365",
        });
        maybe_button.addEventListener('click',function(e){
           Ti.API.info( "maybe button in event listing clicked"); 
        });
		row.add(pic);
		row.add(title);
		row.add(when);
		row.add(address);
		row.add(description);
		row.add(going_button);
		row.add(maybe_button);

		// row.add(percent);
		// row.add(trend);
		// row.hasDetail = CustomData[i].hasDetail;

		//row.className = 'EventListing';
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
	// var debugLabel = Ti.UI.createLabel({
		// width:'auto',
		// textAlign:'center',
		// text:data,
		// bottom:0
	// });
	// view.add(debugLabel);

}

function showClickEventInfo(e, islongclick) {
	// event data
	var index = e.index;
	var section = e.section;
	var row = e.row;
	var rowdata = e.rowData;
	Ti.API.info('detail ' + e.detail);
	var msg = 'row ' + row + ' index ' + index + ' section ' + section + ' row data ' + rowdata;
	if (islongclick) {
		msg = "LONGCLICK " + msg;
	}

	Ti.API.info(e.rowData.title + " ( " + e.rowData.eventID + " ) button clicked");
	Ti.API.info(msg);
	// var eventDetailController = Alloy.createController('EventDetail',{eventid:e.rowData.eventID}).getView();
	// eventDetailController.openMainWindow($.tab_two);
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
