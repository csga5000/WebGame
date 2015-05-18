//Variable declarations

//HTML Elemnts

var mapMaker;
var display;
var game;

var tiles = [];

var w = 25;
var h = 10;
var cust_tsize = 0;
var mapsize = 100;

var selectedTile;

//for debuging elements
function debug(param){
	alert(param);
}

//The function passed to ready gets called when the document(aka. the webpage) is loaded
$(document).ready(function(){

	display = $('#display').remove();
	window.onkeydown = keyDown;
	window.onkeyup = keyUp;

	$('#saveNewTile').click(function() {
		var tile = new Tile();

		var modal = $('#createObjectModal');

		tile.name = modal.find('[name="tile_name"]').val();
		tile.image = modal.find('[name="image_url"]').val();
		tile.bg_image = modal.find('[name="bg_image_url"]').val();
		tile.description = modal.find('[name="description"]').html();

		addTile(tile);

		$('#createObjectModal').modal('hide');
	});
});

function addTile(tile) {
	tiles.push(tile);

	var tile_item = $('<div class="tile_list_item bg_fg_tile"></div>');
	tile_item.attr('tile-id',tile.id);

	tile_item.append($('<img/>').attr('src',tile.bg_image));
	tile_item.append($('<img/>').attr('src',tile.image));

	$('#tile_list').append(tile_item);

	tile_item.click(function(){
		console.log(this);
		selectedTile = getTileById($(this).attr('tile-id'));
	});
}

function getTileById(id) {
	var tile = null;

	tiles.forEach(function(t){
		if (t.id == id)
			tile = t;
	});

	return tile;
}

$('#mapTiles').ready(function(){
	setMapTilesFromInputs();
});

$(window).resize(function(){
	setMapTilesWithTimeout();
});

//// Viewport/Tilesize related functions ////

var uptimeout;
function resizeViewport(elem) {
	mapsize = Number($(elem).val());
	if (mapsize === 0 || mapsize > 100)
		mapsize = 100;

	window.clearTimeout(uptimeout);
	uptimeout = window.setTimeout(udpateViewport, 500);
}

function udpateViewport(){
	$('#mapBuilderContent').css('width', mapsize+'%');
	setMapTiles();
}

var resizetimeout;
function resizeTiles(elem) {
	cust_tsize = Number($(elem).val());

	window.clearTimeout(resizetimeout);
	resizetimeout = window.setTimeout(setMapTiles, 500);
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
	var tsize = cust_tsize ? cust_tsize : Math.floor($('#mapBuilderContent').width()/w);

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
				aty = $('<div class="map-row" y="'+ y +'">');
				map.append(aty);
			}
			for (var x = 0; true; x++) {
				atx = $('div[x='+ x +'][y='+ y +']');//Evaluates to something like $('div[x=5][y=5]')
				if (!(x < w || atx.length))
					break;

				if(!atx.length) {
					var elem = $('<div class="mapTile"></div>');
					elem.attr('x',x);
					elem.attr('y',y);

					elem.click(mapTileClicked);

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

function mapTileClicked() {
	$(this).attr('tile-id',selectedTile.id);

	$(this).html(selectedTile.getImageDiv());
}

//// SUBMIT LEVEL STUFF ////

/**
 * Called when submit button is pressed
 * Loads characters as div's
 **/
function submitLevel()
{
	game = new Game();

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

	mapWidth = Number.parseInt($('#mapW').val());

	//X and Y aren't used YET but may be usefull
	var x = 0;
	var y = 0;
	for (i = 0; i < mapWidth; i++)  {	// < content.length not working
		obj = new GameObj(x,y);
		game.addObj(obj);
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

	game.start();
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