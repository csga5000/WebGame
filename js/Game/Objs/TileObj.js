function gameObjFromTile(tile, x, y, opts) {
	var classname = Tile.TYPE_NAMES[tile.type]+'Obj';
	return Object.newInstanceFromClassname(classname, x, y, tile, opts);
}

function WallObj(x, y, tile, opts) {
	GameObj.call(this,x,y,tile,opts);
	this.canOccupy = false;
}
WallObj.prototype = Object.create(GameObj.prototype);