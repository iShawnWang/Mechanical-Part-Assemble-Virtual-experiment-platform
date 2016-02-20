//Constant
var OBJ_COUNT = [12, 8, 19, 28];
var ABSORB_DISTANCE = 55;
//all the obj's initial position
var RESET_OFFSET = 0;
//
var ROTATION_90 = 90 / 180 * Math.PI;
//
var ANIM_TIME_SHORT = 220; //ms
var ANIM_TIME_LONG = 800;
var ANIM_OFFSET_SCALE = 1.2; //mutiply
//
var PIP_WIDTH = 300;
var PIP_HEIGHT = PIP_WIDTH * (window.innerHeight / window.innerWidth) * 1.2;
var PIP_BG = 0x00ff00;
//

var OPACITY = 0.5;
var NON_OPACITY = 1;
var GROUND_BG = 0xFFFFFF;
//create an endless plane
var ENDLESS = 20000;
var COLOR_MAP0 = ['0x00AAAA', '0xFF981D', '0xFFFFFF', '0x691BB8', '',
	//
	'', '0xff0000', '0xff0000', '0x00ff00', '0x00ff00',
	//
	'', '0xff00ff'
];
var COLOR_MAP1 = ['0x00AAAA', '0xFF981D', '0xFFFFFF', '0x691BB8', '',
	//
	'0xC1004F', '0xff0000', ''
];
var COLOR_MAP2 = ['0x00AAAA', '0xFF981D', '0xFF981D', '0x4FB300', '',
	//
	'0xC1004F', '0xff0000', '0xC1004F', '0x00AAAA', '0x691BB8',
	//
	'0x9D100', '0xff00ff', '0xAA40FF', '0xff0000', '0xFFFFFF',
	//
	'', '', '', ''
];
var COLOR_MAP3 = [
	'0x00AAAA', '0x00AAAA', '0x9D100', '0x4FB300', '',
	//
	'0xFFFFFF', '', '0xC1004F', '', '0xff0000',
	//
	'0xFF981D', '0xFF981D', '0xC1004F', '', '',
	//
	'', '0xff00ff', '0xAA40FF', '0xff0000', '0x9D100',
	//
	'0x691BB8', '0xff00ff', '0xAA40FF', '0xff0000', '0xFFFFFF',
	'0x9D100', '0x691BB8'
];
//

//explosive_view_position
var EXPLOSIVE_VIEW_MAP0 = [
	new THREE.Vector3(-40, -40, 0),
	new THREE.Vector3(125, 0, 0),
	new THREE.Vector3(55, 0, 0),
	new THREE.Vector3(-40, 30, 0),
	new THREE.Vector3(-40, 90, 0),
	//
	new THREE.Vector3(-40, 90, 0),
	new THREE.Vector3(-40, 100, 0),
	new THREE.Vector3(-40, 100, 0),
	new THREE.Vector3(-40, 130, 0),
	new THREE.Vector3(-40, 130, 0),
	//
	new THREE.Vector3(-50, 0, -20),
	new THREE.Vector3(-50, 45, 0)
];
var EXPLOSIVE_VIEW_MAP1 = [
	new THREE.Vector3(-52, -20, 0),
	new THREE.Vector3(0, 30, 0),
	new THREE.Vector3(-25, 60, 0),
	new THREE.Vector3(-62, 20, 0),
	new THREE.Vector3(20, 80, 0),
	//
	new THREE.Vector3(40, 50, 0),
	new THREE.Vector3(15, 30, -20),
	new THREE.Vector3(15, 15, 20)
];
var EXPLOSIVE_VIEW_MAP2 = [
	new THREE.Vector3(0, -10, 0),
	new THREE.Vector3(-120, 0, 0),
	new THREE.Vector3(-150, 0, 0),
	new THREE.Vector3(-180, 0, 0),
	new THREE.Vector3(-210, 0, 0),
	//
	new THREE.Vector3(-240, 0, 0),
	new THREE.Vector3(-280, 0, 0),
	new THREE.Vector3(100, 0, 0),
	new THREE.Vector3(130, 0, 0),
	new THREE.Vector3(160, 0, 0),
	//
	new THREE.Vector3(190, 0, 0),
	new THREE.Vector3(20, 0, 0),
	new THREE.Vector3(-50, 0, 0),
	new THREE.Vector3(50, 0, 0),
	new THREE.Vector3(0, 100, 0),
	//
	new THREE.Vector3(-300, 0, 0),
	new THREE.Vector3(100, 0, 0),
	new THREE.Vector3(-400, 0, 0),
	new THREE.Vector3(300, 0, 0),
];
var EXPLOSIVE_VIEW_MAP3 = [
	new THREE.Vector3(0, 0, 0),
	new THREE.Vector3(0, 180, 0),
	new THREE.Vector3(0, 80, 0),
	new THREE.Vector3(0, 20, 0),
	new THREE.Vector3(0, 40, 0),
	//
	new THREE.Vector3(0, 100, 0),
	new THREE.Vector3(0, 210, 0),
	new THREE.Vector3(0, -20, 0),
	new THREE.Vector3(0, 20, 0),
	new THREE.Vector3(0, 80, 0),
	//
	new THREE.Vector3(0, 20, 0),
	new THREE.Vector3(0, 80, 0),
	new THREE.Vector3(0, 20, 0),
	new THREE.Vector3(0, -30, 0),
	new THREE.Vector3(0, -30, 0),
	//
	new THREE.Vector3(0, -30, 0),
	new THREE.Vector3(0, 110, 0),
	new THREE.Vector3(0, 110, 0),
	new THREE.Vector3(0, 110, 0),
	new THREE.Vector3(0, 0, 0),
	//
	new THREE.Vector3(0, 0, 0),
	new THREE.Vector3(0, 0, 0),
	new THREE.Vector3(0, 0, 0),
	new THREE.Vector3(0, 0, 0),
	new THREE.Vector3(0, 0, 0),
	//
	new THREE.Vector3(0, 0, 0),
	new THREE.Vector3(0, 0, 0)
];

//
var container;
var camera, scene, scene_pip, renderer, renderer_pip;
//
var currentObj;
//
var objects = [],
	plane;
var pip;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
	offset = new THREE.Vector3(),
	INTERSECTED, SELECTED;
//delta on the plane
var delta;
var lastSELECTED;
//
var tween;
var tweenSet = [];
var positions = [];
//
var controls;

//shadow holder
var groundGeometry;
var groundMaterial;
//obj loader
var loader;
var onLoad;
var onProgress;
var onError;


function webglAvailable() {
	try {
		var canvas = document.createElement('canvas');
		return !!(window.WebGLRenderingContext && (
			canvas.getContext('webgl') ||
			canvas.getContext('experimental-webgl')));
	} catch (e) {
		return false;
	}
}

parseParam();

window.onload = function() {
	//show pip
	pip = document.getElementById("pip");
	if (webglAvailable()) {
		renderer_pip = new THREE.WebGLRenderer({
			antialias: true,
			canvas: pip
		});
	} else {
		renderer_pip = new THREE.CanvasRenderer();
	}

	renderer_pip.setClearColor(PIP_BG);
	renderer_pip.setPixelRatio(window.devicePixelRatio);//比例 16：9
	renderer_pip.setSize(PIP_WIDTH, PIP_HEIGHT);
}

function parseParam() {
	var url = location.search;

	if (url.indexOf("?") != -1) {
		var str = url.substr(1)　 //去掉?号
		currentObj = str.split("=")[1];
	}
	if (currentObj == null || currentObj == "") {
		currentObj = "2";
	}
	init();
}

function init() {
	//progress bar onload
	Pace.on("done", function() {
		console.log("Alldone");
		//show main interface
		container.style.display = "block";
		document.getElementsByTagName("nav")[0].style.display = "block";
		document.getElementById("pip").style.display = "block";
		document.getElementById("notifycation").style.display = "none";
		animate();
	});
	//
	container = document.createElement('div');
	document.body.appendChild(container);
	//camera
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
	camera.position.z = 200;
	camera.position.y = 200;
	camera.position.x = 100;
	camera.translateX(300);
	camera.lookAt(0, 0, 0);
	// scene
	scene = new THREE.Scene();
	scene_pip = new THREE.Scene();
	//lights 
	var ambient = new THREE.AmbientLight(0x444444);
	scene.add(ambient);
	scene_pip.add(ambient.clone());
	//shadow
	var directionalLight = new THREE.DirectionalLight(0xffeedd);
	directionalLight.position.set(1000, 500, 2000);
	directionalLight.castShadow = true;
	//	directionalLight.shadowCameraVisible = true;
	scene.add(directionalLight);
	scene_pip.add(directionalLight.clone());
	//coordinate
	var axis = new THREE.AxisHelper(ENDLESS);
	scene.add(axis);
	// GROUND
	groundGeometry = new THREE.BoxGeometry(ENDLESS, 0.01, ENDLESS);
	groundMaterial = new THREE.MeshLambertMaterial({
		color: GROUND_BG,
		transparent: true,
		opacity: 0.85
	});
	groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
	groundMesh.receiveShadow = true;
	groundMesh.position.y = -110;
	scene.add(groundMesh);
	//
	plane = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(ENDLESS, ENDLESS, 8, 8),
		new THREE.MeshBasicMaterial({
			color: 0x000000,
			opacity: 0.25,
			transparent: true
		})
	);
	plane.visible = false;
	scene.add(plane);
	//loader
	loader = new THREE.OBJMTLLoader();
	// debug
	onProgress = function(xhr) {
		//		if (xhr.lengthComputable) {
		//			var percentComplete = xhr.loaded / xhr.total * 100;
		//			console.log(Math.round(percentComplete, 2) + '% downloaded');
		//		}
	};
	onError = function(xhr) {};
	//
	function makeHandler(tag) {
			return function parseObj(object) {
				object.traverse(function(child) {
					if (child instanceof THREE.Mesh) {
						switch (currentObj) {
							case "0":
								child.scale.set(0.01, 0.01, 0.01);
								child.rotation.set(ROTATION_90, 0, -ROTATION_90);
								child.material.color.setHex(COLOR_MAP0[tag]);
								break;
							case "1":
								child.material.color.setHex(COLOR_MAP1[tag]);
								break;
							case "2":
								child.scale.set(1.8, 1.8, 1.8);
								child.rotation.set(0, ROTATION_90, 0);
								child.material.color.setHex(COLOR_MAP2[tag]);
								break;
							case "3":
								child.scale.set(1.2, 1.2, 1.2);
								child.rotation.set(-ROTATION_90, 0, 0);
								child.material.color.setHex(COLOR_MAP3[tag]);
								break;
						}
						child.castShadow = true;
						child.material.transparent = true;
						objects[tag] = child;
					}
				});
				scene.add(object);
			}
		}
		//

	function makeHandler_pip(tag) {
			return function parseObj(object) {
				object.traverse(function(child) {
					if (child instanceof THREE.Mesh) {
						switch (currentObj) {
							case "0":
								child.scale.set(0.01, 0.01, 0.01);
								child.rotation.set(ROTATION_90, 0, -ROTATION_90);
								child.material.color.setHex(COLOR_MAP0[tag]);
								break;
							case "1":
								child.material.color.setHex(COLOR_MAP1[tag]);
								break;
							case "2":
								child.scale.set(1.8, 1.8, 1.8);
								child.rotation.set(0, -ROTATION_90, 0);
								child.material.color.setHex(COLOR_MAP2[tag]);
								break;
							case "3":
								child.rotation.set(-ROTATION_90, 0, 0);
								child.scale.set(1.2, 1.2, 1.2);
								child.material.color.setHex(COLOR_MAP3[tag]);
								break;
						}
					}
				});
				scene_pip.add(object);
			}
		}
		//load obj
	for (var i = 0; i < OBJ_COUNT[currentObj]; i++) {
		var qb = 'obj/' + 'obj' + currentObj + "/" + i + '.obj';
		loader.load('obj/' + 'obj' + currentObj + "/" + i + '.obj', '', makeHandler(i), onProgress, onError);
	}
	//
	for (var i = 0; i < OBJ_COUNT[currentObj]; i++) {
		var qb = 'obj/' + 'obj' + currentObj + "/" + i + '.obj';
		loader.load('obj/' + 'obj' + currentObj + "/" + i + '.obj', '', makeHandler_pip(i), onProgress, onError);
	}

	//renderer
	if (webglAvailable()) {
		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
	} else {
		renderer = new THREE.CanvasRenderer();
	}

	renderer.shadowMapEnabled = true;
	renderer.setClearColor(0x000000);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);
	//Controls
	controls = new THREE.TrackballControls(camera);
	controls.rotateSpeed = 3.0;
	addEventListeners();

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time) {
	requestAnimationFrame(animate);
	TWEEN.update();
	render();
}

function render() {
	controls.update();
	renderer.render(scene, camera);
	if (renderer_pip) {
		renderer_pip.render(scene_pip, camera);
	}
}

function addEventListeners() {
	renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
	renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, true);
	renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
	window.addEventListener('resize', onWindowResize, false);
}

function onDocumentMouseMove(event) {
	event.preventDefault();
	if (window.innerHeight - event.clientY <= 60) {
		controls.enabled = false;
	} else {
		controls.enabled = true;
	}
	//
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	//
	raycaster.setFromCamera(mouse, camera);
	if (SELECTED) {
		var intersects = raycaster.intersectObject(plane);
		SELECTED.material.opacity = OPACITY;
		delta = intersects[0].point.sub(offset);
		//reconnect objs;
		if (Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2) + Math.pow(delta.z, 2)) <= ABSORB_DISTANCE) {

			var position = {
				x: SELECTED.position.x,
				y: SELECTED.position.y,
				z: SELECTED.position.z
			};
			var target = {
				x: 0,
				y: 0,
				z: 0
			};
			//tween.js
			tween = new TWEEN.Tween(position)
				.to(target, ANIM_TIME_SHORT)
				.easing(TWEEN.Easing.Sinusoidal.Out)
				.onUpdate(function() {
					if (lastSELECTED) {
						lastSELECTED.position.x = position.x;
						lastSELECTED.position.y = position.y;
						lastSELECTED.position.z = position.z;
					}
				}).onComplete(function() {
					console.log("complete");
					tween = null;
				})
				.start();
		} else {
			SELECTED.position.copy(delta);
		}
		return;
	}
	var intersects = raycaster.intersectObjects(objects);
	if (intersects.length > 0) {
		if (INTERSECTED != intersects[0].object) {
			if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
			INTERSECTED = intersects[0].object;
			INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
			plane.position.copy(INTERSECTED.position);
			plane.lookAt(camera.position);
		}
		container.style.cursor = 'pointer';
	} else {
		if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
		INTERSECTED = null;
		container.style.cursor = 'auto';
	}
}

function onDocumentMouseDown(event) {
	event.preventDefault();
	controls.enabled = true;
	if (lastSELECTED) {
		lastSELECTED.material.opacity = NON_OPACITY;
	}
	//
	var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
	var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
	var intersects = raycaster.intersectObjects(objects);
	if (intersects.length > 0) {
		controls.enabled = false;
		lastSELECTED = null;
		SELECTED = intersects[0].object;
		SELECTED.material.opacity = OPACITY;
		var intersects = raycaster.intersectObject(plane);
		offset.copy(intersects[0].point).sub(plane.position);
		container.style.cursor = 'move';
		//Debug
		//		for (var i = 0; i < objects.length; i++) {
		//			if (objects[i] == SELECTED) {
		//				console.log("Selected:" + i);
		//			}
		//		}
	}
}

function onDocumentMouseUp(event) {
	event.preventDefault();
	if (SELECTED) {
		SELECTED.material.opacity = OPACITY;
	}

	if (INTERSECTED) {
		plane.position.copy(INTERSECTED.position);
		lastSELECTED = SELECTED;
		SELECTED = null;
	}
	container.style.cursor = 'auto';
}

function toogleWireFrame() {
	if (lastSELECTED) {
		toogleWireFrame0(lastSELECTED);
	}
}

function toogleWireFrameAll() {
	for (var i = 0; i < objects.length; i++) {
		toogleWireFrame0(objects[i]);
	}
}

function toogleWireFrame0(which) {
	which.material.wireframe = !which.material.wireframe;
	which.castShadow = !which.castShadow;
}

function tooglePip() {
	var baba = pip.style.transform;
	var orig = {
		x: 0,
		y: 0
	};
	var dest = {
		x: -PIP_WIDTH,
		y: 0
	};
	if (pip.style.transform == "") {
		var tween = new TWEEN.Tween(orig)
			.to(dest, 500)
			.easing(TWEEN.Easing.Quadratic.In)
			.onUpdate(function() {
				var transform = 'translateX(' + this.x + 'px)';
				pip.style.transform = transform;
			})

		.start();
	} else {
		var tween = new TWEEN.Tween(dest)
			.to(orig, 500)
			.easing(TWEEN.Easing.Quadratic.Out)
			.onUpdate(function() {
				var transform = 'translateX(' + this.x + 'px)';
				pip.style.transform = transform;
			})
			.onComplete(function() {
				pip.style.transform = "";
			})
			.start();
	}


}

function changeObjColor(color) {
	if (lastSELECTED) {
		lastSELECTED.material.color.setHex(color);
	}
}

function changeGroundColor(color) {
	groundMaterial.color.setHex(color);
}

function resetState() {
	//reset position
	for (var i = 0; i < objects.length; i++) {
		var obj = objects[i];
		obj.material.wireframe = false;
		var target = new THREE.Vector3(0, 0, 0);
		var tween = new TWEEN.Tween(obj.position).to(target, ANIM_TIME_LONG).easing(TWEEN.Easing.Sinusoidal.Out).start();
	}
}


function split() {
	for (var i = 0; i < objects.length; i++) {
		var obj = objects[i];
		var tmp;
		//clone and not modify offset data
		switch (currentObj) {
			case "0":
				tmp = new THREE.Vector3().copy(EXPLOSIVE_VIEW_MAP0[i]);
				break;
			case "1":
				tmp = new THREE.Vector3().copy(EXPLOSIVE_VIEW_MAP1[i]);
				break;
			case "2":
				tmp = new THREE.Vector3().copy(EXPLOSIVE_VIEW_MAP2[i]);
				break;
			case "3":
				tmp = new THREE.Vector3().copy(EXPLOSIVE_VIEW_MAP3[i]);
				break;
		}
		//scale offset data
		var target = tmp.multiplyScalar(ANIM_OFFSET_SCALE);
		var tween = new TWEEN.Tween(obj.position)
			.to(target, ANIM_TIME_LONG)
			.easing(TWEEN.Easing.Sinusoidal.Out)
			.start();
	}
}