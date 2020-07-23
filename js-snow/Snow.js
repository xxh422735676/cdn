Particle3D=function(material){
	THREE.Particle.call(this,material);
	this.velocity=new THREE.Vector3(4,-4,1);//闁喎瀹�;
	//this.velocity.rotateX(2);//閺冨娴�;
	this.gravity=new THREE.Vector3(0,0,0);//閸旂娀鈧喎瀹�;
	this.drag=1;//闁喎瀹抽惄闀愮缁粯鏆�;
};
//Particle:缁帒鐡�;
//prototype:閸樼喎鑸�;
Particle3D.prototype=new THREE.Particle();
Particle3D.prototype.constructor=Particle3D;//閺嬪嫰鈧姴鍤遍弫锟�
Particle3D.prototype.updatePhysics=function(){
	this.velocity.multiplyScalar(this.drag);//閻垽鍣洪惄闀愮閸戣姤鏆�
	this.velocity.addSelf(this.gravity);//閻垽鍣洪惄绋垮閸戣姤鏆�
	this.position.addSelf(this.velocity);//閻垽鍣洪惄绋垮閸戣姤鏆�
}
var TO_RADIANS=Math.PI/180;//鐟欐帒瀹抽崥鎴濆К鎼达箒娴嗛幑銏㈤兇閺侊拷*
THREE.Vector3.prototype.rotateY=function(angle){
	//缂佹槡鏉炴挳銆庨弮鍫曟嫛閺冨娴哸ngle;
	cosRY=Math.cos(angle*TO_RADIANS);
	sinRY=Math.sin(angle*TO_RADIANS);
	var tempz=this.z;
	var tempx=this.x;
	this.x=(tempx*cosRY)+(tempz*sinRY);
	this.z=(tempx*-sinRY)+(tempz*cosRY);
}
THREE.Vector3.prototype.rotateX=function(angle){
	//缂佹槝鏉炴挳銆庨弮鍫曟嫛閺冨娴哸ngle;
	cosRY=Math.cos(angle*TO_RADIANS);
	sinRY=Math.sin(angle*TO_RADIANS);
	var tempz=this.z;;
	var tempy=this.y;
	this.y=(tempy*cosRY)+(tempz*sinRY);
	this.z=(tempy*-sinRY)+(tempz*cosRY);
}
THREE.Vector3.prototype.rotateZ=function(angle){
	//缂佹槢鏉炴挳銆庨弮鍫曟嫛閺冨娴哸ngle;
	cosRY=Math.cos(angle*TO_RADIANS);
	sinRY=Math.sin(angle*TO_RADIANS);
	var tempx=this.x;;
	var tempy=this.y;
	this.y=(tempy*cosRY)+(tempx*sinRY);
	this.x=(tempy*-sinRY)+(tempx*cosRY);
}
function randomRange(min,max){
	return((Math.random()*(max-min))+ min);
}
	var SCREEN_WIDTH = window.innerWidth;//
	var SCREEN_HEIGHT = window.innerHeight;
	var container;
	var particle;//缁帒鐡�
	var camera;
	var scene;
	var renderer;
	var starSnow = 1;
	var particles = []; 
	var particleImage = new Image();
	//THREE.ImageUtils.loadTexture( "img/ParticleSmoke.png" );
	particleImage.src = 'http://www.lmlblog.com/blog/12/images/xue.png'; 
	function init() {
		//alert("message3");
		container = document.createElement('div');//container閿涙氨鏁剧敮鍐ㄧ杽娓氾拷;
		document.body.appendChild(container);
		camera = new THREE.PerspectiveCamera( 60, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
		camera.position.z = 1000;
		//camera.position.y = 50;
		scene = new THREE.Scene();
		scene.add(camera);
		renderer = new THREE.CanvasRenderer();
		renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
		var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );
			//alert("message2");
		for (var i = 0; i < 100; i++) {
			//alert("message");
			particle = new Particle3D( material);
			particle.position.x = Math.random() * 2000-1000;
			particle.position.z = Math.random() * 2000-1000;
			particle.position.y = Math.random() * 2000-1000;
			//particle.position.y = Math.random() * (1600-particle.position.z)-1000;
			particle.scale.x = particle.scale.y =  1;
			scene.add( particle );
			
			particles.push(particle); 
		}
		container.appendChild( renderer.domElement );
		//document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		document.addEventListener( 'touchend', onDocumentTouchEnd, false );
		setInterval( loop, 1000 / 60 );
		
	}
	var touchStartX;
	var touchFlag = 0;//閸屻劌鐡ㄨぐ鎾冲閺勵垰鎯佸⿰鎴濆З閻ㄥ嫮濮搁幀锟�;
	var touchSensitive = 80;//濡偓濞村绮﹂崝銊ф畱閻忓灚鏅辨惔锟�;
	//var touchStartY;
	//var touchEndX;
	//var touchEndY;
	function onDocumentTouchStart( event ) {
		if ( event.touches.length == 1 ) {

			event.preventDefault();//閸欐牗绉锋妯款吇閸忓疇浠堥崝銊ょ稊;
			touchStartX = 0;
			touchStartX = event.touches[ 0 ].pageX ;
			//touchStartY = event.touches[ 0 ].pageY ;
		}
	}
	function onDocumentTouchMove( event ) {

		if ( event.touches.length == 1 ) {
			event.preventDefault();
			var direction = event.touches[ 0 ].pageX - touchStartX;
			if (Math.abs(direction) > touchSensitive) {
				if (direction>0) {touchFlag = 1;}
				else if (direction<0) {touchFlag = -1;};
				//changeAndBack(touchFlag);
			}	
		}
	}
	function onDocumentTouchEnd (event) {
		// if ( event.touches.length == 0 ) {
		// 	event.preventDefault();
		// 	touchEndX = event.touches[ 0 ].pageX ;
		// 	touchEndY = event.touches[ 0 ].pageY ;
	
		// }鏉╂瑩鍣风€涙ê婀梻顕€顣�
		var direction = event.changedTouches[ 0 ].pageX - touchStartX;

		changeAndBack(touchFlag);
	}

	function changeAndBack (touchFlag) {
		var speedX = 25*touchFlag;
		touchFlag = 0;
		for (var i = 0; i < particles.length; i++) {
			particles[i].velocity=new THREE.Vector3(speedX,-10,0);
		}
		var timeOut = setTimeout(";", 1000);
		clearTimeout(timeOut);

		var clearI = setInterval(function () {
			if (touchFlag) {
				clearInterval(clearI);
				return;
			};
			speedX*=0.8;

			if (Math.abs(speedX)<=1.5) {
				speedX=0;
				clearInterval(clearI);
			};
			
			for (var i = 0; i < particles.length; i++) {
				particles[i].velocity=new THREE.Vector3(speedX,-10,0);
			}
		},100);


	}
	function loop() {
		for(var i = 0; i<particles.length; i++){
			var particle = particles[i]; 
			particle.updatePhysics(); 

			with(particle.position)
			{
				if((y<-1000)&&starSnow) {y+=2000;}

				if(x>1000) x-=2000; 
				else if(x<-1000) x+=2000;
				if(z>1000) z-=2000; 
				else if(z<-1000) z+=2000;
			}			
		}

		camera.lookAt(scene.position); 

		renderer.render( scene, camera );
	}