var 	programs = {},
		activeIndex = 0,
		activeProgram = null,
		myPlanes = [],
		//samples = 256,
		mouseEnabled = false,
		$graph = document.querySelector('#graph'),
		graphSize = 800,

		realWidth = 1040,
		realDepth = 1070,
		realHeight = 460,
		scale = 0.75,

		mouseRangeX = 180,
		mouseRangeY = 45,

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

		



	function init() {
		
		document.body.addEventListener('mousemove', handleMousemove);
		document.querySelector('#ctrl_mouse').addEventListener('click', function() {
			mouseEnabled = !mouseEnabled;
		});

		for(var i=0; i<programs.length; i++ ) {

			var li = document.createElement('li');
			li.setAttribute('id', programs[i].name);
			li.innerHTML = programs[i].name;

			document.querySelector('#ctrl_program').appendChild(li);
		}
		

		


		
		next();
		loop();
	}


	function next() {

		myPlanes = [];
		$graph.innerHTML = '';

		if( activeProgram !== null ) {
			$graph.classList.remove( activeProgram.name );
			document.querySelector('#' + activeProgram.name).classList.remove('active');
		}

		activeProgram = programs[activeIndex];
		activeProgram.init();
		$graph.classList.add( activeProgram.name );

		document.querySelector('#' + activeProgram.name).classList.add('active');

		activeIndex += 1;
		if( activeIndex > programs.length - 1 ) activeIndex = 0;

		window.setTimeout(next, 15000);
	}





	programs = [
		
		{
			name: 'echo',
			fill: 'rgba(255,255,255,0.25)',
			stroke: 'rgba(255,255,255,0)',

			init: function() {

				var k = 32;
				for( var i=0; i<k;i++ ) {

					var xPlane = new Plane('x', (i/k));
					xPlane.canvas.style.webkitAnimationDelay = (i*0.1) + 's';
					xPlane.position();
					myPlanes.push( xPlane );

					var zPlane = new Plane('z', (i/k));
					zPlane.canvas.style.webkitAnimationDelay = (i*0.1) + 's';
					zPlane.position();
					myPlanes.push( zPlane );
				}
			}
		},

		{

			name: 'scan',
			fill: 'rgba(255,255,255,1)',
			stroke: 'rgba(255,255,255,1)',

			init: function() {

				var k = 1;
				for(var i=0; i<k; i++) {
					var xPlane = new Plane('x', i/k);
					xPlane.position();
					myPlanes.push( xPlane );

					var yPlane = new Plane('y', i/k);
					yPlane.position();
					myPlanes.push( yPlane );

					var zPlane = new Plane('z', i/k);
					zPlane.position();
					myPlanes.push( zPlane );
				}
			},

			loop: function() {

				for(var i=0; i<myPlanes.length; i++) {

					myPlanes[i].index += 0.001;
					myPlanes[i].position();
					if( myPlanes[i].index > 1 ) myPlanes[i].index = 0;
				}
			}
		},

		{

			name: 'grid',
			fill: 'rgba(255,255,255,0)',
			stroke: 'rgba(255,255,255,1)',

			init: function() {

				var k = 8;
				for( var i=0; i<k;i++ ) {

					var xPlane = new Plane('x', (i/k));
					xPlane.position();
					xPlane.canvas.style.webkitAnimationDelay = (i*0.1) + 's';
					myPlanes.push( xPlane );

					var yPlane = new Plane('y', (i/k));
					yPlane.canvas.style.webkitAnimationDelay = (i*0.1) + 's';
					yPlane.position();
					myPlanes.push( yPlane );

					var zPlane = new Plane('z', (i/k));
					zPlane.canvas.style.webkitAnimationDelay = (i*0.1) + 's';
					zPlane.position();
					myPlanes.push( zPlane );
				}
			}
		},
		{

			name: 'vertigo',
			fill: 'rgba(255,255,255,1)',
			stroke: 'rgba(255,255,255,1)',

			init: function() {

				var k = 4;
				for(var i=0; i<k; i++) {

					var yPlane = new Plane('y', i/k);
					yPlane.position();
					myPlanes.push( yPlane );
				}
			},

			loop: function() {

				for(var i=0; i<myPlanes.length; i++) {

					myPlanes[i].index -= 0.001;
					myPlanes[i].position();
					if( myPlanes[i].index < 0 ) myPlanes[i].index = 1;
				}
			}
		},

		{
			name: 'stretch',
			fill: 'rgba(255,255,255,0.25)',
			stroke: 'rgba(255,255,255,0)',

			init: function() {

				var k = 32;
				for( var i=0; i<k;i++ ) {

					var yPlane = new Plane('y', (i/k));
					yPlane.isFixed = false;
					yPlane.transform.translateZ = 0;// ((i/k)-0.5) * -graphHeight*2;
					yPlane.position();
					myPlanes.push( yPlane );
				}
			},

			loop: function() {

				for(var i=0; i<myPlanes.length; i++) {

					myPlanes[i].transform.translateZ -= (myPlanes[i].index-0.5)*2;
					myPlanes[i].position();
				}
			}
		},

		{

			name: 'circleY',
			fill: 'rgba(255,255,255,0)',
			stroke: 'rgba(255,255,255,1)',

			init: function() {

				targetTransform = new Vector(-24, 137);

				var k = 32;
				for( var i=0; i<k;i++ ) {

					var xPlane = new Plane('y', (i/k));
					xPlane.canvas.style.webkitAnimationDelay = (i*0.1) + 's';
					xPlane.isFixed = false;
					xPlane.transform.rotateX = -180 - ((i/k) * 360);
					xPlane.position();
					myPlanes.push( xPlane );
				}
			},

			loop: function() {

				for(var i=0; i<myPlanes.length; i++) {
					//myPlanes[i].transform.rotateX += myPlanes[i].index;
					myPlanes[i].transform.rotateX += 0.5;
					myPlanes[i].position();
				}
			}
		}, 

		{

			name: 'circleZ',
			fill: 'rgba(255,255,255,0)',
			stroke: 'rgba(255,255,255,1)',

			init: function() {

				var k = 64;
				for( var i=0; i<k;i++ ) {

					var xPlane = new Plane('z', (i/k));
					xPlane.isFixed = false;
					
					xPlane.transform.rotateY = (i/k) * 90;
					xPlane.transform.scale = 1.1;
					xPlane.position();
					myPlanes.push( xPlane );
				}
			},

			loop: function() {

				for(var i=0; i<myPlanes.length; i++) {
					myPlanes[i].transform.rotateY += myPlanes[i].index;
					myPlanes[i].position();
				}
			}
		}
	];













	function handleMousemove(e) {

		if( !mouseEnabled ) return;

		var mouseX = e.clientX,
			mouseY = e.clientY,
			
			offsetX = (mouseX-(winWidth/2)) / (winWidth/2),
			offsetY = (mouseY-(winHeight/2)) / (winHeight/2),

			rotationX = parseFloat((offsetY*mouseRangeY).toFixed(2)),
			rotationY = -(offsetX*mouseRangeX).toFixed(2);

		targetTransform.x = rotationX;
		targetTransform.y = rotationY;
	}

	


	function updateCardTransform() {

		if( !mouseEnabled ) {
			targetTransform.x = -24;
			targetTransform.y += 0.1;
		}

		var cssTransform,
			appliedTransform = targetTransform.get();




		appliedTransform.sub(currentTransform);
		appliedTransform.mult(0.1);
		currentTransform.add(appliedTransform);

		var yIndex = (currentTransform.x) / mouseRangeY;

		var transform = {
			perspective: '700px',
			translateY: yIndex * graphHeight/2 + 'px' ,
			rotateX: (90 + parseFloat(currentTransform.x.toFixed(2)) ) + 'deg',
			rotateZ: currentTransform.y.toFixed(2) + 'deg'
		};

		var cssTransform = '';
		for( var key in transform ) {
			cssTransform += key + '(' + transform[key] + ') ';
		}
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

		//console.log( $graph.style.transform );
	}

	function loop() {

		if( typeof activeProgram.loop === 'function' ) {
			activeProgram.loop();
		}

		updateCardTransform();

		/*var now = new Date();

		stats.begin();		

		ctx.clearRect(0, 0, canvas.width, canvas.height );

		for( var i=0; i<myNodes.length; i++ ) {

			
			myNodes[i].update();
			myNodes[i].draw( ctx );
		}

		stats.end();
*/
		window.requestAnimationFrame( loop );

	}


init();