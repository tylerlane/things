function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "MyThings";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.my_things_win = Ti.UI.createWindow({
        barColor: "#065365",
        backgroundImage: "background.png",
        id: "my_things_win",
        title: "My Things"
    });
    $.__views.tab_one = Ti.UI.createTab({
        window: $.__views.my_things_win,
        id: "tab_one",
        title: "My Things",
        icon: "calendar.png"
    });
    $.__views.tab_one && $.addTopLevelView($.__views.tab_one);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var mythings_db = Ti.Database.open("Things");
    mythings_db.execute("CREATE TABLE IF NOT EXISTS my_events(id INTEGER PRIMARY KEY UNIQUE, event_name TEXT, event_date TEXT,status TEXT);");
    mythings_db.close();
    var mythings_db = Ti.Database.open("Things");
    mythings_db.file.setRemoteBackup(false);
    var check_query = "SELECT * FROM my_events where status='going'";
    Ti.API.info("check_query: " + check_query);
    var mythings_rs = mythings_db.execute(check_query);
    Ti.API.info("mythings_rs: " + mythings_rs);
    var mythings_reminders = mythings_rs.getRowCount();
    Ti.API.info("num_reminders: " + mythings_reminders.toString());
    if (mythings_reminders > 0 && Ti.App.Properties.getBool("show_reminders")) {
        $.tab_one.setBadge(mythings_reminders.toString());
        Titanium.UI.iPhone.appBadge = mythings_reminders.toString();
    }
    $.tab_one.addEventListener("focus", function() {
        $.tab_one.setBadge(null);
        Titanium.UI.iPhone.appBadge = null;
        if (reminder_wrapper && void 0 != reminder_wrapper.children) {
            var removeData = [];
            for (i = reminder_wrapper.children.length; i > 0; i--) removeData.push(reminder_wrapper.children[i - 1]);
            for (i = 0; removeData.length > i; i++) reminder_wrapper.remove(removeData[i]);
            removeData = null;
        }
        if (interested_wrapper && void 0 != interested_wrapper.children) {
            var removeData = [];
            for (i = interested_wrapper.children.length; i > 0; i--) removeData.push(interested_wrapper.children[i - 1]);
            for (i = 0; removeData.length > i; i++) interested_wrapper.remove(removeData[i]);
            removeData = null;
        }
        var check_query = "SELECT * FROM my_events where status='going'";
        Ti.API.info("check_query: " + check_query);
        var mythings_rs = mythings_db.execute(check_query);
        Ti.API.info("mythings_rs: " + mythings_rs);
        var mythings_reminders = mythings_rs.getRowCount();
        Ti.API.info("num_reminders: " + mythings_reminders.toString());
        if (mythings_rs.getRowCount() >= 1) {
            while (mythings_rs.isValidRow()) {
                Ti.API.info("looping through check_rs");
                var reminder_view = Ti.UI.createView({
                    layout: "horizontal",
                    width: Ti.UI.FILL,
                    height: Ti.UI.SIZE,
                    top: 0,
                    left: 25,
                    eventID: "2"
                });
                var reminder_label_text = Ti.UI.createLabel({
                    text: mythings_rs.fieldByName("event_name"),
                    eventID: mythings_rs.fieldByName("id"),
                    left: 0,
                    color: "white",
                    width: "65%",
                    font: {
                        fontSize: 14,
                        fontFamily: "Tall Dark and Handsome Condensed",
                        fontWeight: "bold"
                    }
                });
                reminder_view.add(reminder_label_text);
                var reminder_label_text = Ti.UI.createLabel({
                    eventID: mythings_rs.fieldByName("id"),
                    text: Date.parse(mythings_rs.fieldByName("event_date")).toString("MMM d, yyyy"),
                    right: 0,
                    color: "white",
                    width: "35%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
                    font: {
                        fontSize: 14,
                        fontFamily: "Tall Dark and Handsome Condensed",
                        fontWeight: "bold"
                    }
                });
                reminder_view.add(reminder_label_text);
                mythings_rs.next();
                reminder_wrapper.add(reminder_view);
            }
            mythings_rs.close();
        } else {
            var reminder_view = Ti.UI.createView({
                layout: "horizontal",
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                top: 0,
                left: 25,
                eventID: "2"
            });
            var reminder_label_text = Ti.UI.createLabel({
                text: 'No Events set to "I\'m Going"',
                left: 0,
                color: "white",
                width: "100%",
                font: {
                    fontSize: 14,
                    fontFamily: "Tall Dark and Handsome Condensed",
                    fontWeight: "bold"
                }
            });
            reminder_view.add(reminder_label_text);
            reminder_wrapper.add(reminder_view);
        }
        var check_query = "SELECT * FROM my_events where status='interested'";
        Ti.API.info("check_query: " + check_query);
        var mythings_rs = mythings_db.execute(check_query);
        Ti.API.info("mythings_rs: " + mythings_rs);
        var mythings_reminders = mythings_rs.getRowCount();
        Ti.API.info("num_reminders: " + mythings_reminders.toString());
        if (mythings_rs.getRowCount() >= 1) {
            while (mythings_rs.isValidRow()) {
                Ti.API.info("looping through check_rs");
                var interested_view = Ti.UI.createView({
                    layout: "horizontal",
                    width: Ti.UI.FILL,
                    height: Ti.UI.SIZE,
                    top: 0,
                    left: 25,
                    eventID: "2"
                });
                var interested_label_text = Ti.UI.createLabel({
                    text: mythings_rs.fieldByName("event_name"),
                    eventID: mythings_rs.fieldByName("id"),
                    left: 0,
                    color: "white",
                    width: "65%",
                    font: {
                        fontSize: 14,
                        fontFamily: "Tall Dark and Handsome Condensed",
                        fontWeight: "bold"
                    }
                });
                interested_view.add(interested_label_text);
                var interested_label_text = Ti.UI.createLabel({
                    eventID: mythings_rs.fieldByName("id"),
                    text: Date.parse(mythings_rs.fieldByName("event_date")).toString("MMM d, yyyy"),
                    right: 0,
                    color: "white",
                    width: "35%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
                    font: {
                        fontSize: 14,
                        fontFamily: "Tall Dark and Handsome Condensed",
                        fontWeight: "bold"
                    }
                });
                interested_view.add(interested_label_text);
                mythings_rs.next();
                interested_wrapper.add(interested_view);
            }
            mythings_rs.close();
        } else {
            var interested_view = Ti.UI.createView({
                layout: "horizontal",
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                top: 0,
                left: 25,
                eventID: "2"
            });
            var interested_label_text = Ti.UI.createLabel({
                text: 'No Events set to "I\'m Interesed"',
                left: 0,
                color: "white",
                width: "100%",
                font: {
                    fontSize: 14,
                    fontFamily: "Tall Dark and Handsome Condensed",
                    fontWeight: "bold"
                }
            });
            interested_view.add(interested_label_text);
            interested_wrapper.add(interested_view);
        }
    });
    var scrollView = Ti.UI.createScrollView({
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: false,
        height: "100%",
        width: "100%"
    });
    var view = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    });
    var reminders = Ti.UI.createImageView({
        image: "im_going_bar.png",
        width: 320,
        top: 5,
        hires: true,
        title: "reminders"
    });
    view.add(reminders);
    var reminder_wrapper = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE
    });
    view.add(reminder_wrapper);
    reminder_wrapper.addEventListener("click", function(e) {
        Ti.API.info("click event received in reminder listing");
        Ti.API.info("source title = " + e.source.title);
        var eventDetailController = Alloy.createController("EventDetail", {
            eventid: e.source.eventID,
            parentTab: $.tab_one
        });
        $.tab_one.open(eventDetailController.getView());
    });
    var interested = Ti.UI.createImageView({
        image: "im_interested_bar.png",
        width: 320,
        top: 5,
        hires: true,
        title: "reminders"
    });
    view.add(interested);
    var interested_wrapper = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE
    });
    view.add(interested_wrapper);
    interested_wrapper.addEventListener("click", function(e) {
        Ti.API.info("click event received in reminder listing");
        Ti.API.info("source title = " + e.source.title);
        var eventDetailController = Alloy.createController("EventDetail", {
            eventid: e.source.eventID,
            parentTab: $.tab_one
        });
        $.tab_one.open(eventDetailController.getView());
    });
    scrollView.add(view);
    $.my_things_win.add(scrollView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;