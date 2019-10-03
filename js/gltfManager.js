var gltfModel = null;
let gltfLoader = new THREE.GLTFLoader();

var gltfLoaderPath;
function startLoadGLTF(){
	typeModel = "gltf";

	gltfLoader.load(gltfLoaderPath, (gltf) => {
	  
		
	  gltfModel = gltf.scene;

	  //Mixers from main.js
	  gltfModel.mixer = new THREE.AnimationMixer( gltfModel );
	  mixers.push( gltfModel.mixer );

	  createAnimationsTimeline(gltfModel);

	  gltfModel.traverse( ( child ) => {

		if (child.isMesh){				

			console.log(child.material);
			child.material.map = texture;
		}
		child.needsUpdate=true;

	  })
	  
	  this.scene.add(gltfModel);
	 
	  gltfModel.position.y = -500;
	  gltfModel.scale.set(scale, scale, scale);

	  console.log("GLTF Loaded >>>");
	});	
} 