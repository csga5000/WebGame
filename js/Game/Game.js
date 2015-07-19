function Game()
{
	this.objs = [];

	this.interval = -1;
}

Game.prototype.start = function() {
	InputManager.start();

	this.update(0.0001);
	var gameobj = this;
	this.interval = setInterval(function(){
		gameobj.update(15/1000);
	},15);//Called every 15 miliseconds, so 66 times a second
}

Game.prototype.stop = function() {
	InputManager.stop();
	clearInterval(this.interval);
}

Game.prototype.update = function(delta) {
	this.objs.forEach(function(obj){
		obj.update(delta);
	});
}

Game.prototype.addObj = function(obj) {
	this.objs.push(obj);
	obj.game = this;
}