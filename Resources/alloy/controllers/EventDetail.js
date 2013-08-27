function Controller() {
    function eventDetail(event_detail) {
        var image = Ti.UI.createImageView({
            image: "http://data-media.news-leader.com/" + event_detail["fields"]["main_photo"],
            height: 400,
            top: 75
        });
        $.event_detail_win.add(image);
        Ti.API.info("Adding image to view1. url is " + image.getImage());
        $.label1.setText(event_detail["fields"]["name"]);
        $.label2.setText(event_detail["fields"]["description"]);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "EventDetail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.event_detail_win = Ti.UI.createWindow({
        backgroundColor: "#065365",
        id: "event_detail_win",
        title: "Event Detail"
    });
    $.__views.event_detail_win && $.addTopLevelView($.__views.event_detail_win);
    $.__views.label1 = Ti.UI.createLabel({
        id: "label1",
        color: "white",
        shadowColor: "#aaa",
        text: "A simple label",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: "0"
    });
    $.__views.event_detail_win.add($.__views.label1);
    $.__views.label2 = Ti.UI.createLabel({
        text: "",
        id: "label2",
        color: "white",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        top: "25"
    });
    $.__views.event_detail_win.add($.__views.label2);
    $.__views.going = Ti.UI.createButton({
        backgroundColor: "#065365",
        color: "white",
        title: "I'm Going!",
        id: "going",
        left: "10"
    });
    $.__views.event_detail_win.add($.__views.going);
    $.__views.notinterested = Ti.UI.createButton({
        backgroundColor: "#065365",
        color: "white",
        title: "Not Interested",
        id: "notinterested",
        left: "150"
    });
    $.__views.event_detail_win.add($.__views.notinterested);
    $.__views.label3 = Ti.UI.createLabel({
        id: "label3",
        color: "black",
        top: "300"
    });
    $.__views.event_detail_win.add($.__views.label3);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    $.event_detail_win.setTitle("Event Detail: " + args.eventid);
    var myRequest = Ti.Network.createHTTPClient({
        onload: function() {
            jsonObject = JSON.parse(this.responseText);
            var event_detail = jsonObject;
            eventDetail(event_detail[0]);
        },
        onerror: function(e) {
            alert(e.error);
        },
        timeout: 5e3
    });
    myRequest.open("GET", "http://data.news-leader.com/things/event/" + args.eventid);
    myRequest.send();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;