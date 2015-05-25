var 	myPlanes = [],
		samples = 256,

		$graph = document.querySelector('#graph'),
		graphSize = 800,

		realWidth = 1040,
		realDepth = 1070,
		realHeight = 460,
		scale = 0.7,

		graphWidth = realWidth * scale,
		graphDepth = realDepth * scale,
		graphHeight = realHeight * scale,

		//room boundaries inside data 
		dataRange = {
			x: [-30,115],
			y: [-48,50],
			z: [-60,120]
		},

		winWidth = window.innerWidth,
		winHeight = window.innerHeight,

		currentTransform = new Vector(-24, 120);
		targetTransform = new Vector(-24, 137);

		//$graph.style.width = graphWidth;
		//$graph.style.height = graphDepth;
		//$graph.style.marginLeft = -(graphWidth/2);
		//$graph.style.marginTop = -(graphDepth/2);
;

		


	init = function() {

		
		document.body.addEventListener('mousemove', handleMousemove);
		/*document.body.addEventListener('mouseout', function() {
			targetTransform = new Vector(-24, 137);
		});*/

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

			/*var yPlane = new Plane('y', (i/k)*samples);
			yPlane.canvas.style.webkitAnimationDelay = (i*0.1) + 's';
			yPlane.position();
			myPlanes.push( yPlane );*/
		}

		/*var k = 32;
		for( var i=0; i<k;i++ ) {

			var x = dataRange.x[0] + ((i/k) * dataRange.x[1]);
			var y = dataRange.y[0] + ((i/k) * dataRange.y[1]);
			var z = dataRange.z[0] + ((i/k) * dataRange.z[1]);

			myPlanes.push( new Plane(null,y,null) );
			myPlanes[i].scan();
			myPlanes[i].draw();

			//myPlanes[i].canvas.style.transform = "translateZ(" + ((i-(k/2))*4) + "px)";
			myPlanes[i].canvas.style.transform = "translateZ(" + ((i-(k/2))/k)*graphHeight + "px)";
			//myPlanes[i].canvas.style.transform = "translateZ(0) rotateX(" + (i/k)*360 + "deg)";


			(function() {
				var currPlane = myPlanes[i];
				window.setTimeout(function() {
					currPlane.canvas.style.opacity = 1;
				}, i*100);
			})();
		}*/

		updateCardTransform();
	}

	function handleMousemove(e) {

		var mouseX = e.clientX,
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

		var cssTransform,
			appliedTransform = targetTransform.get();

		appliedTransform.sub(currentTransform);
		appliedTransform.mult(0.1);
		currentTransform.add(appliedTransform);

		cssTransform = 'perspective(700px) scale(1) rotateX(' + (90 + parseFloat(currentTransform.x.toFixed(2)) ) + 'deg) rotateZ(' + currentTransform.y.toFixed(2) + 'deg) rotateY(0deg)';
		$graph.style.transform = cssTransform;

/*
		i += 0.5;
		if( i > samples ) i = 0;

		xPlane.position(i);
		yPlane.position(i);
		zPlane.position(i);*/

/*
		var x = dataRange.x[0] + ((i/k) * dataRange.x[1]);
		var y = dataRange.y[0] + ((i/k) * dataRange.y[1]);
		var z = dataRange.z[0] + ((i/k) * dataRange.z[1]);
		
		xPlane.x = x;
		yPlane.y = y;
		zPlane.z = z;
		
		xPlane.scan();xPlane.draw();
		yPlane.scan();yPlane.draw();
		//zPlane.scan();zPlane.draw();

		xPlane.canvas.style.transform = "rotateX(90deg) translateY("+ graphHeight / 1.5 +"px) translateZ(" + ((i-(k/2))/k)*-graphWidth + "px)";
		yPlane.canvas.style.transform = "translateZ(" + ((i-(k/2))/k)*graphHeight + "px)";
		zPlane.canvas.style.transform = "rotateY(90deg) translateX("+ graphHeight / 1.5 +"px) translateZ(" + ((i-(k/2))/k)*graphDepth + "px)";

		i += 0.5;
		if( i > k ) i = 0;
*/

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