function GameObj(x, y, tile, opts) { //whats opts? //add portalDestination, description, state
	//Private Varables - exist in every object perminately
	this.loc = new Vector(x, y);
	this.size = new Vector(1, 1);
	this.map_id = 0; 	//Used for multiple maps

	//Public Variables
	this.id = GameObj.next_id;
	GameObj.next_id++;

	this.canOccupy = true;
	this.tile = tile;
	//tile.image = ''; 		//this was here, but I don't think we need it
	this.name = tile.name;
	this.image = tile.image;
	this.bg_image = tile.bg_image;
	this.type = tile.type;
	this.description = tile.description;
	this.state = '0';
	this.element = 0;		//What's this?

	//Setters (for acces to the class from outside of an instance of the class)
	//this.changeState = function(state) { this.state = state; }
	//this.changeCanOccupy = function(tf){ this.canOccupy = tf; }

	// this.findElement = function() {
	// 	if (!this.element) {
	// 		this.element = $('#obj_' + this.id);
	// 	}
	// 	return this.element;
	// };
}

GameObj.prototype.getType = function(){ return this.tile.type; }

//Other Public Functions_____________________________
GameObj.prototype.update = function(delta) {
	
}

GameObj.prototype.updateElement = function() {
	var obj = $('#obj_' + this.id);
	obj.css('left',this.loc.x*GameObj.TILE_SIZE + 'px');
	obj.css('top',this.loc.y*GameObj.TILE_SIZE + 'px');
	obj.css('width', GameObj.TILE_SIZE*this.size.x);
	obj.css('height', GameObj.TILE_SIZE*this.size.y);
}
/*function switchify(obj, ){
	//something that changes other GamesObj
}

function portalize(obj, portalDestination){
	//portal to somewhere
}*/


//Set class methods/variables (static)
GameObj.prototype.htmlForObj = function() {
	var div = $('<div class="game_obj"></div>');
	div.attr('id','obj_'+this.id);
	div.css('width',GameObj.TILE_SIZE*this.size.x);
	div.css('height',GameObj.TILE_SIZE*this.size.y);
	div.html(this.tile.getImageDiv());
	return div;
}

GameObj.next_id = 0;
GameObj.TILE_SIZE = 48;

// //get image
// GameOjb.getImage = function(obj){
// 	return obj.img;
// }


//////////////////////////////////////////////////////////////////////////////////////

/*
 * For use in displaying obj txt
 */
GameObj.a_or_an = function(word){		//limited use so far, with state of objs
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
