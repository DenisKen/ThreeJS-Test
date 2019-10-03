var fbxModel = null;
let fbxLoader = new THREE.FBXLoader();

var FBXLoaderPath;

function startLoadFBX(){

	typeModel = "fbx";
	currentAnimationName = animationsTimeline[0].name;

	fbxLoader.load(FBXLoaderPath, (object) => {
	//fbxLoader.load('../models/fbx/duda/duda_OWI_timeline3_blender.fbx', (object) => {
	  
		fbxModel = object;
		
		//Mixers from main.js
		fbxModel.mixer = new THREE.AnimationMixer( fbxModel );
		mixers.push(fbxModel.mixer);
		
		//createAnimationsSplited();
		createAnimationsTimeline(fbxModel);

		fbxModel.traverse((child) => {

			if (child.isMesh){				

				console.log(child.material);
				child.material.map = texture;
			}
			child.needsUpdate=true;
		})
		
		
		this.scene.add(fbxModel);
		
		fbxModel.position.y = -500;
		fbxModel.scale.set(scale, scale, scale);

		console.log("FBX Loaded >>>");
	});	
} 


