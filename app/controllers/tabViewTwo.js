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
		var button = Ti.UI.createButton({
			title: genres[i]["fields"]["name"],
			buttonName: genres[i]["fields"]["name"],
			width:'auto',
			height:'auto',
			top: i * 105,
			borderRadius: 10,
			paddingLeft: 10,
			paddingRight:10
			
		});
		button.addEventListener('click',function(e){
			Ti.API.info(e.source.title + " button clicked");
			var tabViewTwoChildController = Alloy.createController('tabViewTwoChild',{genre:e.source.title});
			tabViewTwoChildController.openMainWindow($.tab_two);
			
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
$.tab_two_win.add(scrollView);