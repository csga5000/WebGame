function DynamicObj(x,y,tile,opts) {
	GameObj.call(this, x, y, tile, opts);

	this.vel = new Vector(0,0);
	this.acc = new Vector(0,0);
}
//Extend GameObj
DynamicObj.prototype = Object.create(GameObj.prototype);

DynamicObj.prototype.update = function(delta) {
	//Calculate how much to accelerate
	var accel = this.acc.cpy().mul(delta,delta);
	this.vel.add(accel);

	//Calulate how much we should move
	var mv = this.vel.cpy().mul(delta, delta);
	this.loc.add(mv);
	//TODO: Collision detection

	//Updates the HTML element
	GameObj.prototype.update.call(this);
}