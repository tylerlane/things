 
$.search_button.addEventListener("click",function(){
	Ti.API.info("in open button click event handler");
	
	var ListEventsByGenreController = Alloy.createController('ListEventsByGenre',{
	     name: $.name_textfield.getValue(),
	     search: "true",
         parentTab : $.tab_one
	});
	
	$.tab_one.open(ListEventsByGenreController.getView()); 
	
});


function doClick(e) {  
    alert($.label.text);
}

// var picker = Ti.UI.createPicker({
  // type:Ti.UI.PICKER_TYPE_DATE,
  // minDate:new Date(2009,0,1),
  // maxDate:new Date(2014,11,31),
  // value:new Date(2014,3,12),
  // top:50
// });
// $.view.add(picker);
// $.window.addEventListener("open",function(){
	// $.logo.init({ image: 'News-Leader Logo.png', width: 250, height: 250 });
// });
