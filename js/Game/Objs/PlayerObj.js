function PlayerObj(x,y,tile,opts) {
	DynamicObj.call(this, x, y, tile, opts);

	this.max_speed = new Vector(7,7);
}
//Extend GameObj
PlayerObj.prototype = Object.create(DynamicObj.prototype);

PlayerObj.prototype.update = function(delta) {
	var ver = 0;
	var hor = 0;
	if (InputManager.keys[Keys.UP])
		ver = -10;
	if (InputManager.keys[Keys.DOWN])
		ver += 10;
	if (InputManager.keys[Keys.LEFT])
		hor = -10;
	if (InputManager.keys[Keys.RIGHT])
		hor += 10;

	this.acc.set(hor,ver);

	DynamicObj.prototype.update.call(this, delta);
}