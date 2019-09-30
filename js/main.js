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



var typeModel = "gltf";

if (typeModel == "gltf"){
	startLoadGLTF();
}
else if (typeModel == "fbx"){
	startLoadFBX();
}


function animate() {
	requestAnimationFrame( animate );

	controls.update();

	renderer.render( scene, camera );
}
animate();