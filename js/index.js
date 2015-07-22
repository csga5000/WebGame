//Variable declarations

//HTML Elemnts

var mapMaker;
var game;

var tiles = [];

var selectedTile;

var viewport = new Viewport();

var currentRotation = 0;

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
		var modal = $('#createObjectModal');

		var tile = new Tile(Number($('#tyle-type-select').val()));

		tilename = modal.find('[name="tile_name"]');
		imgname = modal.find('[name="image_url"]');
		bgimgname = modal.find('[name="bg_image_url"]');
		desc = modal.find('[name="description"]');

		tile.name = tilename.val();
		tile.image = imgname.val();
		tile.bg_image = bgimgname.val();
		tile.description = desc.html();

		//Clear data
		tilename.val('');
		imgname.val('');
		bgimgname.val('');
		desc.val('');

		$('#objectCreationBgImage').attr('src','mapImages/Blank/blank0.png');
		$('#objectCreationImage').attr('src','mapImages/Blank/blank0.png');

		addTile(tile);

		$('#createObjectModal').modal('hide');
	});

	$('[name="image_url"]').blur(function(){
		var val = $(this).val();
		if (val == '') {
			val = 'mapImages/Blank/blank0.png';
		}
		$('#objectCreationImage').attr('src',val);
	});

	$('[name="bg_image_url"]').blur(function(){
		var val = $(this).val();
		if (val == '') {
			val = 'mapImages/Blank/blank0.png';
		}
		$('#objectCreationBgImage').attr('src',val);
	});

	$('[name="rotation"]').keyup(function(){
		currentRotation = Number.parseInt($(this).val());
	});

	$('#rotate').click(function(){
		adjustRotation(90);
	});
	$('#rotate-counter').click(function(){
		adjustRotation(-90);
	});

	$('#saveMap').click(function(){
		var dat = {
			viewport:viewport,
			tiles:tiles,
			map:getMapObjects()
		};

		dat = JSON.stringify(dat);
		$('#saveModal textarea').html(dat);
	});

	$('#loadSave').click(function(){
		var dat = $('#loadModal textarea').val();

		var obj = JSON.parse(dat);
		
		var dat = {
			viewport:{
				w:w,
				h:h,
				cust_tsize:cust_tsize,
				mapsize:mapsize,
			},
			tiles:tiles,
			map:{
				0:{
					0:{tile_id:0, rotation:"90"},
					1:{tile}
				}
			}
		};

		w = obj.viewport.w;

		this.tiles = obj.tiles;
	});

	$("#resize").click(function(){
		viewport.w = $('#mapW').val();
		viewport.h = $('#mapH').val();

		viewport.setMapTiles();
	});

	$("#resizeViewport").on("change paste keyup", function() {
		viewport.resizeViewport();
	});

	$("#resizeTiles").on("change paste keyup", function() {
		viewport.resizeTiles();
	});
});

function getMapObjects()
{
	var map = {};
	var ly = -1;

	$('.mapTile').each(function(){
		var elem = $(this);

		if (!elem.attr('tile-id'))
			return;

		var rotation = elem.css('transform').substr();
		var start = rotation.indexOf('(');
		rotation = rotation.substr(start+1,rotation.indexOf('d')-start);

		var obj = {
			tile_id:elem.attr('tile-id'),
			rotation:rotation
		};

		var y = elem.attr('y');
		if (y != ly) {
			map[y] = {};
			ly = y;
		}
		map[y][elem.attr('x')] = obj;
	});

	return map;
}

function adjustRotation(amount) {
	currentRotation += amount;
	currentRotation = currentRotation%360;
	$('[name="rotation"]').val(currentRotation);
}

function addTile(tile) {
	tiles.push(tile);

	var tile_item = $('<div class="tile_list_item bg_fg_tile"></div>');
	tile_item.attr('tile-id',tile.id);

	tile_item.append($('<img/>').attr('src',tile.bg_image));
	tile_item.append($('<img/>').attr('src',tile.image));

	$('#tile_list').append(tile_item);

	tile_item.click(function(){
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
	viewport.setMapTilesFromInputs();
});

$(window).resize(function(){
	viewport.setMapTilesWithTimeout();
});

function mapTileClicked() {
	setTileAtPos($(this), selectedTile);
}

function setTileAtPos(elem, tile) {
	if (typeof(selectedTile) === 'undefined')
		return;

	elem.attr('tile-id',selectedTile.id);

	elem.html(selectedTile.getImageDiv());

	crossBrowserCSS(elem,'transform','rotate('+currentRotation+'deg)');
}


//// SUBMIT LEVEL STUFF ////

/**
 * Called when submit button is pressed
 * Loads characters as div's
 **/
function submitLevel()
{
	var maptiles = getMapObjects();

	mapMaker = $('body').html();
	$('body').html('');

	game = new Game();

	/*
	3 & 2 are y coords,
	2 & 6 are x coords
	maptiles = {
		3:{
			2:,
			6:,

		}
		2:{}

	}*/



	$.each(maptiles, function(y,row){
		$.each(row,function(x, obj){
			var gobj = gameObjFromTile(tiles[obj.tile_id], x, y, obj);

			game.addObj(gobj);

			$('body').append(gobj.htmlForObj());
		});
	});

	game.start();

	var button = $('<button class="btn-danger">');
	button
		.html("X")
		.click(backButton)
		.css('position','fixed')
		.css('bottom','0')
		.css('right','0')
	;

	$('body').append(button);
}

function backButton() {
	$('body').html(mapMaker);

	game.stop();
	game = null;
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