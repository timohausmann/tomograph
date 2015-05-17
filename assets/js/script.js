var 	myPlanes = [],

		graphSize = 300,

		//room boundaries inside data 
		dataRange = {
			x: [-25,110],
			y: [-55,55],
			z: [-50,110]
		};
		dataStartX = -25,
		dataStartZ = -50,

		dataWidth = 110,
		dataHeight = 50,
		dataDepth = 110;


	init = function() {

		for( var i=0; i<64;i++ ) {

			var y = dataRange.y[0] + ((i/64) * dataRange.y[1]);

			myPlanes.push( new Plane(y) );
			myPlanes[i].scan();
			myPlanes[i].draw();
		}


	}

	function loop() {

		/*var now = new Date();

		stats.begin();		

		ctx.clearRect(0, 0, canvas.width, canvas.height );

		for( var i=0; i<myNodes.length; i++ ) {

			
			myNodes[i].update();
			myNodes[i].draw( ctx );
		}

		stats.end();

		window.requestAnimationFrame( loop );*/

	}


init();