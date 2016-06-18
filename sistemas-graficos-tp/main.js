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
	}

	return shader;
}


var shaderProgram;


function initShaders() {
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

	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
	gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

	shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
	gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.ViewMatrixUniform = gl.getUniformLocation(shaderProgram, "uViewMatrix");
	shaderProgram.ModelMatrixUniform = gl.getUniformLocation(shaderProgram, "uModelMatrix");
	shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
	shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
	shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
	shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
	shaderProgram.lightingDirectionUniform = gl.getUniformLocation(shaderProgram, "uLightPosition");
	shaderProgram.directionalColorUniform = gl.getUniformLocation(shaderProgram, "uDirectionalColor");
}

var CameraMatrix = mat4.create();
var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();

var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;

var deimos = null;
var tierra = null;
var phobos = null;

var deimosRotationMatrix = mat4.create();
mat4.identity(deimosRotationMatrix);

var deimosRotationAngletierra = 0.0;
var phobosRotationAngledeimos = 0.0;

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
function setViewProjectionMatrix(CameraMatrix, pMatrix) {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	gl.uniformMatrix4fv(shaderProgram.ViewMatrixUniform, false, CameraMatrix);
}

function degToRad(degrees) {
	return degrees * Math.PI / 180;
}

function drawScene() {

	var DISTANCIA_ESTACION_MARTE = [0,-120,0];
	var DISTANCIA_ESTACION_SOL = [150,0,0];

	// Se configura el vierport dentro de área ¨canvas¨. en este caso se utiliza toda
	// el área disponible
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

	// Se habilita el color de borrado para la pantalla (Color Buffer) y otros buffers
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Se configura la matriz de proyección
	mat4.perspective(pMatrix, 3.14/12.0, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0);

	/////////////////////////////////////////////////////
	// Configuración de la luz
	// Se inicializan las variables asociadas con la Iluminación
	var lighting;
	lighting = true;
	gl.uniform1i(shaderProgram.useLightingUniform, lighting);
	var lightPosition = vec3.fromValues(-100.0, 0.0, -60.0);
	//vec3.transformMat4(lightPosition, lightPosition, CameraMatrix);
	gl.uniform3fv(shaderProgram.lightingDirectionUniform, lightPosition);

	// Configuramos la iluminación para el Sol
	gl.uniform3f(shaderProgram.ambientColorUniform, 0.3, 0.3, 0.3 );
	gl.uniform3f(shaderProgram.directionalColorUniform, 0.05, 0.05, 0.05);

	// Matriz de modelado del tierra
	var model_matrix_tierra = mat4.create();
	mat4.identity(model_matrix_tierra);
	mat4.translate(model_matrix_tierra, model_matrix_tierra, DISTANCIA_ESTACION_MARTE);
	mat4.scale(model_matrix_tierra, model_matrix_tierra, [100.0, 100.0, 100.0]);
	tierra.draw(model_matrix_tierra);
	
	// Matriz de modelado del sol
	var model_matrix_sol = mat4.create();
	mat4.identity(model_matrix_sol);
	mat4.rotate(model_matrix_sol, model_matrix_sol, deimosRotationAngletierra, [0, 1, 0]);
	mat4.translate(model_matrix_sol, model_matrix_sol, DISTANCIA_ESTACION_SOL);
	mat4.scale(model_matrix_sol, model_matrix_sol, [5.0, 5.0, 5.0]);
	sun.draw(model_matrix_sol);
	
	// Definimos las matrices de modelado de la estación
	var model_space_station_matrix = mat4.create();
	mat4.identity(model_space_station_matrix);
	mat4.rotate(model_space_station_matrix, model_space_station_matrix, deimosRotationAngletierra, [0, 1, 0]);

	var cilindro_matrix = mat4.create();
	mat4.identity(cilindro_matrix);
	mat4.rotate(cilindro_matrix, cilindro_matrix, deimosRotationAngletierra, [0, 1, 0]);

	// Dibujamos la Nave, la Estación y el Universo
	estacion.draw(model_space_station_matrix);
	nave.draw(mat4.create());
	universo.draw(mat4.create());

	// Definimos la ubicación de la camara
	camera.update(CameraMatrix,deimosRotationAngletierra);
	setViewProjectionMatrix(CameraMatrix,pMatrix);
}


function tick() {
	requestAnimFrame(tick);
	var newRotationMatrix = mat4.create();
	mat4.identity(newRotationMatrix);
	mat4.rotate(newRotationMatrix, newRotationMatrix, 0.025, [0, 1, 0]);
	mat4.multiply(newRotationMatrix, deimosRotationMatrix, deimosRotationMatrix);

	deimosRotationAngletierra += 0.0045;
	phobosRotationAngledeimos += 0.0005;
	drawScene();
}


function webGLStart() {
	var canvas = document.getElementById("tp-canvas");
	initGL(canvas);
	initShaders();
	
	sun = new TexturedSphere(32,32);
	sun.initBuffers();
	sun.initTexture("textures/sun.jpg");

	tierra = new TexturedSphere(64,64);
	tierra.initBuffers();
	tierra.initTexture("textures/earth.jpg");

	universo = new Background();
	estacion = new SpaceStation();
	nave = new Nave();

	camera = new Camera(nave);

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);

	tick();
}
