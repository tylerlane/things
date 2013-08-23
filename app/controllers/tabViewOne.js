 
$.open_button.addEventListener("click",function(){
	Ti.API.info("in open button click event handler");
	
	var tabViewOneChildController = Alloy.createController('tabViewOneChild');
	
	tabViewOneChildController.openMainWindow($.tab_one);
	
});

function doClick(e) {  
    alert($.label.text);
}

// $.window.addEventListener("open",function(){
	// $.logo.init({ image: 'News-Leader Logo.png', width: 250, height: 250 });
// });
