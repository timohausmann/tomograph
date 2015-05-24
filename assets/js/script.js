var 	myPlanes = [],

		$graph = document.querySelector('#graph'),
		graphSize = 600,

		//room boundaries inside data 
		dataRange = {
			x: [-30,115],
			y: [-48,50],
			z: [60,-120]
		},

		winWidth = window.innerWidth,
		winHeight = window.innerHeight,

		currentTransform = new Vector(-24, 120);
		targetTransform = new Vector(-24, 137);
;

		


	init = function() {

		
		document.body.addEventListener('mousemove', handleMousemove);

		var k = 64;
		for( var i=0; i<k;i++ ) {

			var x = dataRange.x[0] + ((i/k) * dataRange.x[1]);
			var y = dataRange.y[0] + ((i/k) * dataRange.y[1]);
			var z = dataRange.z[0] + ((i/k) * dataRange.z[1]);

			myPlanes.push( new Plane(x,y,null) );
			myPlanes[i].scan();
			myPlanes[i].draw();

			myPlanes[i].canvas.style.transform = "translateZ(" + ((i-(k/2))*4) + "px)";
			myPlanes[i].canvas.style.opacity = 1;

			(function() {
				var currPlane = myPlanes[i];
				window.setTimeout(function() {
					currPlane.canvas.style.opacity = 1;
				}, i*100);
			})();
		}

		updateCardTransform();
	}

	function handleMousemove(e) {

		var 	mouseX = e.clientX,
			mouseY = e.clientY,
			
			offsetX = (mouseX-(winWidth/2)) / (winWidth/2),
			offsetY = (mouseY-(winHeight/2)) / (winHeight/2),

			rangeX = 180,
			rangeY = 45,

			rotationX = parseFloat((offsetY*rangeY).toFixed(2)),
			rotationY = -(offsetX*rangeX).toFixed(2);

		targetTransform.x = rotationX;
		targetTransform.y = rotationY;
	}


	function updateCardTransform() {

		var 	cssTransform,
			appliedTransform = targetTransform.get();

		appliedTransform.sub(currentTransform);
		appliedTransform.mult(0.1);
		currentTransform.add(appliedTransform);

		//cssTransform = 'perspective(700px) scale(1) rotateX(' + (90 + parseFloat(currentTransform.x.toFixed(2))) + 'deg) rotateZ(' + currentTransform.y.toFixed(2) + 'deg)';
		cssTransform = 'perspective(700px) scale(1) rotateX(' + (-90 + parseFloat(currentTransform.x.toFixed(2)) ) + 'deg) rotateZ(' + currentTransform.y.toFixed(2) + 'deg) rotateY(0deg)';

		$graph.style.transform = cssTransform;

		window.requestAnimationFrame(updateCardTransform);

		//console.log( $graph.style.transform );
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