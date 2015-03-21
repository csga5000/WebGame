//Variable declarations

var mapMaker;
var display;

var mapWidth = 20; //temp value 

var objs = [];

var w = 25;
var h = 10;

//The function I created gets called when the page is loaded
$(document).ready(function(){
	display = $('#display').remove();
	window.onkeydown = keyDown;
	window.onkeyup = keyUp;
});

$('#mapTiles').ready(function(){
	setMapTilesFromInputs();
});

$(window).resize(function(){
	setMapTilesWithTimeout();
});

function resizeViewport() {
	var size = Number($('#vwidth').val());
	if (size === 0)
		size = 100;
	$('#mapBuilderContent').css('width', size+'%');

	setMapTiles();
}

function setMapTilesFromInputs() {
	w = $('#mapW').val();
	h = $('#mapH').val();
	
	setMapTiles();
}

//Fixes bug with shrinking webpage
function setMapTilesWithTimeout() {
	$('#mapTiles').width($(window).width()/2);
	setTimeout(setMapTiles,100);
}

function setMapTiles() {
	var map = $('#mapTiles');
	var tsize = Math.floor($('#mapBuilderContent').width()/w);

	var aty, atx;

	for (var y = 0; true; y++) {
		aty = $('.map-row[y='+ y +']');//Evaluates to something like $('div[y=5]')
		if (!(y < h || aty.length))
			break;

		if(y >= h) {
			aty.remove();
		}
		else {
			if (!aty.length) {
				map.append('<div class="map-row" y="'+ y +'">');
				aty = $('.map-row[y='+ y +']');
			}
			for (var x = 0; true; x++) {
				atx = $('div[x='+ x +'][y='+ y +']');//Evaluates to something like $('div[x=5][y=5]')
				if (!(x < w || atx.length))
					break;

				if(!atx.length) {
					var elem = '<div x="' + x + '" y="' + y + '" class="mapTile"></div>';
					aty.append(elem);
				}
				else if(x >= w)
					atx.remove();
			}
		}
	}

	$('.mapTile').css('width', tsize).css('height', tsize);

	map.width(tsize*w);
}

/**
 * Called when submit button is pressed
 * Loads characters as div's
 **/
function submitLevel(){
	//Add the display div in
	$('#beforeDisplay').after(display);

	var content = $('#map').val();	//Not Working	
	//var content = ''; //temp for line above
	var output = '';
	
	var disp = $('#display');
	var position = disp.position();
	var bounds = {
		x: position.x,
		y: position.y,
		width: disp.width(),
		width: disp.height(),
	}

	//Cleanup vars we don't need
	delete disp;
	delete position;
	
	//X and Y aren't used YET but may be usefull
	var x = 0;
	var y = 0;
	for (i = 0; i < mapWidth; i++)  {	// < content.length not working
		var c = content.charAt(i);

		if (c === "\n") {
			console.log("Gotcha...");
		 	x = 0;
		 	y++;
		 	continue;
		} 

		//** there's something wrong in this code. It won't loop **
		obj = new GameObj(x,y,c);
		objs.push(obj);
		output += GameObj.htmlForObj(obj); //Gets the HTML element for the object

		///*DEBUG*/document.write("(x: " + x + ", y: " + y + "), ");/*DEBUG*/ 
		//I prefer console.log.  You can view it in inspect element
		console.log('Looping at: x:' + x + " y: " + y);

		x++;
	}

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
	//console.log(key);
	
	//ARROWS: LTRB - 37, 38, 39, 40
	//WASD: 87, 68, 83, 65
}

function clear() {
	
	
}