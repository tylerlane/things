 var myRequest = Ti.Network.createHTTPClient({
    onload: function(e) {
            jsonObject = JSON.parse(this.responseText);
            var genres = jsonObject;
            // $.textArea.value= genres.length;
            // loadGenres();
        },
    onerror: function(e) {
        alert(e.error);
    },
    timeout:5000
});
myRequest.open("GET", "http://data.news-leader.com/things/genres");
myRequest.send();

// function loadGenres()
// {
	// var text = "";
	// for(var i = 0; i < genres.length; i++)
	// {
		// text = text + genres[i]["fields"]["name"] + "\r\n";
		// $.textArea.value = text;
	// }
// 	
// 	
// }
