document.getElementById('animation-timeline-loader').addEventListener('change', loadTimeline, false);
document.getElementById('fbx-loader').addEventListener('change', loadFBXModel, false);
//INIT
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
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
var typeModel = "fbx";


//>>>>>>>>>>>>>>>>>>>>> HUD >>>>>>>>>>>>
var animationTransition = 1;
var indexAnimation = 0;
var animationsTimeline = [];

function changeAnimationTransition(){
	animationTransition = document.getElementById('animation-transition').value;
}
function playNextAnimation(){
	
	if (indexAnimation < animationsTimeline.length-1){
		indexAnimation += 1;
		playAnimation(animationsTimeline[indexAnimation].name,animationTransition);
		return;
	}
	console.log("Last animation");
}
function playPreviousAnimation(){
	if (indexAnimation > 0){
		indexAnimation -= 1;
		playAnimation(animationsTimeline[indexAnimation].name,animationTransition);
		return;
	}
	console.log("First animation");
}
function changeModelScale(){

}

function loadTimeline(e){
	var file = e.target.files[0];
	if (!file) {
		return;
	}
	var reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function(e) {
		var content = e.target.result;
		//HABILITA O BOTAO
		console.log("Reader loaded");
		var json = JSON.parse(reader.result);
		for (let i = 0; i < json.animationsTimeline.length; i++) {
			animationsTimeline.push(json.animationsTimeline[i]);
		}
		//startLoadFBX();
	};
}
function loadFBXModel(e){

	var file = e.target.files[0];
	if (!file) {
		return;
	}
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e) {
		var content = e.target.result;
		//HABILITA O BOTAO
		FBXLoaderPath = reader.result;
		window.reader = reader;
		startLoadFBX();
	};
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