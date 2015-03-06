function GameObj(x, y, c) {
	this.x = x;
	this.y = y;
	this.ch = c;

	this.img = false;//Not assigned yet...

	switch(c){
	case 'W':

		break;
	case 'P':
		
		break;
	}

	this.id = GameObj.next_id;
	GameObj.next_id++;

	this.element = 0;

	this.update = function() {
		$('#obj_' + this.id).css('left',x*GameObj.TILE_SIZE + 'px');
		$('#obj_' + this.id).css('top',y*GameObj.TILE_SIZE + 'px');
	}

	this.findElement = function() {
		if (!this.element) {
			this.element = $('#obj_' + this.id);
		}
		return this.element;
	};
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