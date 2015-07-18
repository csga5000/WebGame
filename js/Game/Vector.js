function Vector(x, y) {
	this.x = Number(x);
	this.y = Number(y);
}

Vector.prototype.cpy = function() {
	return new Vector(this.x, this.y);
}
Vector.prototype.set = function(x, y) {
	if (x instanceof Vector) {
		y = x.y;
		x = x.x;
	}
	this.x = x;
	this.y = y;
	return this;
}
Vector.prototype.add = function(x, y) {
	if (x instanceof Vector) {
		y = x.y;
		x = x.x;
	}
	this.x += x;
	this.y += y;
	return this;
}
Vector.prototype.sub = function(x, y) {
	if (x instanceof Vector) {
		y = x.y;
		x = x.x;
	}
	this.x -= x;
	this.y -= y;
	return this;
}
Vector.prototype.mul = function(x, y) {
	if (x instanceof Vector) {
		y = x.y;
		x = x.x;
	}
	this.x *= x;
	this.y *= y;
	return this;
}
Vector.prototype.div = function(x, y) {
	if (x instanceof Vector) {
		y = x.y;
		x = x.x;
	}
	this.x /= x;
	this.y /= y;
	return this;
}