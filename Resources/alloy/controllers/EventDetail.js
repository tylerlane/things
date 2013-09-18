function Controller() {
    function eventDetail(event_detail) {
        var label = Ti.UI.createLabel({
            text: event_detail["fields"]["name"],
            color: "white",
            font: {
                fontSize: 24,
                fontWeight: "bold"
            },
            top: 5,
            left: 25
        });
        view.add(label);
        var outer_wrapper_view = Ti.UI.createView({
            layout: "vertical",
            height: 400,
            width: Ti.UI.FILL,
            top: 5,
            bottom: 5,
            left: 5,
            right: 5,
            borderRadius: 5,
            backgroundColor: "#065365"
        });
        view.add(outer_wrapper_view);
        var picture_view = Ti.UI.createView({
            width: Ti.UI.FILL,
            layout: "vertical",
            height: Ti.UI.SIZE
        });
        outer_wrapper_view.add(picture_view);
        var image = Ti.UI.createImageView({
            image: "http://data-media.news-leader.com/" + event_detail["fields"]["main_photo"],
            height: 175,
            top: 8,
            hires: true,
            backgroundColor: "white",
            borderRadius: 5
        });
        picture_view.add(image);
        var text_view = Ti.UI.createView({
            layout: "vertical",
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            right: 5,
            left: 5
        });
        picture_view.add(text_view);
        var when = Ti.UI.createLabel({
            text: "WHEN",
            color: "yellow",
            height: Ti.UI.SIZE,
            width: Ti.UI.FILL,
            top: 5,
            left: 5,
            font: {
                fontSize: 16,
                fontFamily: "Helvetica",
                fontWeight: "bold"
            }
        });
        text_view.add(when);
        var when_text = Ti.UI.createLabel({
            text: Date.parse(event_detail["fields"]["start_date"] + " " + event_detail["fields"]["start_time"]).toString("M/d/yy hh:ss tt"),
            font: {
                fontSize: 16,
                fontFamily: "Helvetica",
                fontWeight: "bold"
            },
            left: 5,
            top: -3,
            height: Ti.UI.SIZE,
            width: Ti.UI.Fill,
            color: "white"
        });
        text_view.add(when_text);
        var where = Ti.UI.createLabel({
            text: "WHERE",
            font: {
                fontSize: 16,
                fontFamily: "Helvetica",
                fontWeight: "bold"
            },
            top: 0,
            left: 5,
            height: Ti.UI.SIZE,
            width: Ti.UI.FILL,
            color: "yellow"
        });
        text_view.add(where);
        var where_text = Ti.UI.createLabel({
            text: event_detail["fields"]["contact_address"],
            font: {
                fontSize: 16,
                fontFamily: "Helvetica",
                fontWeight: "bold"
            },
            left: 5,
            top: -3,
            height: Ti.UI.SIZE,
            width: Ti.UI.FILL,
            color: "white"
        });
        text_view.add(where_text);
        var cost = Ti.UI.createLabel({
            text: "COST",
            font: {
                fontSize: 16,
                fontFamily: "Helvetica",
                fontWeight: "bold"
            },
            top: 0,
            left: 5,
            height: Ti.UI.SIZE,
            width: Ti.UI.FILL,
            color: "yellow"
        });
        text_view.add(cost);
        var cost_text = Ti.UI.createLabel({
            text: event_detail["fields"]["cost_description"],
            font: {
                fontSize: 16,
                fontFamily: "Helvetica",
                fontWeight: "bold"
            },
            left: 5,
            top: -3,
            height: Ti.UI.SIZE,
            width: Ti.UI.Fill,
            color: "white"
        });
        text_view.add(cost_text);
        button_view = Ti.UI.createView({
            layout: "horizontal",
            width: Ti.UI.SIZE,
            top: 3,
            bottom: 0
        });
        var going_button = Ti.UI.createButton({
            eventID: event_detail["pk"],
            eventTitle: event_detail["fields"]["name"],
            eventDate: event_detail["fields"]["start_date"] + " " + event_detail["fields"]["start_time"],
            title: "I'm Going!",
            width: "45%",
            height: "30",
            font: {
                fontSize: 16
            },
            bubbleParent: false,
            style: "none",
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 5,
            color: "#065365",
            backgroundColor: "white"
        });
        going_button.addEventListener("click", function(e) {
            var check_query = "SELECT * from my_events where id = '" + e.source.eventID + "'";
            var check_rs = db.execute(check_query);
            if (check_rs.isValidRow()) {
                var query = "DELETE FROM my_events where id='" + e.source.eventID + "'";
                db.execute(query);
                e.source.setBackgroundColor("white");
                e.source.setColor("#065365");
            } else {
                var query = "INSERT INTO my_events(id,event_name,event_date,status)VALUES('" + e.source.eventID + "','" + e.source.eventTitle + "', '" + e.source.eventDate + "','going');";
                db.execute(query);
                e.source.setBackgroundColor("#065365");
                e.source.setColor("white");
            }
            check_rs.close();
        });
        button_view.add(going_button);
        var maybe_button = Ti.UI.createButton({
            title: "I'm Interested",
            eventID: event_detail["pk"],
            eventTitle: event_detail["fields"]["name"],
            eventDate: event_detail["fields"]["start_date"] + " " + event_detail["fields"]["start_time"],
            style: "none",
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 5,
            color: "#065365",
            height: "30",
            left: 5,
            width: "45%",
            font: {
                fontSize: 16
            },
            bubbleParent: false,
            style: "none",
            backgroundColor: "white"
        });
        maybe_button.addEventListener("click", function(e) {
            var check_query = "SELECT * from my_events where id = '" + e.source.eventID + "'";
            var check_rs = db.execute(check_query);
            if (check_rs.isValidRow()) {
                var query = "DELETE FROM my_events where id='" + e.source.eventID + "'";
                db.execute(query);
            } else {
                var query = "INSERT INTO my_events(id,event_name,event_date,status)VALUES('" + e.source.eventID + "','" + e.source.eventTitle + "', '" + e.source.eventDate + "','interested');";
                db.execute(query);
            }
            check_rs.close();
        });
        button_view.add(maybe_button);
        outer_wrapper_view.add(button_view);
        var description_view = Ti.UI.createView({
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            layout: "horizontal",
            top: 5,
            bottom: 5,
            left: 5,
            bottom: 5
        });
        var description_text = Ti.UI.createLabel({
            text: event_detail["fields"]["description"],
            height: Ti.UI.SIZE,
            width: Ti.UI.FILL,
            left: 10,
            right: 10,
            font: {
                fontSize: 16,
                fontFamily: "Helvetica"
            },
            color: "white"
        });
        description_view.add(description_text);
        view.add(description_view);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "EventDetail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.event_detail_win = Ti.UI.createWindow({
        barColor: "#065365",
        backgroundImage: "background.png",
        id: "event_detail_win",
        title: "Event Detail"
    });
    $.__views.event_detail_win && $.addTopLevelView($.__views.event_detail_win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("datejs/date");
    require("alloy");
    var db = Ti.Database.open("Things");
    db.execute("CREATE TABLE IF NOT EXISTS my_events(id INTEGER PRIMARY KEY UNIQUE, event_name TEXT, event_date TEXT,status TEXT);");
    db.file.setRemoteBackup(false);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    var scrollView = Ti.UI.createScrollView({
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: false,
        height: "auto",
        width: "auto"
    });
    var view = Ti.UI.createView({
        top: 0,
        height: "auto",
        width: Ti.UI.FILL,
        layout: "vertical"
    });
    scrollView.add(view);
    $.event_detail_win.add(scrollView);
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