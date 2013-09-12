//settings args and titles etc
var args = arguments[0] || {};
$.parentController = args.parentTab;
var alloy = require('alloy');
var view = Ti.UI.createView({
    width:Ti.UI.FILL,
    height: Ti.UI.FILL
});

Ti.App.fireEvent('show_indicator'); //display loading spinner until webview gets loaded
var fbUrl = "http://dining.news-leader.com";
var extwebview = Titanium.UI.createWebView({
     top:0,
     bottom:0,
     left:0,
     right:0,
     url:fbUrl,
     height:Ti.UI.FILL,
     width:Ti.UI.FILL,
     backgroundColor:'#8dbcb7'
});
view.add(extwebview); //adding webview in current window
$.diningWindow.add(view);
extwebview.addEventListener('load', function() {
    Ti.App.fireEvent('hide_indicator'); //Hide the Loading indicator after the webview loaded
});
 
// var space = Titanium.UI.createButton({
    // systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
// });
//    
// var buttonClose = Titanium.UI.createButton({
    // title:"Done",
    // style:Titanium.UI.iPhone.SystemButtonStyle.DONE 
// });
//  
// var bottomToolbar = Titanium.UI.createToolbar({
    // left : 0,
    // bottom: 0,
    // height : 40,
    // width : 320,
    // items: [space,space, space,space, space, space,buttonClose]
// });
// $.diningWindow.add(bottomToolbar); // add close button at the bottom tabbar to close the webview 
//    
// buttonClose.addEventListener('click', function (e) {
    // win.remove(extwebview);
    // win.remove(bottomToolbar);
// });