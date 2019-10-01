var fbxModel = null;
let fbxLoader = new THREE.FBXLoader();

var animationsTimeline = [
	{
		name: "37",
		startFrame: 0,
		endFrame: 141,
		fps: 24
	},
	{
		name: "38",
		startFrame: 142,
		endFrame: 217,
		fps: 24
	},
	{
		name: "39",
		startFrame: 218,
		endFrame: 421,
		fps: 24
	},
	{
		name: "40",
		startFrame: 422,
		endFrame: 602,
		fps: 24
	},
	{
		name: "41",
		startFrame: 603,
		endFrame: 978,
		fps: 24
	},
	{
		name: "42",
		startFrame: 979,
		endFrame: 1214,
		fps: 24
	},
	{
		name: "43",
		startFrame: 1215,
		endFrame: 1310,
		fps: 24
	},
	{
		name: "44",
		startFrame: 1311,
		endFrame: 1715,
		fps: 24
	},
	{
		name: "45",
		startFrame: 1716,
		endFrame: 1948,
		fps: 24
	},
	{
		name: "46",
		startFrame: 1949,
		endFrame: 2210,
		fps: 24
	},
	{
		name: "47",
		startFrame: 2211,
		endFrame: 2306,
		fps: 24
	},
	{
		name: "Idle",
		startFrame: 2307,
		endFrame: 2717,
		fps: 24
	}
];

var animationsMixer = {};
var currentAnimationName = animationsTimeline[0].name;
var idle;
var walk;
function startLoadFBX(){
	fbxLoader.load('../models/fbx/duda/duda_OWI_clip.fbx', (object) => {
	  
		fbxModel = object;
		
		//Mixers from main.js
		fbxModel.mixer = new THREE.AnimationMixer( fbxModel );
		mixers.push(fbxModel.mixer);
		
		createAnimationsSplited();
		//createAnimationsTimeline();

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
	setWeight(animationsMixer["37"], 1);
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
	setWeight(animationsMixer["37"], 1);
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