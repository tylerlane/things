function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.tabgroup = Ti.UI.createTabGroup({
        id: "tabgroup"
    });
    $.__views.__alloyId0 = Alloy.createController("tabViewOne", {
        id: "__alloyId0"
    });
    $.__views.tabgroup.addTab($.__views.__alloyId0.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId1 = Alloy.createController("tabViewTwo", {
        id: "__alloyId1"
    });
    $.__views.tabgroup.addTab($.__views.__alloyId1.getViewEx({
        recurse: true
    }));
    $.__views.tabgroup && $.addTopLevelView($.__views.tabgroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;