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
		createAnimationsTimeline();

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

		console.log("FBX Loaded >>>>>>>>>>>>>>>>>>>");
	});	
} 
function createAnimationsSplited(){
	for (var i = 0; i < fbxModel.animations.length; i++) {
		var clipAction = fbxModel.mixer.clipAction( fbxModel.animations[ i ] );
		animationsMixer[animationsTimeline[i].name] = clipAction;
	}	

	activeAllAnimations();
	//Play first Animation
	setWeight(animationsMixer[animationsTimeline[0].name], 1);
}
function createAnimationsTimeline(){
	var clip = fbxModel.animations[0];
	//Create Animations Action
	for (var i = 0; i < animationsTimeline.length; i++) {
		var tempClip = THREE.AnimationUtils.subclip( 	clip, 
														animationsTimeline[i].name, 
														animationsTimeline[i].startFrame, 
														animationsTimeline[i].endFrame,
														animationsTimeline[i].fps );

		var clipAction = fbxModel.mixer.clipAction( tempClip );

		animationsMixer[animationsTimeline[i].name] = clipAction;
	}

	activeAllAnimations();
	//Play first Animation
	setWeight(animationsMixer[animationsTimeline[0].name], 1);	
}