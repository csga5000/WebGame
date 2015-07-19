function DynamicObj(x,y,tile,opts) {
	GameObj.call(this, x, y, tile, opts);

	this.max_speed = new Vector(10,10);

	this.vel = new Vector(0,0);
	this.acc = new Vector(0,0);
}
//Extend GameObj
DynamicObj.prototype = Object.create(GameObj.prototype);

DynamicObj.prototype.update = function(delta) {
	//Calculate how much to accelerate
	var accel = this.acc.cpy().mul(delta,delta);
	this.vel.add(accel);

	if (Math.abs(this.vel.x) > this.max_speed.x)
		this.vel.x = this.max_speed.x * (this.vel.x/Math.abs(this.vel.x));
	if (Math.abs(this.vel.y) > this.max_speed.y)
		this.vel.y = this.max_speed.y * (this.vel.y/Math.abs(this.vel.y));

	//Calulate how much we should move
	var mv = this.vel.cpy().mul(delta, delta);
	this.loc.add(mv);
	//TODO: Collision detection

	//Updates the HTML element
	GameObj.prototype.update.call(this, delta);
}