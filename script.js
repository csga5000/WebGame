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

		switch(c) {
 	   	case '\n':
    	   	output += '<br>';
			y++;
      	  	break;
    	case 'D':
    	case 'd':
    		output += '<img class = "tile" src="objectImages/door.png">'; 
    		x++;
    		break;
    	case 'W': 
    	case 'w':
    		output += '<img class = "tile" src="objectImages/brick.png">'; 
    		x++;
    		break;
    	case 'T':
    	case 't':
    		output += '<img class = "tile" src="objectImages/tree1.png">'; 
    		x++;
    		break;
    	case ' ':
    	default:
        	output += '<img class = "tile" src="objectImages/blank.png">'; 
			x++;
		}
	}
	$('#beforeDisplay').after(display);
	$('#display').html(output);
}