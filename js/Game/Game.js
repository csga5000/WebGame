function Game()
{
	this.objs = [];
}

Game.prototype.start = function() {
	this.update(0.0001);
	var gameobj = this;
	setInterval(function(){
		gameobj.update(15/1000);
	},15);//Called every 15 miliseconds, so 66 times a second
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