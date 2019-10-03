document.getElementById('animation-timeline-loader').addEventListener('change', loadTimeline, false);
document.getElementById('fbx-loader').addEventListener('change', loadFBXModel, false);
document.getElementById('texture-loader').addEventListener('change', loadTexture, false);

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
		var json = JSON.parse(reader.result);
		for (let i = 0; i < json.animationsTimeline.length; i++) {
			animationsTimeline.push(json.animationsTimeline[i]);
        }
        
        console.log("TimeLine loaded >>>");
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
		startLoadFBX();
	};
}


function loadTexture(e){

	var file = e.target.files[0];
	if (!file) {
		return;
	}
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e) {
        
        texture = new THREE.TextureLoader().load(reader.result, function(){
            material = new THREE.MeshPhongMaterial ( { map: texture } );
        });
        // immediately use the texture for material creation
        console.log("Texture Loaded>>>");
		//HABILITA O BOTAO
		//startLoadFBX();
	};
}