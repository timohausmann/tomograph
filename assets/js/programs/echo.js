var programs = (function(programs) {
	
	programs.echo = {

		init: function() {

			var k = 32;
			for( var i=0; i<k;i++ ) {

				var xPlane = new Plane('x', (i/k)*samples);
				xPlane.canvas.style.webkitAnimationDelay = (i*0.1) + 's';
				xPlane.position();
				myPlanes.push( xPlane );

				var zPlane = new Plane('z', (i/k)*samples);
				zPlane.canvas.style.webkitAnimationDelay = (i*0.1) + 's';
				zPlane.position();
				myPlanes.push( zPlane );
			}
		},

		loop: function() {

		}
	};

	return programs;

})(programs || {});