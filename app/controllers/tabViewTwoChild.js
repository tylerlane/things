exports.openMainWindow = function(_tab){
	_tab.open($.child_window2);
};
var args = arguments[0] || {};
$.child_window2_label.setText(args.genre || 'No Genre clicked');
