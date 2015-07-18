function gameFromTileObj(tile, x, y, obj) {
	var classname = tile.type+'Obj';
	return Object.newInstanceFromClassname(classname, x, y, tile, obj);
}

function WallObj() {
	this.canOccupy = false;
}
WallObj.prototype = Object.create(GameObj.prototype);