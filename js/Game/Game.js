function Game()
{
	this.objs = [];
}

Game.prototype.start = function() {
		this.update();
		setInterval(updateGame,15);//Called every 15 miliseconds, so 66 times a second
	}

Game.prototype.update = function(detla) {
	this.objs.forEach(function(obj){
		obj.update(delta);
	});
}

Game.prototype.addObj = function(obj) {
	this.objs.push(obj);
	obj.game = this;
}

function updateGame()
{
	//TODO: calculate delta
	game.update(0.01);
}