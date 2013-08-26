function Controller() {
    function doClick() {
        alert($.label.text);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tabViewOne";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.window = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "window"
    });
    $.__views.label = Ti.UI.createLabel({
        text: "Hello, World",
        id: "label"
    });
    $.__views.window.add($.__views.label);
    doClick ? $.__views.label.addEventListener("click", doClick) : __defers["$.__views.label!click!doClick"] = true;
    $.__views.open_button = Ti.UI.createButton({
        title: "Open Child Window",
        id: "open_button"
    });
    $.__views.window.add($.__views.open_button);
    $.__views.tab_one = Ti.UI.createTab({
        window: $.__views.window,
        id: "tab_one",
        title: "Home",
        icon: Ti.UI.iPhone.SystemIcon.HOME
    });
    $.__views.tab_one && $.addTopLevelView($.__views.tab_one);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.open_button.addEventListener("click", function() {
        Ti.API.info("in open button click event handler");
        var tabViewOneChildController = Alloy.createController("tabViewOneChild");
        tabViewOneChildController.openMainWindow($.tab_one);
    });
    __defers["$.__views.label!click!doClick"] && $.__views.label.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;