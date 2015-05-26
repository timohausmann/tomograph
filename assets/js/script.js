var 	programs = {},
		activeIndex = 0,
		activeProgram = null,
		myPlanes = [],
		//samples = 256,
		mouseEnabled = false,
		$graph = document.querySelector('#graph'),
		$ctrl = document.querySelector('#ctrl'),
		graphSize = 800,

		realWidth = 1040,
		realDepth = 1070,
		realHeight = 460,
		scale = 0.6,

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

		isAutorun = true,
		timeout = 15000,
		nextTimeout = null,

		winWidth = window.innerWidth,
		winHeight = window.innerHeight,

		currentTransform = new Vector(-24, 120),
		targetTransform = new Vector(-24, 137);

		//$graph.style.width = graphWidth;
		//$graph.style.height = graphDepth;
		//$graph.style.marginLeft = -(graphWidth/2);
		//$graph.style.marginTop = -(graphDepth/2);
;

		

	function init() {
		
		document.body.addEventListener('mousemove', handleMousemove);

		/*document.body.addEventListener("mousewheel", MouseWheelHandler, false);
		document.body.addEventListener("DOMMouseScroll", MouseWheelHandler, false);

		function MouseWheelHandler(e) {
			var delta = e.detail ? e.detail : -e.wheelDelta/120;
			zoom += delta/10;
		}*/
		//window.onscroll = ;
		document.querySelector('#ctrl_mouse').addEventListener('click', function() {
			mouseEnabled = !mouseEnabled;
			if( mouseEnabled ) {
				this.classList.add('active');
			} else {
				this.classList.remove('active');
			}
		});
		document.querySelector('#ctrl_autorun').addEventListener('click', function() {
			isAutorun = !isAutorun;
			if( isAutorun ) {
				next();
				document.querySelector('#ctrl_program').classList.add('autorun');
				this.classList.add('active');
			} else {
				window.clearTimeout(nextTimeout);
				document.querySelector('#ctrl_program').classList.remove('autorun');
				this.classList.remove('active');
			}
		});

		for(var i=0; i<programs.length; i++ ) {

			var li = document.createElement('li');
			li.setAttribute('id', programs[i].name);
			li.dataset.index = i;
			li.innerHTML = programs[i].name;

			li.addEventListener('click', handleProgramCLick);

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

		if( isAutorun ) nextTimeout = window.setTimeout(next, timeout);
	}



	var rotateYAccel = 1;

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
					xPlane.canvas.style.animationDelay = (i*0.1) + 's';
					xPlane.position();
					myPlanes.push( xPlane );

					var zPlane = new Plane('z', (i/k));
					zPlane.canvas.style.webkitAnimationDelay = (i*0.1) + 's';
					zPlane.canvas.style.animationDelay = (i*0.1) + 's';
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

			name: 'circle-y',
			fill: 'rgba(255,255,255,0)',
			stroke: 'rgba(255,255,255,1)',

			init: function() {

				rotateYAccel = 2.25;

				var k = 48;
				for( var i=0; i<k;i++ ) {

					var xPlane = new Plane('z', (i/k));
					xPlane.isFixed = false;
					
					xPlane.transform.rotateY = (i/k) * 90;
					xPlane.transform.scale = 1.1;
					xPlane.canvas.style.webkitAnimationDelay = (i*0.025) + 's';
					xPlane.canvas.style.animationDelay = (i*0.025) + 's';
					xPlane.position();
					myPlanes.push( xPlane );
				}
			},

			loop: function() {

				if( rotateYAccel > 0.25 ) {
					rotateYAccel *= 0.97;
				}

				for(var i=0; i<myPlanes.length; i++) {
					myPlanes[i].transform.rotateY += myPlanes[i].index * rotateYAccel;
					myPlanes[i].position();
				}
			}
		},

		{
			name: 'wave',
			fill: 'rgba(255,255,255,0.25)',
			stroke: 'rgba(255,255,255,0)',
			duration: 4000,

			init: function() {

				var k = 42;
				for( var i=0; i<k;i++ ) {

					var xPlane = new Plane('x', (i/k));
					xPlane.transform.rotateZ = ((i/k)-0.5) * 30;
					xPlane.position();
					myPlanes.push( xPlane );
				}
			},

			loop: function() {

				for(var i=0; i<myPlanes.length; i++) {

					myPlanes[i].transform.rotateZ -= (myPlanes[i].index-0.5) * 0.1;
					myPlanes[i].position();
				}
			}
		},



		{

			name: 'circle-x',
			fill: 'rgba(255,255,255,0)',
			stroke: 'rgba(255,255,255,1)',

			init: function() {

				//targetTransform = new Vector(-24, 137);

				var k = 32;
				for( var i=0; i<k;i++ ) {

					var xPlane = new Plane('y', (i/k));
					xPlane.canvas.style.webkitAnimationDelay = (i*0.1) + 's';
					xPlane.canvas.style.animationDelay = (i*0.1) + 's';
					xPlane.isFixed = false;
					xPlane.transform.rotateX = -230 + ((i/k) * 360);
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
		}



		/*{

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
		},*/
		
		

		/*{

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
		},*/
		

		/*{
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
		},*/

		
	];








	function handleProgramCLick() {

			document.querySelector('#ctrl li.active').classList.remove('active');
			this.classList.add('active');
				
			window.clearTimeout(nextTimeout);
			activeIndex = this.dataset.index;
			activeProgram.name = programs[activeIndex].name; //dangerously hacky!!11
			next();
		}




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
	}

	function loop() {

		if( typeof activeProgram.loop === 'function' ) {
			activeProgram.loop();
		}

		updateCardTransform();
		window.requestAnimationFrame( loop );
	}


init();