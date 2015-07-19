function DynamicObj(x,y,tile,opts) {
	this.tangible = true;//If set to false, can move through solid objects (objects with canOccupy false)

	GameObj.call(this, x, y, tile, opts);

	this.max_speed = new Vector(10,10);

	this.vel = new Vector(0,0);
	this.acc = new Vector(0,0);

	this.airFriction = new Vector(5,5);
}
//Extend GameObj
DynamicObj.prototype = Object.create(GameObj.prototype);
DynamicObj.COL_SKIP = 0.1;
DynamicObj.BACK_DIST = 0.01;

DynamicObj.prototype.update = function(delta) {
	//Calculate how much to accelerate
	var accel = this.acc.cpy().mul(delta,delta);
	this.vel.add(accel);

	var objthis = this;

	//Apply frictions
	[this.airFriction].forEach(function(fric){
		fric = fric.cpy().mul(delta,delta);

		['x','y'].forEach(function(axis){
			if (objthis.vel[axis] !== 0) {
				dir = Math.abs(objthis.vel[axis])/objthis.vel[axis];
				if (dir === 1)
					objthis.vel[axis] = Math.max(0, objthis.vel[axis] - fric[axis]);
				else
					objthis.vel[axis] = Math.min(0, objthis.vel[axis] + fric[axis]);
			}
		});
	});

	if (Math.abs(this.vel.x) > this.max_speed.x)
		this.vel.x = this.max_speed.x * (this.vel.x/Math.abs(this.vel.x));
	if (Math.abs(this.vel.y) > this.max_speed.y)
		this.vel.y = this.max_speed.y * (this.vel.y/Math.abs(this.vel.y));

	//Calulate how much we should move
	var mv = this.vel.cpy().mul(delta, delta);

	var objthis = this;

	this.move(mv.x, mv.y, function(){
		//Collision x
		objthis.vel.x = 0;
	},
	function(){
		//Collision y
		objthis.vel.y = 0;
	});
	//this.loc.add(mv);
	//TODO: Collision detection

	//Updates the HTML element
	GameObj.prototype.update.call(this, delta);
}

/**
	If object 2 is solid, and object1 is overlapping object 2, it moves object 1 in reverse direction of the may it "moved" as specified
*/
DynamicObj.prototype.move = function(mhor, mver, colx, coly){
	var vdir = mver === 0 ? 0 : Math.abs(mver)/mver;//-1, 0, or 1 for direction
	var hdir = mhor === 0 ? 0 : Math.abs(mhor)/mhor;//-1, 0, or 1 for direction

	mhor = Math.abs(mhor);
	mver = Math.abs(mver);

	//Incrementally move and detect collisions
	while (mhor > 0 || mver > 0) {
		//Move Horizonatally!

		if (mhor > 0) {
			//Move COL_SKIP, or whatever we have left to move
			var move = move = mhor > DynamicObj.COL_SKIP ? DynamicObj.COL_SKIP : mhor;
			mhor -= move;

			move *= hdir;

			this.loc.add(move, 0)

			cols = this.collisions();

			if (cols.length > 0) {
				if (typeof(colx) !== 'undefined')
					colx(cols);

				mhor = 0;

				var min = this.loc.x;
				if (hdir === 1)
					min += this.size.x;

				cols.forEach(function(col) {
					if (hdir === -1) {
						min = Math.max(min, col.loc.x + col.size.x)
					} else {
						min = Math.min(min, col.loc.x);
					}
				});

				min += DynamicObj.BACK_DIST * (0-hdir);

				this.loc.set(hdir === 1 ? min - this.size.x : min, this.loc.y);
			}
		}

		//MOVE VERTICALLY

		if (mver > 0) {
			//Move COL_SKIP, or whatever we have left to move
			move = move = mver > DynamicObj.COL_SKIP ? DynamicObj.COL_SKIP : mver;
			mver -= move;

			move *= vdir;

			this.loc.add(0, move)

			cols = this.collisions();

			if (cols.length > 0) {
				if (typeof(coly) !== 'undefined')
					coly(cols);
				mver = 0;

				var min = this.loc.y;
				if (vdir === 1)
					min += this.size.y;

				cols.forEach(function(col) {
					if (vdir === -1) {
						min = Math.max(min, col.loc.y + col.size.y)
					} else {
						min = Math.min(min, col.loc.y);
					}
				});

				min += DynamicObj.BACK_DIST * (0-vdir);

				this.loc.set(this.loc.x, vdir === 1 ? min - this.size.y : min);
			}
		}
	}
}

/**
 * Checks if there is a collision with the specified object.  Does not check if the objects are solid/etc.
 *
 * @param object to check for collision with
 * @return boolean True or false if there is a collision
 */
DynamicObj.prototype.collision = function(obj) {
	return !(
		//No hor collision
		(this.loc.x > (obj.loc.x + obj.size.x) || (this.loc.x + this.size.x) < obj.loc.x)
		|| //No ver collision
		(this.loc.y > (obj.loc.y + obj.size.y) || (this.loc.y + this.size.y) < obj.loc.y)
	);
}

/**
 * Returns an array of all objects overlapping this
 *
 * @param tansense bool representing if function should account for tangibility and occupyability of objects
 */
DynamicObj.prototype.collisions = function(tansense) {
	if (!this.tangible && tansense)
		return [];

	var cols = [];

	var objthis = this;

	this.game.objs.forEach(function(obj){
		if ((!obj.canOccupy || !tansense) && obj !== objthis) {
			if (objthis.collision(obj))
				cols.push(obj);
		}
	});

	return cols;
}