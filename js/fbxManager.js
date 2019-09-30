var fbxModel = null;
let fbxLoader = new THREE.GLTFLoader();
function startLoadFBX(){
	fbxLoader.load('../models/room/Sketchfabroomtest.gltf', (object) => {
	  
	  fbxModel = object;
	  fbxModel.traverse( ( child ) => {
	  })
	  
	  
	  this.scene.add(fbxModel);
	 
	  fbxModel.position.y = 0;
	  fbxModel.scale.x = 120;
	  fbxModel.scale.y = 120;
	  fbxModel.scale.z = 120;

	  console.log("FBX Loaded >>>>>>>>>>>>>>>>>>>");
	});	
} 