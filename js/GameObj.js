function GameObj(x, y, tile, opts) {
	this.x = x;
	this.y = y;

	this.id = GameObj.next_id;
	GameObj.next_id++;

	this.element = 0;

	this.tile = tile;

	this.update = function() {
		this.updateElement();
	}

	this.updateElement = function() {
		var obj = $('#obj_' + this.id);
		obj.css('left',x*GameObj.TILE_SIZE + 'px');
		obj.css('top',y*GameObj.TILE_SIZE + 'px');
	}

	//todo: switch case on type
	switch(this.tile.type) {
		case Tile.TYPE_DOOR:
			doorify(this);
			break;
		case Tile.TYPE_PORTAL;
			portalize(this);
			break;
	}


	tile.image = '';

	// this.findElement = function() {
	// 	if (!this.element) {
	// 		this.element = $('#obj_' + this.id);
	// 	}
	// 	return this.element;
	// };
}

//Set class methods/variables (static)
GameObj.htmlForObj = function(obj) {
	var div = $('<div class="game_obj"></div>');
	div.attr('id','obj_'+obj.id);
	div.css('width',GameObj.TILE_SIZE);
	div.css('height',GameObj.TILE_SIZE);
	div.html(obj.tile.getImageDiv());
	return div;
}

GameObj.next_id = 0;
GameObj.TILE_SIZE = 32;

// //get image
// GameOjb.getImage = function(obj){
// 	return obj.img;
// }


//////////////////////////////////////////////////////////////////////////////////////

function doorify (obj){

	obj.state = 'closed';  //other states 'locked', 'open', 'jammed', etc.
	obj.txt = a_or_an(state) + ' ' + state + ' ' + descript;
	//obj.tile.image.src = '/mapImages/door.png'
	//function unlock (w/ key)
	//function open
	//obj.state != 'open' ? obj.canOccupy = true : obj.canOccupy = false; //syntax?
}

function portalize(){
	//portal can link to new arrays and positions (hole in floor, stairs, portal, entrance, exit, etc...)		
}

function clearify(obj){
	obj.canOccupy = true;
	obj.img.src = '/mapImages/blank.png';
	//obj.img = ; // user can choose/add floor tile image 
}

function specialize(obj){
	//button, switch, push, interact, etc.
}

/*
 * For use in displaying obj txt
 */
function a_or_an(word){		//limited use so far, with state of objs
	var c = word.charAt(0);
	if (isNaN(c)){	//if "not a number"
		switch(c) {
		case 'a': case 'A':
		case 'e': case 'E':
		case 'i': case 'I':
		case 'o': case 'O':
		case 'u': case 'U':
			return 'an';
		default :
			return 'a';
		}
	}
	else 
		return ''; //if it's a number

}//end  a_or_an 