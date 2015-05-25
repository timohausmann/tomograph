function Plane(x, y, z) {

	var canvas = document.createElement('canvas');
	canvas.width = graphWidth;
	canvas.height = graphDepth;

	this.x = x;
	this.y = y;
	this.z = z;

	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
	this.objects = [];

	$graph.appendChild(canvas);

}

Plane.prototype = {

	scan: function() {

		this.objects = [];
	
		for( var i=0; i<data.shapes.length; i++ ) {

			var curr = data.shapes[i];

			//detection strategy
			if( ( (this.x !== null) &&
					(curr.x - (curr.w/2) < this.x && curr.x + (curr.w/2) > this.x)
				) || (
					(this.y !== null) &&
					(curr.y - (curr.h/2) < this.y && curr.y + (curr.h/2) > this.y)
				) || (
					(this.z !== null) &&
					(curr.z - (curr.d/2) < this.z && curr.z + (curr.d/2) > this.z)
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
			
			this.ctx.fillStyle = "rgba(255,255,255,0)";
			this.ctx.strokeStyle = "rgba(255,255,255,1)";

			//this.ctx.fillStyle = "rgba(255,255,255,0.1)";
			//this.ctx.strokeStyle = "rgba(255,255,255,0)";

			if( this.x !== null ) {
				this.ctx.fillRect(z, y, d, h);
				this.ctx.strokeRect(z, y, d, h);
			}
			if( this.y !== null ) {
				this.ctx.fillRect(x, z, w, d);
				this.ctx.strokeRect(x, z, w, d);
			}
			if( this.z !== null ) {
				this.ctx.fillRect(x, y, w, h);
				this.ctx.strokeRect(x, y, w, h);
			} 
		}
	
	}
};