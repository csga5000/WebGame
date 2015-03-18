function GameObj(x, y, c) {
	this.x = x;
	this.y = y;
	this.ch = c;

	this.img = false;//Not assigned yet...

	switch(c){
	case '.':
	case ' ':
		clearify(this);
		break;
	case 'D':
	case 'd':
		doorify(this);
		break;
	case 'P':
	case 'p':
		portaize(this);
	case 'S':
	case 's':
		specialize(this);
		break;	
	case 'W':
	case 'w':
	default : //default is block that can't be occupied. choice of default images or user chooses sorce.
		this.canOccupy = false;
	}

	this.id = GameObj.next_id;
	GameObj.next_id++;

	this.element = 0;

	this.update = function() {
		$('#obj_' + this.id).css('left',x*GameObj.TILE_SIZE + 'px');
		$('#obj_' + this.id).css('top',y*GameObj.TILE_SIZE + 'px');
	}

	// this.findElement = function() {
	// 	if (!this.element) {
	// 		this.element = $('#obj_' + this.id);
	// 	}
	// 	return this.element;
	// };
}

//Set class methods/variables (static)
GameObj.htmlForObj = function(obj) {
	var content = '<span>' + obj.ch + '</span>';
	if (obj.img) {
		content = '<img src="' + obj.img + '" />';
	}
	return '<div id="obj_' + obj.id + '" class="obj">' + content + '</div>';
	
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
	obj.img.src = '/mapImages/door.png'
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