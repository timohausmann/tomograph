function Plane(y) {

	var canvas = document.createElement('canvas');
	canvas.width = graphSize;
	canvas.height = graphSize;

	this.y = y;
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
	this.objects = [];

	document.querySelector('#graph').appendChild(canvas);

}

Plane.prototype = {

	scan: function() {

		this.objects = [];
	
		for( var i=0; i<data.shapes.length; i++ ) {

			var curr = data.shapes[i];

			if( curr.y - (curr.h/2) < this.y && curr.y + (curr.h/2) > this.y ) {

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

			x = map(x, dataRange.x[1]);
			y = map(y, dataRange.y[1]);
			z = map(z, dataRange.z[1]);

			var w = map(curr.w, dataRange.x[1]);
			var h = map(curr.h, dataRange.y[1]);
			var d = map(curr.d, dataRange.z[1]);

			x -= (w/2);
			y -= (h/2);
			z -= (d/2);


			

			

			this.ctx.strokeStyle = "black";
			
			this.ctx.strokeRect(x, z, w, d);
		}


		function map(local, bound) {

			return (local/bound) * graphSize;
		}
	
	}
};