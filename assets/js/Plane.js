function Plane(axis, index) {

	var canvas = document.createElement('canvas');

	this.axis = axis;
	this.index = index;
	this.isFixed = true;
	this.location = null;

	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
	this.objects = [];
	this.transform = {};

	if( axis === 'x') {
		canvas.width = graphDepth;
		canvas.height = graphHeight;
		this.transform.rotateX = '-90deg';
		this.transform.rotateY = '-90deg';
		//canvas.style.borderColor = "blue";

	} else if( axis === 'y' ) {
		canvas.width = graphWidth;
		canvas.height = graphDepth;
		//canvas.style.borderColor = "green";

	} else if( axis === 'z') {
		canvas.width = graphWidth;
		canvas.height = graphHeight;
		this.transform.rotateX = '-90deg';
		//canvas.style.borderColor = "red";
	}

	canvas.style.marginLeft = -(canvas.width/2);
	canvas.style.marginTop = -(canvas.height/2);

	$graph.appendChild(canvas);

}

Plane.prototype = {

	position: function(index) {

		this.index = index || this.index;

		var centerOffset = this.index - 0.5;

		this.location = dataRange[this.axis][0] + (this.index * dataRange[this.axis][1]);

		if( this.isFixed ) {

			if( this.axis === 'x') {
				this.transform.translateZ = ( centerOffset * -graphWidth ) + 'px';

			} else if( this.axis === 'y' ) {
				this.transform.translateZ = ( centerOffset * -graphHeight ) + 'px';

			} else if( this.axis === 'z') {
				this.transform.translateZ = ( centerOffset * graphDepth ) + 'px';
			}
		}

		var transform = '';
		for( var key in this.transform ) {
			transform += key + '(' + this.transform[key] + ') ';
		}
		this.canvas.style.transform = transform;

		this.scan();
		this.draw();
	},

	scan: function() {

		this.objects = [];
	
		for( var i=0; i<data.shapes.length; i++ ) {

			var curr = data.shapes[i];

			//detection strategy
			if( ( (this.axis === 'x') &&
					(curr.x - (curr.w/2) < this.location && curr.x + (curr.w/2) > this.location)
				) || (
					(this.axis === 'y') &&
					(curr.y - (curr.h/2) < this.location && curr.y + (curr.h/2) > this.location)
				) || (
					(this.axis === 'z') &&
					(curr.z - (curr.d/2) < this.location && curr.z + (curr.d/2) > this.location)
				) ) {

				this.objects.push({
					x: curr.x,
					y: curr.y,
					z: curr.z,
					w: curr.w,
					h: curr.h,
					d: curr.d
				});
			}
		}
	},
	draw: function() {

		this.ctx.clearRect(0,0,graphWidth, graphDepth);

		for( var i=0; i<this.objects.length; i++ ) {

			var curr = this.objects[i];

			var x = curr.x - dataRange.x[0];
			var y = curr.y - dataRange.y[0];
			var z = curr.z - dataRange.z[0];

			x = (x / dataRange.x[1]) * graphWidth;
			y = (y / dataRange.y[1]) * graphHeight;
			z = (z / dataRange.z[1]) * graphDepth;

			var w = (curr.w / dataRange.x[1]) * graphWidth;
			var h = (curr.h / dataRange.y[1]) * graphHeight;
			var d = (curr.d / dataRange.z[1]) * graphDepth;

			x -= (w/2);
			y -= (h/2);
			z -= (d/2);
			

			//this.ctx.fillStyle = "white";
			//this.ctx.strokeStyle = "black";
			
			//this.ctx.fillStyle = "rgba(255,255,255,0)";
			//this.ctx.strokeStyle = "rgba(255,255,255,1)";

			this.ctx.fillStyle = activeProgram.fill;
			this.ctx.strokeStyle = activeProgram.stroke;

			//this.ctx.fillStyle = "rgba(255,255,255,0.25)";
			//this.ctx.strokeStyle = "rgba(0,204,255,0)";

			if( this.axis === 'x' ) {
				this.ctx.fillRect(z, y, d, h);
				this.ctx.strokeRect(z, y, d, h);
			}
			if( this.axis === 'y' ) {
				this.ctx.fillRect(x, z, w, d);
				this.ctx.strokeRect(x, z, w, d);
			}
			if( this.axis === 'z' ) {
				this.ctx.fillRect(x, y, w, h);
				this.ctx.strokeRect(x, y, w, h);
			} 
		}
	
	}
};