//Variable declarations

var mapMaker;
var display;

var mapWidth = 20; //temp value 

var objs = [];

//The function I created gets called when the page is loaded
$(document).ready(function(){
	display = $('#display').remove();
	window.onkeydown = keyDown;
	window.onkeyup = keyUp;
});

/**
 * Called when submit button is pressed
 * Loads characters as div's
 **/
function submitLevel(){
	//var content = $('#map').val();	//Not Working	
	var content = ''; //temp for line above
	var output = '';

	
	//X and Y aren't used YET but may be usefull
	var x = 0;
	var y = 0;
	for (i = 0; i < mapWidth; i++)  {	// < content.length not working
		var c = content.charAt(i);

		if (c === "\n") {
		 	x = 0;
		 	y++;
		 	continue;
		} 

		//** there's something wrong in this code. It won't loop **
		//obj = new GameObj(x,y,c);
		//objs.push(obj);
		//output += GameObj.htmlForObj(obj); //Gets the HTML element for the object

		/*DEBUG*/document.write("(x: " + x + ", y: " + y + "), ");/*DEBUG*/ 
		
		x++;
	}

	$('#beforeDisplay').after(display);
	$('#display').html(output);
	//This will remove text area
	mapMaker = $('#getContent').remove();
	$('#display').after('<button id="backButton" class="btn-success" onclick="backButton()">text</button>');

	update();
	setInterval(update,15);//Called every 15 miliseconds, so 66 times a second
}

function update() {
	objs.forEach(function(obj){
		obj.update();
	});
}

function backButton() {
	$('#beforeDisplay').before(mapMaker);
	$('#backButton').remove();
}

function keyDown(event) {
	key = event.keyCode;
}

function keyUp(event) {
	key = event.keyCode;
	console.log(key);
	
	//ARROWS: LTRB - 37, 38, 39, 40
	//WASD: 87, 68, 83, 65
}

function clear() {
	
	
}