function Vector(x, y) {

	this.x = x,
	this.y = y;
}

Vector.prototype = {

	get : function() {

		return new Vector( this.x, this.y );
	},

	add : function(v) {

		this.x += v.x;
		this.y += v.y;
	},

	sub : function(v) {

		this.x -= v.x;
		this.y -= v.y;
	},

	mult : function(val) {

		this.x *= val;
		this.y *= val;
	},

	div : function(val) {

		this.x /= val;
		this.y /= val;
	},

	mag : function() {

		return Math.sqrt( (this.x*this.x) + (this.y*this.y) );
	},

	normalize : function() {

		var mag = this.mag();

		if( mag === 0 ) return;

		this.div( mag );
	},

	limit : function(max) {

		if( this.mag() > max ) {

			this.normalize();
			this.mult( max );
		}
	}
};


Vector.random2D = function() {

	var v = new Vector( Math.randMinMax(-1,1), Math.randMinMax(-1,1) );
	v.normalize();

	return v;
}

Vector.degreeToVector = function(degree) {

	var 	TO_RAD = Math.PI / 180,
		v = new Vector( Math.cos(degree*TO_RAD), Math.sin(degree*TO_RAD) );

	v.normalize();
	return v;
}