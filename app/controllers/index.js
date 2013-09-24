$.index.open();

Titanium.App.addEventListener('close', function (e) {
    Ti.API.info("app exiting. closing the db");
    if(typeof(db) != "undefined" )
    {
        db.close();
    }
});  



Titanium.Analytics.featureEvent('starting app');
tracker.trackEvent({ category: "Index Page", action: "loaded"});

var feedback_count = apptentiveModule.unreadMessageCount();
Ti.API.info( "feedback count = " + feedback_count );
if( feedback_count > 0 )
{
    var dialog = Ti.UI.createAlertDialog({
        message: 'Your feedback has been replied to',
        ok: 'Open Feedback',
        title: 'Feedback'
      }).show();
      dialog.addEventListener("click",function(e){
          apptentiveModule.presentMessageCenter();
      });
}

// apptentiveModule.addEventListener('ATMessageCenterUnreadCountChangedNotification', function(e) {
    // Ti.API.info('New unread Message Center messages! ' + e.type);
    // var dialog = Ti.UI.createAlertDialog({
        // message: 'Your feedback has been replied to',
        // ok: 'Open Feedback',
        // title: 'Feedback'
      // }).show();
      // dialog.addEventListener("click",function(e){
          // apptentiveModule.presentMessageCenter();
      // });
// });