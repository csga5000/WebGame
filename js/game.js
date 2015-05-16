function Game()
{
	this.objs = [];

	this.start = function() {
		update();
		setInterval(update,15);//Called every 15 miliseconds, so 66 times a second
	}

	this.update = function() {
		objs.forEach(function(obj){
			obj.update();
		});
	}

	this.addObj = function(obj) {
		objs.push(obj);
	}

}