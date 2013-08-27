function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "MyThings";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.window = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "window"
    });
    $.__views.label = Ti.UI.createLabel({
        text: "My Things",
        id: "label"
    });
    $.__views.window.add($.__views.label);
    $.__views.tab_one = Ti.UI.createTab({
        window: $.__views.window,
        id: "tab_one",
        title: "My Things",
        icon: Titanium.UI.iPhone.SystemIcon.Favorites
    });
    $.__views.tab_one && $.addTopLevelView($.__views.tab_one);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;