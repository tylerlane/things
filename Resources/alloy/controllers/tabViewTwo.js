function Controller() {
    function loadGenres(genres) {
        for (var i = 0; genres.length > i; i++) {
            var button = Ti.UI.createButton({
                title: genres[i]["fields"]["name"],
                buttonName: genres[i]["fields"]["name"],
                width: "auto",
                height: 100,
                top: 105 * i,
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 10
            });
            button.addEventListener("click", function(e) {
                Ti.API.info(e.source.title + " button clicked");
            });
            view.add(button);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tabViewTwo";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.tab_two_win = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Tab View Two",
        id: "tab_two_win",
        icon: Ti.UI.iPhone.SystemIcon.FAVORITES
    });
    $.__views.tabViewTwo = Ti.UI.createTab({
        window: $.__views.tab_two_win,
        title: "Tab View Two",
        id: "tabViewTwo"
    });
    $.__views.tabViewTwo && $.addTopLevelView($.__views.tabViewTwo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var myRequest = Ti.Network.createHTTPClient({
        onload: function() {
            jsonObject = JSON.parse(this.responseText);
            var genres = jsonObject;
            loadGenres(genres);
        },
        onerror: function(e) {
            alert(e.error);
        },
        timeout: 5e3
    });
    myRequest.open("GET", "http://data.news-leader.com/things/genres");
    myRequest.send();
    var scrollView = Ti.UI.createScrollView({
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: true,
        height: "80%",
        width: "80%"
    });
    var view = Ti.UI.createView({
        borderRadius: 10,
        top: 10
    });
    scrollView.add(view);
    $.tab_two_win.add(scrollView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;