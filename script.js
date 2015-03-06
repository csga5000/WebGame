//Variable declarations
var mapMaker;
var display;

var objs = [];

//The function I created gets called when the page is loaded
$(document).ready(function(){
	display = $('#display').remove();
});

/**
 * Called when submit button is pressed
 * Loads characters as div's
 **/
function submitLevel(){
	var content = $('#map').val();
	var output = '';

	//X and Y aren't used YET but may be usefull
	var x = 0;
	var y = 0;
	for(var i = 0; i < content.length; i++) {
		var c = content.charAt(i);

		if (c === "\n") {
			y++;
			continue;
		} 

		objs.push(new GameObj(x,y,c));

		x++;
	}

	$('#beforeDisplay').after(display);
	$('#display').html(output);
	//This will remove text area
	mapMaker = $('#getContent').remove();
	$('#display').after('<button id="backButton" class="btn-success" onclick="backButton()">text</button>');
}

function backButton() {
	$('#beforeDisplay').before(mapMaker);
	$('#backButton').remove();
}