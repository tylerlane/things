// exports.openMainWindow = function(_tab){
	// Ti.API.info(_tab);
// 	
	// _tab.open($.event_detail);
// };
exports.openMainWindow = function(){
	Ti.API.info( $.event_detail);
	// Ti.API.info( Alloy.createController('tabViewTwo'));
	$.tab_group.activeTab.open($.event_detail);
};

var args = arguments[0] || {};
var myRequest = Ti.Network.createHTTPClient({
    onload: function(e) {
            jsonObject = JSON.parse(this.responseText);
            var event_detail = jsonObject;
            $.event_text_area.value= event_detail.length;
            //eventDetail(event);
        },
    onerror: function(e) {
        alert(e.error);
    },
    timeout:5000
});
myRequest.open("GET", "http://data.news-leader.com/things/event/" + args.eventid );
myRequest.send();

