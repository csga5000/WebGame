function Vector(x, y) {
	this.x = x;
	this.y = y;
}

Vector.prototype.cpy = function() {
	return new Vector(this.x, this.y);
}
Vector.prototype.add = function(x, y) {
	this.x += x;
	this.y += y;
}
Vector.prototype.sub = function(x, y) {
	this.x -= x;
	this.y -= y;
}
Vector.prototype.mul = function(x, y) {
	this.x *= x;
	this.y *= y;
}
Vector.prototype.div = function(x, y) {
	this.x /= x;
	this.y /= y;
}