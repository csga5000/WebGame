function GameObj(x, y, c) {
	this.x = x;
	this.y = y;
	
	switch(c){
	case 'W':

		break;
	case 'P':
		
		break;
	case 
	}
	//this.img = ;

	this.id = GameObj.next_id;
	GameObj.next_id++;

	this.update = function() {
		$('#obj_' + this.id).css('tex');
	}	
}

function elementForObj() {
	return '<div id="obj_' + this.id + '" class="obj"><img src="' + this.img + '" /></div>';
}

GameObj.next_id = 0;

var a = new GameObj();
var b = new GameObj();