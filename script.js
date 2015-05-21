//Variable declarations

//HTML Elemnts

var mapMaker;
var display;
var objs = [];

var w = 25;
var h = 10;
var cust_tsize = 0;
var mapsize = 100;

//Image Elemnts
//Is there a way to access the number of files in a folder?
var selectedImageSrc;
var selectedImage = null;
var numberOfDoorImages = 3;
var numberOfWallImages = 13;
var numberOfObjectImages = 4;
var numberOfChestImages = 0;
var numberOfPortalImages = 3;
var numberOfSpecialImages = 1;
var numberOfBackgroundImages = 3;
var numberOfPathImages = 14;

//for debuging elements
function debug(param){
	alert(param);	
}

// function populateImageTable(type){

// 	var numberOfImages
// 	switch (type){
//     	case 'door': 
//   	  		numberOfImages = numberOfDoorImages;
//   	  		break;
//   	  	case 'wall': 
//   	  		numberOfImages = numberOfWallImages;
//   	  		break;
//   	  	case 'object': 
//   	  		numberOfImages = numberOfObjectImages;
//   	  		break;
//   	  	case 'chest': 
//   	  		numberOfImages = numberOfChestImages;
//   	  		break;
//   	  	case 'portal': 
//   	  		numberOfImages = numberOfPortalImages;
//   	  		break;
//   	  	case 'special': 
//   	  		numberOfImages = numberOfSpecialImages;	
//   	  		break;
//   	  	case 'background':
//   	  		numberOfImages = numberOfBackgroundImages;
//   	  		break;
//   	  	case 'path':
//   	  		numberOfImages = numberOfPathImages;
//   	  		break;
//     	default: numberOfImages = 0;
//     		break;
//     }//end switch

// 	var table = /*$("#imageTable");*/ document.getElementById("imageTable");
	
// 	//delete rows
// 	for (var i = 0; i < table.rows.length; i++){
// 		for (var j = 0; j < table.rows[i].cells.length; j++)
// 			table.rows[i].deleteCell(j)
// 	table.deleteRow(0);
// 	}
	
// 	//Repopulate list
// 	var h = 0
// 	for (var i = 0; i < (numberOfImages/3+1); i++){
//    	 	var row = table.insertRow(i);
//     	for (var j = 0; j < 3 && h < numberOfImages; j++){
//     		row.insertCell(j).innerHTML = "<img src='mapImages/" + type + "s/" + type + h + ".png' onclick='selectImage(this)' alt='"+type+"'class = 'tile'>";
//     		h++;
//     	}//end for
// 	}//end for
// }	

// function selectImage(image){
// 	if (selectedImage != null){
// 		unselectImage(selectedImage);
// 	}
// 	document.getElementById("objectCreationImage").src = image.src; 
// 	selectedImage = image;
// 	selectedImageSrc = image.src; 
// 	image.style.border = "3px inset #8888FF";
// }

// function unselectImage(image){
// 	image.style.border = "none";
// }

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


var uptimeout;
function resizeViewport(elem) {
	mapsize = Number($(elem).val());
	if (mapsize === 0)
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