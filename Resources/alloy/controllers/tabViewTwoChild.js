function Controller() {
    function listEvents(events) {
        var data = [];
        for (var i = 0; events.length > i; i++) {
            var row = {
                title: events[i]["fields"]["name"],
                eventID: events[i]["pk"],
                hasDetail: true,
                color: "blue"
            };
            data.push(row);
        }
        var tableview = Titanium.UI.createTableView({
            data: data
        });
        tableview.addEventListener("click", function(e) {
            showClickEventInfo(e);
        });
        tableview.addEventListener("longclick", function(e) {
            showClickEventInfo(e, true);
        });
        view.add(tableview);
    }
    function showClickEventInfo(e, islongclick) {
        var index = e.index;
        var section = e.section;
        var row = e.row;
        var rowdata = e.rowData;
        Ti.API.info("detail " + e.detail);
        var msg = "row " + row + " index " + index + " section " + section + " row data " + rowdata;
        islongclick && (msg = "LONGCLICK " + msg);
        Ti.API.info(e.source.title + " ( " + e.source.eventID + " ) button clicked");
        Ti.API.info(msg);
        var eventDetailController = Alloy.createController("EventDetail", {
            eventid: e.rowData.eventID,
            parentTab: args.parentTab
        });
        args.parentTab.open(eventDetailController.getView());
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
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
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
        width: "95%"
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