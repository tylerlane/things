// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

//Ti.Geolocation.purpose = "Recieve User Location";
//setting the purpose flag
Ti.Geolocation.purpose = "Show events near your location";

/* app feedback section */
var apptentiveModule = require('com.apptentive.titanium');
Ti.API.info("module is => " + apptentiveModule);
apptentiveModule.setApiKey("e9bb85c57b58fe048d13f10e0b2bf90852ec5bd566d77a11175f6c0d3e34533d");


/*analytics */
var GA = require("analytics.google");
var tracker = GA.getTracker("UA-29476655-2");

/*background color */
// Ti.UI.setBackgroundColor('#065365');
Ti.UI.setBackgroundColor('#17788E');


// Function to test if device is iOS 7 or later
function isIOS7Plus()
{
    // iOS-specific test
    if (Titanium.Platform.name == 'iPhone OS')
    {
        var version = Titanium.Platform.version.split(".");
        var major = parseInt(version[0],10);

        // Can only test this support on a 3.2+ device
        if (major >= 7)
        {
            return true;
        }
    }
    return false;
}

var iOS7 = isIOS7Plus();
var theTop = iOS7 ? 20 : 0;