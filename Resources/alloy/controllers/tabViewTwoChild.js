function Controller() {
    function listEvents(events) {
        for (var i = 0; events.length > i; i++) {
            var button = Ti.UI.createButton({
                title: events[i]["fields"]["name"],
                buttonName: events[i]["fields"]["name"],
                eventID: events[i]["pk"],
                width: "auto",
                height: "auto",
                top: 105 * i,
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 10
            });
            button.addEventListener("click", function(e) {
                Ti.API.info(e.source.title + " ( " + e.source.eventID + " ) button clicked");
                var eventDetailController = Alloy.createController("EventDetail", {
                    eventid: e.source.eventID
                });
                eventDetailController.openMainWindow($.tab_two);
            });
            view.add(button);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tabViewTwoChild";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.child_window2 = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "child_window2",
        title: "Child Window"
    });
    $.__views.child_window2 && $.addTopLevelView($.__views.child_window2);
    $.__views.child_window2_label = Ti.UI.createLabel({
        text: "Child Window Two Label",
        top: "20",
        id: "child_window2_label"
    });
    $.__views.child_window2.add($.__views.child_window2_label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tab) {
        _tab.open($.child_window2);
    };
    var args = arguments[0] || {};
    $.child_window2_label.setText(args.genre || "No Genre clicked");
    $.child_window2.title = "Genre: " + args.genre;
    var myRequest = Ti.Network.createHTTPClient({
        onload: function() {
            jsonObject = JSON.parse(this.responseText);
            var events = jsonObject;
            listEvents(events);
        },
        onerror: function(e) {
            alert(e.error);
        },
        timeout: 5e3
    });
    myRequest.open("GET", "http://data.news-leader.com/things/genre/" + args.genre);
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
    $.child_window2.add(scrollView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;