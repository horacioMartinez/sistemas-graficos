/**
 * SWITCH DE TIPOS DE LUCES ACTIVAS
 */

var ambientalLightActive = false;
var directionalLightActive = false;
var specularLightActive = false;
var allLightActive = true;

function switchLight() {
	var divLuz = document.getElementById("luz");
	if (ambientalLightActive) {
		ambientalLightActive = false;
		directionalLightActive = true;
		specularLightActive = false;
		allLightActive = false;
		console.log("Lighting: only directional");
		divLuz.textContent = "L: cambiar componente de luz activa, la actual es: luz direccional";
	} else {
		if (directionalLightActive) {
			ambientalLightActive = false;
			directionalLightActive = false;
			specularLightActive = true;
			allLightActive = false;
			console.log("Lighting: only specular");
			divLuz.textContent = "L: cambiar componente de luz activa, la actual es: luz especular";
		} else {
			if (specularLightActive) {
				ambientalLightActive = false;
				directionalLightActive = false;
				specularLightActive = false;
				allLightActive = true;
				console.log("Lighting: all lights on");
				divLuz.textContent = "L: cambiar componente de luz activa, actualmente estan todas las luces activas";
			} else {
				if (allLightActive) {
					ambientalLightActive = true;
					directionalLightActive = false;
					specularLightActive = false;
					allLightActive = false;
					console.log("Lighting: ambiental only");
					divLuz.textContent = "L: cambiar componente de luz activa, la actual es: luz ambiental";
				}
			}
		}
	}
	gl.uniform1i(shaderProgram.lightAmbientalUniform, ambientalLightActive);
	gl.uniform1i(shaderProgram.lightDirectionalUniform, directionalLightActive);
	gl.uniform1i(shaderProgram.lightSpecularUniform, specularLightActive);
	gl.uniform1i(shaderProgram.lightTotalUniform, allLightActive);
}

var gl;

function initGL(canvas) {
	try {
		gl = canvas.getContext("experimental-webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry :-(");
	}
}

function getShader(gl, id) {
	var shaderScript = document.getElementById(id);
	if (!shaderScript) {
		return null;
	}

	var str = "";
	var k = shaderScript.firstChild;
	while (k) {
		if (k.nodeType == 3) {
			str += k.textContent;
		}
		k = k.nextSibling;
	}

	var shader;
	if (shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		return null;
	}

	gl.shaderSource(shader, str);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert(gl.getShaderInfoLog(shader));
		return null;
	}/*
	 * else{ alert("3z3"); }
	 */

	return shader;
}

var shaderProgram;

function initShaders() {
	// console.log("initShaders()");
	var fragmentShader = getShader(gl, "shader-fs");
	var vertexShader = getShader(gl, "shader-vs");

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert("Could not initialise shaders");
	}

	gl.useProgram(shaderProgram);

	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram,
		"aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram,
		"aVertexNormal");
	gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

	shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram,
		"aTextureCoord");
	gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

	shaderProgram.vertexBinormalAttribute = gl.getAttribLocation(shaderProgram,
		"aVertexBinormal");
	// console.log("RETURN VALUE: " + shaderProgram.vertexBinormalAttribute);
	gl.enableVertexAttribArray(shaderProgram.vertexBinormalAttribute);

	shaderProgram.vertexTangentAttribute = gl.getAttribLocation(shaderProgram,
		"aVertexTangent");
	// console.log("RETURN VALUE: " + shaderProgram.vertexTangentAttribute);
	gl.enableVertexAttribArray(shaderProgram.vertexTangentAttribute);

	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram,
		"uPMatrix");
	shaderProgram.ViewMatrixUniform = gl.getUniformLocation(shaderProgram,
		"uViewMatrix");
	shaderProgram.ModelMatrixUniform = gl.getUniformLocation(shaderProgram,
		"uModelMatrix");
	shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram,
		"uNMatrix");
	shaderProgram.textureSamplerUniform = gl.getUniformLocation(shaderProgram,
		"uTextureSampler");
	shaderProgram.normalSamplerUniform = gl.getUniformLocation(shaderProgram,
		"uNormalSampler");
	shaderProgram.reflectionSamplerUniform = gl.getUniformLocation(
		shaderProgram, "uReflectionSampler");
	shaderProgram.useNormalMapUniform = gl.getUniformLocation(shaderProgram,
		"uUseNormalMap");
	shaderProgram.useReflectionMapUniform = gl.getUniformLocation(
		shaderProgram, "uUseReflectionMap");
	shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram,
		"uAmbientColor");
	shaderProgram.lightingDirectionUniform = gl.getUniformLocation(
		shaderProgram, "uLightPosition");
	shaderProgram.directionalColorUniform = gl.getUniformLocation(
		shaderProgram, "uDirectionalColor");
	shaderProgram.specularColorUniform = gl.getUniformLocation(shaderProgram,
		"uSpecularColor");
	shaderProgram.cameraPositionUniform = gl.getUniformLocation(shaderProgram,
		"uCameraPos");
	shaderProgram.lightAmbientalUniform = gl.getUniformLocation(shaderProgram,
		"uLightAmbiental");
	shaderProgram.lightDirectionalUniform = gl.getUniformLocation(
		shaderProgram, "uLightDirectional");
	shaderProgram.lightSpecularUniform = gl.getUniformLocation(shaderProgram,
		"uLightSpecular");
	shaderProgram.lightTotalUniform = gl.getUniformLocation(shaderProgram,
		"uLightTotal");
	shaderProgram.reflectionLevel = gl.getUniformLocation(shaderProgram,
		"uReflectionLevel");
	gl.uniform1i(shaderProgram.lightAmbientalUniform, ambientalLightActive);
	gl.uniform1i(shaderProgram.lightDirectionalUniform, directionalLightActive);
	gl.uniform1i(shaderProgram.lightSpecularUniform, specularLightActive);
	gl.uniform1i(shaderProgram.lightTotalUniform, allLightActive);
}

var CameraMatrix = mat4.create();
var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();

window.onkeydown = checkKey;
window.onkeyup = checkKeyUp;
var keyRotateLeftPressed = false;
var keyRotateRightPressed = false;
var keyMoveForwardPressed = false;
var keyMoveBackwardPressed = false;
var keyMoveLeftPressed = false;
var keyMoveRightPressed = false;

var firstPersonX = -35.14;
var firstPersonY = -0.56;
var firstPersonZ = 0.35;
var firstPersonAngle = 6.14;
var firstPersonAngleUp = -0.04;
var fpSpeed = 0.2;

camaraCarro = false;
cameraFirstPerson = true;
cameraOrbital = false;
velocidad = 1;
function checkKey(ev) {
	// console.log("pressed: " + ev.keyCode);
	switch (ev.keyCode) {
		case 76:
			switchLight();
			break;
		case 65:
			keyRotateLeftPressed = true;
			break;
		case 68:
			keyRotateRightPressed = true;
			break;
		case 87:
			keyMoveForwardPressed = true;
			break;
		case 83:
			keyMoveBackwardPressed = true;
			break;
		case 81:
			keyMoveLeftPressed = true;
			break;
		case 69:
			keyMoveRightPressed = true;
			break;
		case 109:
			vec3.scale(cameraPos, 1.1);
			cameraRad = vec3.length(cameraPos);
			break;
		case 107:
			vec3.scale(cameraPos, 0.9);
			cameraRad = vec3.length(cameraPos);
			break;
		case 188:
			velocidad *= 2;
			rollerCoaster.decreaseCarritoSpeed();
			break;
		case 190:
			velocidad /= 2;
			rollerCoaster.increaseCarritoSpeed();
			break;
		case 67:
			var divCamera = document.getElementById("camara");
			if (camaraCarro) {
				camaraCarro = false;
				cameraFirstPerson = true;
				cameraOrbital = false;
				divCamera.textContent = "C: cambiar camara, actual: PRIMERA PERSONA";
			} else if (cameraFirstPerson) {
				camaraCarro = false;
				cameraFirstPerson = false;
				cameraOrbital = true;
				divCamera.textContent = "C: cambiar camara, actual: ORBITAL";
			} else if (cameraOrbital) {
				camaraCarro = true;
				cameraFirstPerson = false;
				cameraOrbital = false;
				divCamera.textContent = "C: cambiar camara, actual: CARRO";
			}
			break;
	}
}

function checkKeyUp(ev) {
	switch (ev.keyCode) {
		case 65:
			keyRotateLeftPressed = false;
			break;
		case 68:
			keyRotateRightPressed = false;
			break;
		case 87:
			keyMoveForwardPressed = false;
			break;
		case 83:
			keyMoveBackwardPressed = false;
			break;
		case 81:
			keyMoveLeftPressed = false;
			break;
		case 69:
			keyMoveRightPressed = false;
			break;
		default:
			break;
	}
}

function mvPushMatrix() {
	var copy = mat4.create();
	mat4.set(mvMatrix, copy);
	mvMatrixStack.push(copy);
}

function mvPopMatrix() {
	if (mvMatrixStack.length == 0) {
		throw "Invalid popMatrix!";
	}
	mvMatrix = mvMatrixStack.pop();
}

function setViewProjectionMatrix() {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	gl.uniformMatrix4fv(shaderProgram.ViewMatrixUniform, false, CameraMatrix);
}

function configCamaraOrbital() {
	CameraMatrix = mat4.create();
	cameraPos[0] = cameraRad * Math.cos(theta) * Math.sin(phi);
	cameraPos[1] = cameraRad * Math.sin(theta) * Math.sin(phi);
	cameraPos[2] = cameraRad * Math.cos(phi);
	mat4.identity(CameraMatrix);
	mat4.lookAt(cameraPos, cameraTarget, cameraUp, CameraMatrix);
	// var div = document.getElementById("posicion");
	// div.textContent = "posicion: (" + cameraPos[0] + ", " + cameraPos[1] + ",
	// " + cameraPos[2] + ")";
	gl.uniform3f(shaderProgram.cameraPositionUniform, cameraPos[0],
		cameraPos[1], cameraPos[2]);
}

function configCamaraCarro() {

	var posicion = rollerCoaster.obtenerPosicionCarro();
	var binormal = rollerCoaster.obtenerDireccionBinormal();

	var direccion = rollerCoaster.obtenerDireccionCarro();
	var objetivo = [ 0.0, 0.0, 0.0 ];

	// Hay que transformar estos vectores
	// con las mismas transformacionse que para la montaña rusa.

	mat4.multiplyVec3(model_matrix_roller, posicion);
	mat4.multiplyVec3(model_matrix_roller, binormal);
	mat4.multiplyVec3(model_matrix_roller, direccion);

	var matRotObj = mat4.create();
	mat4.identity(matRotObj);
	mat4.rotate(matRotObj, -(rotObj - 1280 / 2.0) * Math.PI / 1280 / 2.0,
		binormal, matRotObj);
	var normal = rollerCoaster.obtenerDireccionNormal();
	mat4.rotate(matRotObj, (rotUp - 720 / 2.0) * Math.PI / 720 / 2.0, normal,
		matRotObj);
	mat4.multiplyVec3(matRotObj, direccion, direccion);
	vec3.add(posicion, direccion, objetivo);
	vec3.scale(binormal, 0.35);
	vec3.add(objetivo, binormal, objetivo);

	vec3.scale(binormal, 1.4);
	vec3.add(posicion, binormal, posicion);

	mat4.lookAt(posicion, objetivo, binormal, CameraMatrix);
	// var div = document.getElementById("posicion");
	// div.textContent = "posicion: (" + posicion[0] + ", " + posicion[1] + ", "
	// + posicion[2] + ")";
	gl.uniform3f(shaderProgram.cameraPositionUniform, posicion[0], posicion[1],
		posicion[2]);
}

function configCamaraFP() {
	firstPersonZ = 0.35;
	var fpEye = [ firstPersonX, firstPersonY, firstPersonZ ];
	var fpUp = [ 0.0, 0.0, 1.0 ];
	var fpForward = [ 1.0, 0.0, 0.0 ];
	var matRot = mat4.create();
	mat4.identity(matRot);
	mat4.rotate(matRot, firstPersonAngle, fpUp);
	mat4.rotate(matRot, -firstPersonAngleUp, [ 0.0, 1.0, 0.0 ]);
	mat4.multiplyVec3(matRot, fpForward, fpForward);
	vec3.add(fpForward, fpEye, fpForward);

	mat4.lookAt(fpEye, fpForward, fpUp, CameraMatrix);
	// mat4.lookAt(CameraMatrix,fpEye,fpForward,fpUp);
	// var div = document.getElementById("posicion");
	// div.textContent = "posicion: (" + firstPersonX + ", " + firstPersonY + ",
	// " + firstPersonZ + ") angle: " + firstPersonAngle + ", " +
	// firstPersonAngleUp;
	gl.uniform3f(shaderProgram.cameraPositionUniform, firstPersonX,
		firstPersonY, firstPersonZ);
}

function drawScene() {

	// Se configura el vierport dentro de área ¨canvas¨. en este caso se utiliza
	// toda
	// el área disponible
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

	// Se habilita el color de borrado para la pantalla (Color Buffer) y otros
	// buffers
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Se configura la matriz de proyección
	mat4.identity(pMatrix);
	mat4.perspective(30, gl.viewportWidth / gl.viewportHeight, 0.1, 200.0,
		pMatrix);

	// ///////////////////////////////////////////////////
	// Configuración de la luz
	// Se inicializan las variables asociadas con la Iluminación
	var lighting;
	lighting = true;
	gl.uniform1i(shaderProgram.useLightingUniform, lighting);
	gl.uniform1i(shaderProgram.useNormalMapUniform, false);
	gl.uniform1i(shaderProgram.useReflectionMapUniform, false);
	// var lightPosition = [0.0, 0.0, 0.0];
	// var lightPosition = [0,0,1000000000];
	var lightPosition = [ 727503182, 50135369, 142622255 ]; // donde esta el sol
	// en la textura
	// mat4.multiplyVec3(CameraMatrix, lightPosition);
	gl.uniform3fv(shaderProgram.lightingDirectionUniform, lightPosition); // uniform:
	// mismo
	// estado
	// para
	// todo
	// procesador

	model_matrix_roller = mat4.create();
	mat4.identity(model_matrix_roller);

	var posCarro = rollerCoaster.obtenerPosicionCarro();
	var dirCarro = rollerCoaster.obtenerDireccionCarro();

	mat4.scale(model_matrix_roller, [ 2.0, 2.0, 2.0 ], model_matrix_roller);

	if (cameraOrbital) {
		configCamaraOrbital();
	} else if (camaraCarro) {
		configCamaraCarro();
	} else if (cameraFirstPerson) {
		configCamaraFP();
	}

	setViewProjectionMatrix();

	var ra = 0.3;
	var ga = 0.3;
	var ba = 0.3;
	var rd = 1.0;
	var gd = 1.0;
	var bd = 1.0;
	var rs = 1.0;
	var gs = 1.0;
	var bs = 1.0;

	gl.uniform1f(shaderProgram.reflectionLevel, 0.5);

	// Dibujamos la montania rusa
	gl.uniform1i(shaderProgram.useNormalMapUniform, rollerCoaster.useNormalMap);
	gl.uniform1i(shaderProgram.useReflectionMapUniform,
		rollerCoaster.useReflectionMap);
	gl.uniform3f(shaderProgram.ambientColorUniform, ra, ga, ba);
	gl.uniform3f(shaderProgram.directionalColorUniform, rd, gd, bd);
	gl.uniform3f(shaderProgram.specularColorUniform, rs, gs, bs);

	rollerCoaster.draw(model_matrix_roller);

	gl.uniform1f(shaderProgram.reflectionLevel, 0.5);

	// Dibujamos la vuelta al mundo
	gl.uniform1i(shaderProgram.useNormalMapUniform, wheel.useNormalMap);
	gl.uniform1i(shaderProgram.useReflectionMapUniform, wheel.useReflectionMap);
	gl.uniform3f(shaderProgram.ambientColorUniform, ra, ga, ba);
	gl.uniform3f(shaderProgram.directionalColorUniform, rd, gd, bd);
	gl.uniform3f(shaderProgram.specularColorUniform, rs, gs, bs);

	var model_matrix_wheel = mat4.create();
	mat4.identity(model_matrix_wheel);
	mat4.translate(model_matrix_wheel, [ -15.0, -10.0, 3.0 ]);
	mat4.scale(model_matrix_wheel, [ 1.0, 1.0, -1.0 ]);
	wheel.draw(model_matrix_wheel);

	// Dibujamos la calesita
	gl.uniform1i(shaderProgram.useNormalMapUniform, carousel.useNormalMap);
	gl.uniform1i(shaderProgram.useReflectionMapUniform,
		carousel.useReflectionMap);
	gl.uniform3f(shaderProgram.ambientColorUniform, ra, ga, ba);
	gl.uniform3f(shaderProgram.directionalColorUniform, rd, gd, bd);
	gl.uniform3f(shaderProgram.specularColorUniform, rs, gs, bs);

	var model_matrix_carousel = mat4.create();
	mat4.identity(model_matrix_carousel);
	mat4.translate(model_matrix_carousel, [ -15.0, 0.0, 2.0 ]);
	mat4.scale(model_matrix_carousel, [ 0.5, 0.5, -0.5 ]);
	carousel.draw(model_matrix_carousel);

	// Dibujamos el piso
	gl.uniform1i(shaderProgram.useNormalMapUniform, piso.useNormalMap);
	gl.uniform1i(shaderProgram.useReflectionMapUniform, piso.useReflectionMap);
	var m = mat4.create();
	mat4.identity(m);
	piso.draw(m);

	// Dibujamos el lago
	gl.uniform1i(shaderProgram.useNormalMapUniform, lago.useNormalMap());
	gl
		.uniform1i(shaderProgram.useReflectionMapUniform, lago
			.useReflectionMap());
	mat4.translate(m, [ 12.4, -5.0, 0.0 ], m);
	mat4.scale(m, [ 2.2, 2.5, 1.0 ], m);
	mat4.rotate(m, -0.3, [ 0.0, 0.0, 1.0 ], m);
	lago.draw(m);

	// Dibujamos el cielo
	gl.uniform1i(shaderProgram.useNormalMapUniform, cielo.useNormalMap);
	gl.uniform1i(shaderProgram.useReflectionMapUniform, cielo.useReflectionMap);
	mat4.identity(m);
	mat4.rotate(m, Math.PI / 2, [ 1.0, 0.0, 0.0 ]);
	mat4.scale(m, [ skyRad, skyRad, skyRad ]);
	gl.uniform3f(shaderProgram.ambientColorUniform, 1.0, 1.0, 1.0);
	gl.uniform3f(shaderProgram.directionalColorUniform, 1.0, 1.0, 1.0);
	gl.uniform3f(shaderProgram.specularColorUniform, rs, gs, bs);
	cielo.draw(m);
}

function tick() {
	requestAnimFrame(tick);
	if (cameraFirstPerson) {
		// Se hacen estas cuentas en el tick para que el movimiento sea suave
		if (mx < 300) {
			firstPersonAngle += 0.002;
		}
		if (mx < 100) {
			firstPersonAngle += 0.02;
		}
		if (mx > 1000) {
			firstPersonAngle -= 0.002;
		}
		if (mx > 1200) {
			firstPersonAngle -= 0.02;
		}
		if (my < 250) {
			firstPersonAngleUp += 0.01;
		}
		if (my > 650) {
			firstPersonAngleUp -= 0.01;
		}
		if (keyRotateLeftPressed) {
			firstPersonAngle += 0.02;
		}
		if (keyRotateRightPressed) {
			firstPersonAngle -= 0.02;
		}
		if (keyMoveForwardPressed) {
			firstPersonX += fpSpeed * Math.cos(firstPersonAngle);
			firstPersonY += fpSpeed * Math.sin(firstPersonAngle);
		}
		if (keyMoveBackwardPressed) {
			firstPersonX -= fpSpeed * Math.cos(firstPersonAngle);
			firstPersonY -= fpSpeed * Math.sin(firstPersonAngle);
		}
		if (keyMoveLeftPressed) {
			firstPersonX += fpSpeed
			* Math.cos(firstPersonAngle + Math.PI / 2.0);
			firstPersonY += fpSpeed
			* Math.sin(firstPersonAngle + Math.PI / 2.0);
		}
		if (keyMoveRightPressed) {
			firstPersonX += fpSpeed
			* Math.cos(firstPersonAngle - Math.PI / 2.0);
			firstPersonY += fpSpeed
			* Math.sin(firstPersonAngle - Math.PI / 2.0);
		}
	}
	drawScene();
}

rotObj = 0.0;
rotUp = 0.0;
function webGLStart() {
	var canvas = document.getElementById("canvas tp");
	initGL(canvas);
	initShaders();
	camaraDir = new Cilindro(0.1, 2.0, 10);
	camaraUp = new Cilindro(0.1, 2.0, 10);
	rollerCoaster = new RollerCoaster();
	rollerCoaster.initReflectionMap("sky3.jpg");
	wheel = new FairWheel();
	wheel.initReflectionMap("sky3.jpg");
	carousel = new Carousel();
	piso = new Piso();
	piso.initTexture("grass-0.png");
	piso.initNormalMap("grass-1.png");
	lago = new Lago();
	lago.initNormalMap("watern.png");
	lago.initReflectionMap("sky3.jpg");

	cielo = new Sphere(30, 30);
	cielo.initTexture("sky3.jpg");
	gl.clearColor(0.44, 0.81, 0.96, 1.0);
	gl.enable(gl.DEPTH_TEST);

	tick();
}
skyRad = 80;
cameraRad = 50.0;
cameraPos = [ 0.0, cameraRad, 0.0 ];
cameraUp = [ 0.0, 0.0, 1.0 ];
cameraTarget = [ 0.0, 0.0, 0.0 ];
var lastpos = [ 0.0, 0.0 ];
var mx;
var my;
var mouseIsDown = false;
phi = Math.PI * 0.35;
theta = Math.PI * 1.25;
function mouseMove(event) {
	mx = event.clientX;
	my = event.clientY;
	if (mouseIsDown && cameraOrbital) {
		phi += -(my - lastpos[1]) * 0.005;
		theta += -(mx - lastpos[0]) * 0.005;
		if (phi > Math.PI * 0.499)
			phi = Math.PI * 0.499;
		if (phi < Math.PI * 0.001)
			phi = Math.PI * 0.001;
	}
	if (camaraCarro) {
		rotUp = my;
		rotObj = mx;
	}
	lastpos[0] = mx;
	lastpos[1] = my;
}
function mouseDown(event) {
	mouseIsDown = true;
}
function mouseUp(event) {
	mouseIsDown = false;
}
function mouseWheel(event) {
	if (cameraOrbital) {
		if (event.deltaY > 0)
			scale = 1.1;
		else
			scale = 0.9;
		if (cameraRad * scale < skyRad && cameraRad * scale > 5.0) {
			vec3.scale(cameraPos, scale);
			cameraRad = vec3.length(cameraPos);
		}
	}
}