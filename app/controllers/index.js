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