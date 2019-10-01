var gltfModel = null;
let gltfLoader = new THREE.GLTFLoader();

function startLoadGLTF(){
	console.log("I was called");	
	gltfLoader.load('../models/gltf/room/Sketchfabroomtest.gltf', (gltf) => {
	  
		
	  gltfModel = gltf.scene;

	  //Mixers from main.js
	  gltfModel.mixer = new THREE.AnimationMixer( gltfModel );
	  mixers.push( gltfModel.mixer );

	  gltfModel.traverse( ( child ) => {
	  })
	  
	  this.scene.add(gltfModel);
	 
	  gltfModel.position.y = 0;
	  gltfModel.scale.x = 120;
	  gltfModel.scale.y = 120;
	  gltfModel.scale.z = 120;

	  console.log("GLTF Loaded >>>>>>>>>>>>>>>>>>>");
	},
	( xhr ) => {
	  // called while loading is progressing
	  console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
	},
	( error ) => {
	  // called when loading has errors
	  console.error( 'An error happened', error );
	});	
} 