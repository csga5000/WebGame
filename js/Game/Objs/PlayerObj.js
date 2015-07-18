function PlayerObj(x,y,tile,opts) {
	DynamicObj.call(this, x, y, tile, opts);
}
//Extend GameObj
PlayerObj.prototype = Object.create(DynamicObj.prototype);