var texture = null;
var material = null;
var animationsMixer = {};
var currentAnimationName;
var scale = 50;

var animationsTimeline = [];


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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