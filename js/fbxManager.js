var fbxModel = null;
let fbxLoader = new THREE.FBXLoader();



var animationsMixer = {};
var currentAnimationName;
var idle;
var walk;
var FBXLoaderPath;
function startLoadFBX(){

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
		})
		
		
		this.scene.add(fbxModel);
		
		fbxModel.position.y = -500;
		fbxModel.scale.set(50,50,50);

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
		console.log("Im here");
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
	//playAnimation("idle", 1);
	
}

function playAnimation(name,duration){
	if (currentAnimationName == name)
		return;
	
	var animationToPlay = animationsMixer[name];
	var currentAnimation = animationsMixer[currentAnimationName];
		
	setWeight(animationToPlay, 1);
	animationToPlay.time = 0;
		
	currentAnimation.crossFadeTo(animationToPlay,duration, 0);

	currentAnimationName = name;

	console.log("Play animation", name);
}
function activeAllAnimations(){

	var key;
	for(key in animationsMixer){

		setWeight(animationsMixer[key], 0);
		animationsMixer[key].play();
	}
}

function setWeight(action, weight){
	action.enabled = true;
	action.setEffectiveTimeScale( 1 );
	action.setEffectiveWeight( weight );
}

function disableAllAnimationsWeight(){	
	var key;
	for(key in animationsMixer){
		setWeight(animationsMixer[key], 0);
	}
};	