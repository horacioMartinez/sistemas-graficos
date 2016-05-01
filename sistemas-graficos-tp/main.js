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


function handleLoadedTexture() {
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.bindTexture(gl.TEXTURE_2D, mars.texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mars.texture.image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);

	gl.bindTexture(gl.TEXTURE_2D, null);

	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.bindTexture(gl.TEXTURE_2D, deimos.texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, deimos.texture.image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);

	gl.bindTexture(gl.TEXTURE_2D, null);

	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.bindTexture(gl.TEXTURE_2D, phobos.texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, phobos.texture.image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);

	gl.bindTexture(gl.TEXTURE_2D, null);


	// agregado por mi:
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.bindTexture(gl.TEXTURE_2D, estacion.texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, estacion.texture.image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);

	gl.bindTexture(gl.TEXTURE_2D, null);
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

function setViewProjectionMatrix() {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	gl.uniformMatrix4fv(shaderProgram.ViewMatrixUniform, false, CameraMatrix);
}


function degToRad(degrees) {
	return degrees * Math.PI / 180;
}


function TexturedSphere(latitude_bands, longitude_bands){

	this.latitudeBands = latitude_bands;
	this.longitudeBands = longitude_bands;

	this.position_buffer = null;
	this.normal_buffer = null;
	this.texture_coord_buffer = null;
	this.index_buffer = null;

	this.webgl_position_buffer = null;
	this.webgl_normal_buffer = null;
	this.webgl_texture_coord_buffer = null;
	this.webgl_index_buffer = null;

	this.texture = null;

	this.initTexture = function(texture_file){

		var aux_texture = gl.createTexture();
		this.texture = aux_texture;
		this.texture.image = new Image();

		this.texture.image.onload = function () {
			handleLoadedTexture()
		}
		this.texture.image.src = texture_file;
	}


	// Se generan los vertices para la esfera, calculando los datos para una esfera de radio 1
	// Y también la información de las normales y coordenadas de textura para cada vertice de la esfera
	// La esfera se renderizara utilizando triangulos, para ello se arma un buffer de índices
	// a todos los triángulos de la esfera
	this.initBuffers = function(){

		this.position_buffer = [];
		this.normal_buffer = [];
		this.texture_coord_buffer = [];

		var latNumber;
		var longNumber;

		for (latNumber=0; latNumber <= this.latitudeBands; latNumber++) {
			var theta = latNumber * Math.PI / this.latitudeBands;
			var sinTheta = Math.sin(theta);
			var cosTheta = Math.cos(theta);

			for (longNumber=0; longNumber <= this.longitudeBands; longNumber++) {
				var phi = longNumber * 2 * Math.PI / this.longitudeBands;
				var sinPhi = Math.sin(phi);
				var cosPhi = Math.cos(phi);

				var x = cosPhi * sinTheta;
				var y = cosTheta;
				var z = sinPhi * sinTheta;
				var u = 1.0 - (longNumber / this.longitudeBands);
				var v = 1.0 - (latNumber / this.latitudeBands);

				this.normal_buffer.push(x);
				this.normal_buffer.push(y);
				this.normal_buffer.push(z);

				this.texture_coord_buffer.push(u);
				this.texture_coord_buffer.push(v);

				this.position_buffer.push(x);
				this.position_buffer.push(y);
				this.position_buffer.push(z);
			}
		}

		// Buffer de indices de los triangulos
		this.index_buffer = [];

		for (latNumber=0; latNumber < this.latitudeBands; latNumber++) {
			for (longNumber=0; longNumber < this.longitudeBands; longNumber++) {
				var first = (latNumber * (this.longitudeBands + 1)) + longNumber;
				var second = first + this.longitudeBands + 1;
				this.index_buffer.push(first);
				this.index_buffer.push(second);
				this.index_buffer.push(first + 1);

				this.index_buffer.push(second);
				this.index_buffer.push(second + 1);
				this.index_buffer.push(first + 1);
			}
		}

		// Creación e Inicialización de los buffers a nivel de OpenGL
		this.webgl_normal_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);
		this.webgl_normal_buffer.itemSize = 3;
		this.webgl_normal_buffer.numItems = this.normal_buffer.length / 3;

		this.webgl_texture_coord_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coord_buffer), gl.STATIC_DRAW);
		this.webgl_texture_coord_buffer.itemSize = 2;
		this.webgl_texture_coord_buffer.numItems = this.texture_coord_buffer.length / 2;

		this.webgl_position_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
		this.webgl_position_buffer.itemSize = 3;
		this.webgl_position_buffer.numItems = this.position_buffer.length / 3;

		this.webgl_index_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
		this.webgl_index_buffer.itemSize = 1;
		this.webgl_index_buffer.numItems = this.index_buffer.length;
	}

	this.draw = function(modelMatrix){

		// Se configuran los buffers que alimentarán el pipeline
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
		gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.webgl_texture_coord_buffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
		gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.uniform1i(shaderProgram.samplerUniform, 0);

		gl.uniformMatrix4fv(shaderProgram.ModelMatrixUniform, false, modelMatrix);
		var normalMatrix = mat3.create();
		mat3.fromMat4(normalMatrix, modelMatrix);
		mat3.invert(normalMatrix, normalMatrix);
		mat3.transpose(normalMatrix, normalMatrix);
		gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);

		gl.bindTexture(gl.TEXTURE_2D, this.texture);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
		//gl.drawElements(gl.LINE_LOOP, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
		gl.drawElements(gl.TRIANGLES, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
		/////////////////////////////////
	}

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
	var matriz_camara = mat4.create();
	mat4.identity(matriz_camara);
	//mat4.identity(CameraMatrix);
	//mat4.translate(CameraMatrix, CameraMatrix, [0, 0, -60]);
	var eye_point = vec3.create();
	vec3.set(eye_point, 30, 65, -90);
	var at_point = vec3.create();
	vec3.set(at_point, 0, 0, 0);
	var up_point = vec3.create();
	vec3.set(up_point, 0, 1, 0);

	mat4.lookAt(CameraMatrix, eye_point, at_point, up_point);
	mat4.multiply(CameraMatrix, CameraMatrix, matriz_camara);

	setViewProjectionMatrix();

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

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);

	tick();
}


///* Variables */
//var gl = null;
//var glProgram = null;
//var fragmentShader = null;
//var vertexShader = null;
//var t = 0.0;
//var my_grid = null;
//
//var mvMatrix = mat4.create();
//var pMatrix = mat4.create();
//
//
///* Funcion de inicio de WebGL. CAMBIA SOLO LA CREACION DE LAS CLASES Y LA CAMARA */
//function initWebGL() {
//	var canvas = document.getElementById("tp-canvas");
//	initGL(canvas);										// Iniciamos el Canvas
//	setupWebGL(canvas);									// Creamos el ViewPort y establecemos el color de borrado de la pantalla
//	initShaders();										// Inicializamos los Shaders
//
//	my_grid = new UniformPlaneGrid(5,5);				// Creamos la cámara y los objetos de la escena.
//	cilindro = new Cilindro(5,4);
//	esfera = new Esfera(10,10);
//
//	spaceStation = new SpaceStation();					// LE PUSE ESTACION ESPACIAL PARA YA TENER DEFINIDOS LOS OBJETOS NOMAS...
//	spaceStationCenter = new SpaceStationCenter();		// HAY UNA HERENCIA DE ESTAS A SUP DE BARRIDO Y REVOLUCION
//
//	spaceStationCabin = new SpaceStationCabin();
//
//	tick();												// Tick. Luego Dibujamos la escena
//	setInterval(drawScene, 10);
//}
//
///* Inicializamos el canvas. NO CAMBIA */
//function initGL(canvas) {
//	try{
//		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
//		gl.viewportWidth = canvas.width;
//		gl.viewportHeight = canvas.height;
//	}catch(e){
//	}
//
//	if (!gl) {
//		alert("Could not initialise WebGL, sorry :-(");
//	}
//}
//
///* Tick. CAMBIA */
//function tick() {
//	requestAnimFrame(tick);
//	//.......
//	drawScene();
//
//}
//
///* Dibujamos la escena. CAMBIA */
//function drawScene() {
//	// Se configura el vierport dentro de área ¨canvas¨. en este caso se utiliza toda el área disponible
//	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
//
//	// Se habilita el color de borrado para la pantalla (Color Buffer) y otros buffers
//	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//
//	var u_proj_matrix = gl.getUniformLocation(glProgram, "uPMatrix");
//	// Preparamos una matriz de perspectiva.
//	mat4.perspective(pMatrix, 45, 640.0/480.0, 0.1, 100.0);
//	gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);
//
//	var u_model_view_matrix = gl.getUniformLocation(glProgram, "uMVMatrix");
//	// Preparamos una matriz de modelo+vista.
//	mat4.identity(mvMatrix);
//	mat4.translate(mvMatrix, mvMatrix, [0.0, 0.0, -5.0]);
//	mat4.rotate(mvMatrix, mvMatrix, t, [0.0, 1.0, 0.0]);
//	t = t + 0.01;
//
//	gl.uniformMatrix4fv(u_model_view_matrix, false, mvMatrix);
//
//	//my_grid.drawVertexGrid();
//	//cilindro.drawVertexGrid();
//	//esfera.drawVertexGrid();
//	spaceStation.drawVertexGrid();
//	//spaceStationCenter.drawVertexGrid();
//	//spaceStationCabin.drawVertexGrid();
//}
//
//
///* Configuracion de webGL. NO CAMBIA */
//function setupWebGL() {
//	gl.clearColor(0.1, 0.1, 0.2, 1.0);  				// Seteamos el color de borrado
//	gl.enable(gl.DEPTH_TEST);
//	gl.depthFunc(gl.LEQUAL);
//}
//
//
///* Inicializamos los Shaders. NO CAMBIA POR AHORA */
//function initShaders() {
//	// Obtenemos los shaders ya compilados
//	var fragmentShader = getShader(gl, "shader-fs");
//	var vertexShader = getShader(gl, "shader-vs");
//
//	// Creamos un programa de shaders de WebGL.
//	glProgram = gl.createProgram();
//
//	// Asociamos cada shader compilado al programa.
//	gl.attachShader(glProgram, vertexShader);
//	gl.attachShader(glProgram, fragmentShader);
//
//	// Linkeamos los shaders para generar el programa ejecutable.
//	gl.linkProgram(glProgram);
//
//	// Chequeamos y reportamos si hubo algún error.
//	if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
//	  alert("Unable to initialize the shader program: " +
//			gl.getProgramInfoLog(glProgram));
//	  return null;
//	}
//
//	// Le decimos a WebGL que de aquí en adelante use el programa generado.
//	gl.useProgram(glProgram);
//}
//
///* Obtenemos los shaders. NO CAMBIA POR AHORA */
//function getShader(gl, id) {
//	var shaderScript, src, currentChild, shader;
//
//	// Obtenemos el elemento <script> que contiene el código fuente del shader.
//	shaderScript = document.getElementById(id);
//	if (!shaderScript) {
//		return null;
//	}
//
//	// Extraemos el contenido de texto del <script>.
//	src = "";
//	currentChild = shaderScript.firstChild;
//	while(currentChild) {
//		if (currentChild.nodeType == currentChild.TEXT_NODE) {
//			src += currentChild.textContent;
//		}
//		currentChild = currentChild.nextSibling;
//	}
//
//	// Creamos un shader WebGL según el atributo type del <script>.
//	if (shaderScript.type == "x-shader/x-fragment") {
//		shader = gl.createShader(gl.FRAGMENT_SHADER);
//	} else if (shaderScript.type == "x-shader/x-vertex") {
//		shader = gl.createShader(gl.VERTEX_SHADER);
//	} else {
//		return null;
//	}
//
//	// Le decimos a WebGL que vamos a usar el texto como fuente para el shader.
//	gl.shaderSource(shader, src);
//
//	// Compilamos el shader.
//	gl.compileShader(shader);
//
//	// Chequeamos y reportamos si hubo algún error.
//	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//	  alert("An error occurred compiling the shaders: " +
//			gl.getShaderInfoLog(shader));
//	  return null;
//	}
//
//	return shader;
//}