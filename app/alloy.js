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
require('datejs/date');
Ti.Geolocation.purpose = "Show events near your location";

// /* app feedback section */
// var apptentiveModule = require('com.apptentive.titanium');
// Ti.API.info("module is => " + apptentiveModule);
// apptentiveModule.setApiKey("e9bb85c57b58fe048d13f10e0b2bf90852ec5bd566d77a11175f6c0d3e34533d");


var NappTestFlight = require('dk.napp.testflight');
NappTestFlight.takeOff("a794c32d-6777-4e29-98da-c3171e9abd2e"); //get token from Test Flight website

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

function addToCalendar(details)
{
    var defCalendar = Ti.Calendar.defaultCalendar;
    // var date1 = new Date(new Date().getTime() + 3000),
        // date2 = new Date(new Date().getTime() + 900000);
    Ti.API.info('details :' + details);
    Ti.API.info('start_date:' + details.begin);
    Ti.API.info('end_date:' + details.end);
    var event1 = defCalendar.createEvent({
            title:details.title,  // optional
            // begin:Date.parse(e.source.eventDate),   // optional
            // notes: 'This is a test event which has some values assigned to it.',
            // location: 'Appcelerator Inc',
            notes: details.description,
            location: details.location,
            begin: Date.parse(details.begin),
            end: Date.parse(details.end),
            availability: Ti.Calendar.AVAILABILITY_BUSY,
            allDay: false,
    });
    Ti.API.info( 'Begin' + event1.getBegin());
    Ti.API.info( 'End' + event1.getEnd());
    
    var alert1 = event1.createAlert({
            absoluteDate: new Date(new Date().getTime() - (1000*60*20))
    });
    event1.save();
    Ti.API.info( "event1" + event1 );
    //Ti.API.info( "event1: " + event1.getStatus() );
    
}
