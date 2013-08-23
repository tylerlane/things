function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.child_window = Ti.UI.createWindow({
        id: "child_window",
        title: "Child Window"
    });
    $.__views.child_window && $.addTopLevelView($.__views.child_window);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        text: "Child Window Label",
        top: "20",
        id: "__alloyId4"
    });
    $.__views.child_window.add($.__views.__alloyId4);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tab) {
        _tab.open($.child_window);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;