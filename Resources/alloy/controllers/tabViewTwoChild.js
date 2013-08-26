function Controller() {
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;