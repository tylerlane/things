$.index.open();

Titanium.App.addEventListener('close', function (e) {
    Ti.API.info("app exiting. closing the db");
    if(typeof(db) != "undefined" )
    {
        db.close();
    }
    
});     

