function PlayerObj(x,y,tile,opts) {
	DynamicObj.call(this, x, y, tile, opts);

	this.max_speed = new Vector(7,7);
	this.airFriction = new Vector(PlayerObj.MACCEL/2,PlayerObj.MACCEL/2);
}
//Extend GameObj
PlayerObj.prototype = Object.create(DynamicObj.prototype);

PlayerObj.prototype.update = function(delta) {
	var ver = 0;
	var hor = 0;
	if (InputManager.keys[Keys.UP])
		ver = -PlayerObj.MACCEL;
	if (InputManager.keys[Keys.DOWN])
		ver += PlayerObj.MACCEL;
	if (InputManager.keys[Keys.LEFT])
		hor = -PlayerObj.MACCEL;
	if (InputManager.keys[Keys.RIGHT])
		hor += PlayerObj.MACCEL;

	this.acc.set(hor,ver);

	DynamicObj.prototype.update.call(this, delta);
}

PlayerObj.MACCEL = 90;