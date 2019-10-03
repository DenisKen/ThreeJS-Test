//INIT
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 );
camera.position.set( 0, 0, 200 );


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);


scene.background = new THREE.Color( 0xffffff );
var light = new THREE.AmbientLight( 0x404040, 7); // soft white light
this.scene.add( light );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
scene.add( directionalLight );

//ORBIT CONTROLS >>>>>>>>>>>>
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();

var clock = new THREE.Clock(); 
var delta = 0;


var mixers = [];
var typeModel = "";


//>>>>>>>>>>>>>>>>>>>>> HUD >>>>>>>>>>>>
var animationTransition = 1.0;
var indexAnimation = 0;
var animationsTimeline = [];

function changeAnimationTransition(){
	animationTransition = parseFloat(document.getElementById('animation-transition').value);
	console.log("Animation Transition changed to:",animationTransition);
}
function playNextAnimation(){
	
	if (indexAnimation < animationsTimeline.length-1){
		indexAnimation += 1;
		playAnimation(animationsTimeline[indexAnimation].name, animationTransition);
		return;
	}
	console.log("Last animation");
}
function playPreviousAnimation(){
	if (indexAnimation > 0){
		indexAnimation -= 1;
		playAnimation(animationsTimeline[indexAnimation].name, animationTransition);
		return;
	}
	console.log("First animation");
}
function changeModelScale(){
	
	scale = document.getElementById('model-scale').value;

	if (typeModel == "fbx")
		fbxModel.scale.set(scale,scale,scale);
	else if(typeModel == "gltf")
		fbxModel.scale.set(scale,scale,scale);

}




if (typeModel == "gltf"){
	//startLoadGLTF();
}
else if (typeModel == "fbx"){
	//startLoadFBX();
}


function animate() {
	delta = clock.getDelta();

	if ( mixers.length > 0 ) {
        for ( var i = 0; i < mixers.length; i ++ ) {
            mixers[i].update( delta );
        }
    } 
	

	controls.update();

	renderer.render( scene, camera );
	
	requestAnimationFrame( animate );
}
animate();