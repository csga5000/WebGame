function DynamicObj(x,y,tile,ops) {
	GameObj.call(this, x, y, tile, opts);

	this.vel = new Vector(0,0);
}
DynamicObj.prototype.update = function(delta) {
	//Calulate how much we should move
	var mv = this.vel.cpy().mul(delta);
	this.loc.add(mv);
	//TODO: Collision detection

	//Updates the HTML element
	GameObj.update(this);
}