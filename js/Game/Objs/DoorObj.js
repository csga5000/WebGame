function DoorObj(x, y, tile, opts) {
	GameObj.call(this, x, y, tile, opts);

	this.isOpen = false;

	this.isLocked = true;
}
//Extend GameObj
DoorObj.prototype = Object.create(GameObj.prototype);

DoorObj.prototype.toggleOpen = function(action) {
	if (this.isLocked)
		return;

	this.canOccupy = this.isOpen = !this.isOpen;
}
DoorObj.prototype.unlock = function() {
	//something about a correct key
	this.isLocked = false;
}