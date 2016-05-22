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
var mars = null;
var phobos = null;

var deimosRotationMatrix = mat4.create();
mat4.identity(deimosRotationMatrix);

var deimosRotationAnglemars = 0.0;
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

	/////////////////////////////////////////////////////
	// Definimos la ubicación de la camara
	// Pensamos por el momento marsamente la posición de la cámara, la cual siempre mira al mars.

	camera.update(CameraMatrix);
	setViewProjectionMatrix(CameraMatrix,pMatrix);

	///////////////////////////////////////////////////////
	//
	// Dibujamos la Tierra

	// Configuramos la iluminación para la Tierra
	gl.uniform3f(shaderProgram.ambientColorUniform, 0.2, 0.2, 0.2 );
	gl.uniform3f(shaderProgram.directionalColorUniform, 0.05, 0.05, 0.05);

	// Matriz de modelado de la Tierra
	var model_matrix_deimos = mat4.create();
	mat4.identity(model_matrix_deimos)        ;
	var translate_deimos = mat4.create();
	mat4.identity(translate_deimos);
	mat4.translate(translate_deimos, translate_deimos, [10, 0, 0 ]);

	// Matriz de rotación del eje sobre el plano de la eclíptica a 23 grados
	var axis_inclination_matrix = mat4.create();
	mat4.identity(axis_inclination_matrix);
	mat4.rotate(axis_inclination_matrix, axis_inclination_matrix, -0.4014, [0, 0, 1]);

	var translation_movement = mat4.create();
	var inverse_translation_movement = mat4.create();

	mat4.identity(translation_movement);
	mat4.identity(inverse_translation_movement);

	mat4.rotate(translation_movement, translation_movement, deimosRotationAnglemars, [0, 1, 0]);
	mat4.rotate(inverse_translation_movement, inverse_translation_movement, -deimosRotationAnglemars, [0, 1, 0]);

	// Las transformaciones aplicadas a la Tierra son:
	// (el órden es el inverso al de las llamadas a la función multiply)
	//
	// 1. Se aplica el movimiento de rotación de la Tierra
	// 2. Se inclina el eje de rotación 23 grados
	// 3. Se aplica la inversa del ángulo de rotación del movimiento alrededor del Sol
	//    con el fin de luego compensar dicha rotación y mantener el Eje de la Tierra siempre
	//    en la misma orientación
	// 4. A partir de acá se aplican las dos transformaciones que son comunes con la Tierra
	//          4.1 La traslación para poner al sistema Tierra-Luna en orbita alrededor del Sol
	//          4.2 La rotación para poner al sistema Tierra-Luna a girar en torno al Sol.
	mat4.multiply(model_matrix_deimos, model_matrix_deimos, translation_movement);
	mat4.multiply(model_matrix_deimos, model_matrix_deimos, translate_deimos);
	mat4.multiply(model_matrix_deimos, model_matrix_deimos, inverse_translation_movement);
	mat4.multiply(model_matrix_deimos, model_matrix_deimos, axis_inclination_matrix);
	mat4.multiply(model_matrix_deimos, model_matrix_deimos, deimosRotationMatrix);

	var scale_deimos_matrix = mat4.create();
	mat4.identity(scale_deimos_matrix);
	mat4.scale(scale_deimos_matrix, scale_deimos_matrix, [1.8, 1.8, 1.8]);

	mat4.multiply(model_matrix_deimos, model_matrix_deimos, scale_deimos_matrix);

	deimos.draw(model_matrix_deimos);
	//
	////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////
	//
	// Dibujamos la Luna

	// Configuramos la iluminación para la Luna
	gl.uniform3f(shaderProgram.ambientColorUniform, 0.3, 0.3, 0.3 );
	gl.uniform3f(shaderProgram.directionalColorUniform, 0.1, 0.1, 0.1);

	// Matriz de modelado de la Luna, respecto de la Tierra
	var model_matrix_phobos = mat4.create();
	mat4.identity(model_matrix_phobos);

	// Traslación de la Luna respecto de la Tierra
	// Es la traslación que la pone en órbita
	var phobos_transalte_from_deimos_matrix = mat4.create();
	mat4.identity(phobos_transalte_from_deimos_matrix);
	mat4.translate(phobos_transalte_from_deimos_matrix, phobos_transalte_from_deimos_matrix, [25, 0,0]);

	// Matríz de rotación de la Luna respecto de la tierra.
	// Como la luna tiene un periodo de rotación sobre su eje que coincide
	// con el de rotación alrededor de la Tierra, usamos la misma matríz
	// para ambos movimientos.
	var phobos_rotation_matrix = mat4.create();
	mat4.identity(phobos_rotation_matrix);
	mat4.rotate(phobos_rotation_matrix, phobos_rotation_matrix, phobosRotationAngledeimos, [0, 1 , 0]);

	// Secuencia de transformaciones
	// A la luna se le aplican las siguientes transformaciones:
	// (el órden es el inverso al de las llamadas a la función multiply)
	//
	// 1. Se aplica una rotación sobre el propio eje de la Luna
	// 2. Se aplica una traslación que representa la distancia entre la Tierra y la Luna
	// 3. Se aplica una rotación para hacer rotar la Luna alrededor de la Tierra
	// 4. A partir de acá se aplican las dos transformaciones que son comunes con la Tierra
	//          4.1 La traslación para poner al sistema Tierra-Luna en orbita alrededor del Sol
	//          4.2 La rotación para poner al sistema Tierra-Luna a girar en torno al Sol.
	//mat4.multiply(model_matrix_phobos, model_matrix_phobos, translation_movement);
	//mat4.multiply(model_matrix_phobos, model_matrix_phobos, translate_deimos);
	mat4.multiply(model_matrix_phobos, model_matrix_phobos, phobos_rotation_matrix);
	mat4.multiply(model_matrix_phobos, model_matrix_phobos, phobos_transalte_from_deimos_matrix);
	mat4.multiply(model_matrix_phobos, model_matrix_phobos, phobos_rotation_matrix);

	var scale_phobos_matrix = mat4.create();
	mat4.identity(scale_phobos_matrix);
	mat4.scale(scale_phobos_matrix, scale_phobos_matrix, [1.0, 0.84, 0.7]);

	mat4.multiply(model_matrix_phobos, model_matrix_phobos, scale_phobos_matrix);


	phobos.draw(model_matrix_phobos);

	////////////////////////////////////////////////////////
	//
	// Dibujamos al mars

	// Configuramos la iluminación para el Sol
	gl.uniform3f(shaderProgram.ambientColorUniform, 0.3, 0.3, 0.3 );
	gl.uniform3f(shaderProgram.directionalColorUniform, 0.05, 0.05, 0.05);

	// Matriz de modelado del mars
	var model_matrix_mars = mat4.create();
	mat4.identity(model_matrix_mars);
	mat4.scale(model_matrix_mars, model_matrix_mars, [7.0, 7.0, 7.0]);

	mars.draw(model_matrix_mars);
	//


	////////////////////////////////////////////////////////
	//agregado por mi

	// Matriz de modelado del mars

	var space_translation_matrix = mat4.create();
	mat4.identity(space_translation_matrix);
	mat4.translate(space_translation_matrix, space_translation_matrix, [0, 3,-7]);

	var model_space_station_matrix = mat4.create();
	mat4.identity(model_space_station_matrix);
	mat4.scale(model_space_station_matrix, model_space_station_matrix, [2.0, 2.0, 2.0]);

	mat4.multiply(model_space_station_matrix, model_space_station_matrix, space_translation_matrix);
	mat4.rotate(model_space_station_matrix, model_space_station_matrix, deimosRotationAnglemars, [0, 1, 0]);

	estacion.draw(model_space_station_matrix);
	nave.draw(model_space_station_matrix);

}


function tick() {
	requestAnimFrame(tick);
	var newRotationMatrix = mat4.create();
	mat4.identity(newRotationMatrix);
	mat4.rotate(newRotationMatrix, newRotationMatrix, 0.025, [0, 1, 0]);
	mat4.multiply(newRotationMatrix, deimosRotationMatrix, deimosRotationMatrix);

	deimosRotationAnglemars += 0.0045;
	phobosRotationAngledeimos += 0.0005;
	drawScene();
}


function webGLStart() {
	var canvas = document.getElementById("tp-canvas");
	initGL(canvas);
	initShaders();

	deimos = new TexturedSphere(64, 64);
	deimos.initBuffers();
	deimos.initTexture("textures/moon.gif");

	mars = new TexturedSphere(64,64);
	mars.initBuffers();
	mars.initTexture("textures/mars_1k_color.jpg");

	phobos = new TexturedSphere(64, 64);
	phobos.initBuffers();
	phobos.initTexture("textures/moon.gif");

	estacion = new SpaceStation();
	nave = new Nave();

	camera = new Camera(estacion);


	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);

	tick();
}
