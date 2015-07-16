function GameObj(x, y, tile, opts) { //whats opts? //add portalDestination, description, state 
	
	//Private Varables - exist in every object perminately
	static var X = x;
	static var Y = y;
	static var Map_ID = 0; 	//Used for multiple maps

	//Public Variables
	this.id = GameObj.next_id;
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
	
	//Getters - makes access to private values difficult and easier to maintain
	this.getX = function(){ return X; }
	this.getY = function(){ return Y; }
	this.getMap_ID = function(){ return Map_ID; }
	
	//Setters (for acces to the class from outside of an instance of the class)
	this.changeState = function(state) { this.state = state; }
	this.changeCanOccupy = function(tf){ this.canOccupy = tf; }

	//Other Public Functions_____________________________
	this.update = function() {
		this.updateElement();
	}
	
	this.updateElement = function() { 
		var obj = $('#obj_' + this.id);
		obj.css('left',x*GameObj.TILE_SIZE + 'px');
		obj.css('top',y*GameObj.TILE_SIZE + 'px');
	}
	
	constructor2();

	// this.findElement = function() {
	// 	if (!this.element) {
	// 		this.element = $('#obj_' + this.id);
	// 	}
	// 	return this.element;
	// };
}

GameObj.constructor2 = function(){
	
	GameObj.next_id++; 
	
	switch(this.type) {
		case TYPE_DOOR:
			doorify(this);
			break;
		case TYPE_PORTAL;
			portalize(this);
			break;
		case TYPE_WALL:
			wallify(this);
			break;
		case TYPE_SWITCH:
			switchify(this);
			break;
	}//end constructor2

}//end GameObj constructor

//These Functions Can be inherited because of 'prototype', but I don't know if we'll ever need to do that...
GameObj.prototype.addDescription = funtion(description){
	this.description = description;	
}

GameObj.prototype.wallify = function(){
	this.type = TYPE_WALL;	
	canOccupy = false;
}//end wallify

GameObj.prototype.doorify = function(){
	this.type = TYPE_DOOR;
	this.state = 'c'; //closed by default
	this.open = funtion(action){
		switch (action){
		case 'o':
			//change image to opened door
			this.state = 'o';
			canOccupy = true;
		case 'c':
			//cange image to closed door
			this.state = 'c';
			canOccupy = false;
	}//end switch
	this.unlock = function(){
		//something about a correct key
	}
}//end doorify

GameObj.switchify = function(){
	//something that changes other GameObjs 
}

GameObj.prototype.portalize = function(portalDestination){
	//portal to somewhere
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