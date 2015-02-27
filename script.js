//Variable declarations
var add;
var display;

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

		//If it's a newline
		if (c === '\n') {
			output += '<br>';
			y++;
		}
		//If it's not an 'empty' character
		else if(c != '.') {
			output += '<div class="tile">' + c + '</div>';
		}
		//Empty Char
		else {
			output += '<div class="tile"></div>';
		}

		x++;
	}
	$('#beforeDisplay').after(display);
	$('#display').html(output);
}