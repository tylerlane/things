var myRequest = Ti.Network.createHTTPClient({
    onload: function(e) {
            jsonObject = JSON.parse(this.responseText);
            var genres = jsonObject;
            // $.textArea.value= genres.length;
            loadGenres(genres);
        },
    onerror: function(e) {
        alert(e.error);
    },
    timeout:5000
});
myRequest.open("GET", "http://data.news-leader.com/things/genres");
myRequest.send();

function loadGenres(genres)
{
	var text = "";
	for(var i = 0; i < genres.length; i++)
	{
		var button = Ti.UI.createImageView({
			title: genres[i]["fields"]["name"],
			// buttonName: genres[i]["fields"]["name"],
			width:'70',
			height:'75',
			top: genres[i]["fields"]["app_layout"].split(",")[0],
			left: genres[i]["fields"]["app_layout"].split(",")[1],
			// borderRadius: 5,
			image: "http://data-media.news-leader.com/" + genres[i]["fields"]["photo"],
		});
		if(genres[i]["fields"]["name"] == "Music")
		{
		    button.setBackgroundImage( "music.png");
		}
	   	button.addEventListener('click',function(e){
		  Ti.API.info(e.source.title + " button clicked");
		  var ListEventsByGenreController = Alloy.createController('ListEventsByGenre',{genre:e.source.title,parentTab: $.tab_two});
		  $.tab_two.open(ListEventsByGenreController.getView());
		  // tabViewTwoChildController.openMainWindow($.tab_two);
		});
		view.add(button);
	}

}

var scrollView = Ti.UI.createScrollView({
  contentWidth: 'auto',
  contentHeight: 'auto',
  showVerticalScrollIndicator: true,
  showHorizontalScrollIndicator: false,
  height: '95%',
  width: '95%'
});
var view = Ti.UI.createView({
  // backgroundColor:'#336699',
  borderRadius: 10,
  top: 10,
 });
scrollView.add(view);
$.tab_two_win.add(scrollView);