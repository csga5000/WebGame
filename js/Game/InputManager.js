Keys = {
	UP:0,
	DOWN:1,
	LEFT:2,
	RIGHT:3,
};

function InputManager() {
}
InputManager.keys = [];

InputManager.keydown = function(event){
	if(typeof(InputManager.keymaps[event.keyCode]) !== 'undefined') {
		var keyname = InputManager.keymaps[event.keyCode];
		InputManager.keys[Keys[keyname]] = true;
	}
}
InputManager.keyup = function(event){
	if(typeof(InputManager.keymaps[event.keyCode]) !== 'undefined') {
		var keyname = InputManager.keymaps[event.keyCode];
		InputManager.keys[Keys[keyname]] = false;
	}
}

InputManager.start = function(){
	for (var keyName in Keys) {
		InputManager.keys[Keys[keyName]] = false;
	}


	var w = $(window);
	w.keydown(InputManager.keydown);
	w.keyup(InputManager.keyup);
	w.keyup();
}

InputManager.stop = function() {
	var w = $(window);
	w.unbind('keyup',InputManager.keyup);
	w.unbind('keydown',InputManager.keydown);
}

InputManager.keymaps = {
	87:'UP',
	38:'UP',
	83:'DOWN',
	40:'DOWN',
	65:'LEFT',
	37:'LEFT',
	68:'RIGHT',
	39:'RIGHT'
};