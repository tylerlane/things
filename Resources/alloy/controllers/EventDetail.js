function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "EventDetail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.event_detail = Ti.UI.createWindow({
        id: "event_detail",
        title: "Event Detail"
    });
    $.__views.event_detail && $.addTopLevelView($.__views.event_detail);
    $.__views.event_text_area = Ti.UI.createTextArea({
        id: "event_text_area"
    });
    $.__views.event_detail.add($.__views.event_text_area);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function() {
        Ti.API.info($.event_detail);
        $.tab_group.activeTab.open($.event_detail);
    };
    var args = arguments[0] || {};
    var myRequest = Ti.Network.createHTTPClient({
        onload: function() {
            jsonObject = JSON.parse(this.responseText);
            var event_detail = jsonObject;
            $.event_text_area.value = event_detail.length;
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