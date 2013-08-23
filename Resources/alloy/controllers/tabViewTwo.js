function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.__alloyId5 = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Tab View Two",
        icon: Ti.UI.iPhone.SystemIcon.FAVORITES,
        id: "__alloyId5"
    });
    $.__views.textArea = Ti.UI.createTextArea({
        id: "textArea",
        borderWidth: "2",
        borderColor: "#bbb",
        borderRadius: "5",
        color: "#888",
        textAlign: "left",
        value: "I am a textarea",
        top: "60",
        width: "300",
        height: "500"
    });
    $.__views.__alloyId5.add($.__views.textArea);
    $.__views.tabViewTwo = Ti.UI.createTab({
        window: $.__views.__alloyId5,
        title: "Tab View Two",
        id: "tabViewTwo"
    });
    $.__views.tabViewTwo && $.addTopLevelView($.__views.tabViewTwo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var myRequest = Ti.Network.createHTTPClient({
        onload: function() {
            jsonObject = JSON.parse(this.responseText);
        },
        onerror: function(e) {
            alert(e.error);
        },
        timeout: 5e3
    });
    myRequest.open("GET", "http://data.news-leader.com/things/genres");
    myRequest.send();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;