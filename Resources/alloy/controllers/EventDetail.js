function Controller() {
    function eventDetail(event_detail) {
        var image = Ti.UI.createImageView({
            image: "http://data-media.news-leader.com/" + event_detail["fields"]["main_photo"],
            height: 400,
            top: 75
        });
        $.event_detail_win.add(image);
        $.event_detail_win.setTitle(event_detail["fields"]["name"]);
        Ti.API.info("Adding image to view1. url is " + image.getImage());
        $.label1.setText(event_detail["fields"]["name"]);
        $.label2.setText(event_detail["fields"]["description"]);
    }
    function EventGoingClick() {
        Ti.API.info("I'm going button has been clicked");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "EventDetail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.event_detail_win = Ti.UI.createWindow({
        barColor: "#065365",
        backgroundImage: "background.png",
        id: "event_detail_win",
        title: "Event Detail"
    });
    $.__views.event_detail_win && $.addTopLevelView($.__views.event_detail_win);
    $.__views.label1 = Ti.UI.createLabel({
        top: 10,
        font: {
            fontSize: 36
        },
        textAlign: "Ti.UI.TEXT_ALIGNMENT_LEFT",
        left: 5,
        width: "Ti.UI.SIZE",
        height: "Ti.UI.SIZE",
        color: "white",
        shadowColor: "#A0A0A0",
        id: "label1",
        text: "A simple label"
    });
    $.__views.event_detail_win.add($.__views.label1);
    $.__views.label2 = Ti.UI.createLabel({
        color: "white",
        textAlign: "Ti.UI.TEXT_ALIGNMENT_LEFT",
        top: "25",
        id: "label2"
    });
    $.__views.event_detail_win.add($.__views.label2);
    $.__views.going = Ti.UI.createButton({
        left: "10",
        backgroundImage: "going.png",
        id: "going",
        title: "Going"
    });
    $.__views.event_detail_win.add($.__views.going);
    EventGoingClick ? $.__views.going.addEventListener("click", EventGoingClick) : __defers["$.__views.going!click!EventGoingClick"] = true;
    $.__views.notinterested = Ti.UI.createButton({
        left: "150",
        title: "Not Interested",
        id: "notinterested"
    });
    $.__views.event_detail_win.add($.__views.notinterested);
    $.__views.label3 = Ti.UI.createLabel({
        color: "black",
        top: "300",
        id: "label3"
    });
    $.__views.event_detail_win.add($.__views.label3);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
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
    __defers["$.__views.going!click!EventGoingClick"] && $.__views.going.addEventListener("click", EventGoingClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;