/* Variables */
var gl = null;
var glProgram = null;
var fragmentShader = null;
var vertexShader = null;
var t = 0.0;
var my_grid = null;

var mvMatrix = mat4.create();
var pMatrix = mat4.create();


/* Funcion de inicio de WebGL. CAMBIA SOLO LA CREACION DE LAS CLASES Y LA CAMARA */
function initWebGL() {
	var canvas = document.getElementById("tp-canvas");  
	initGL(canvas);										// Iniciamos el Canvas
	setupWebGL(canvas);									// Creamos el ViewPort y establecemos el color de borrado de la pantalla
	initShaders();										// Inicializamos los Shaders
	
	//new...											// Creamos la cámara y los objetos de la escena.		
	tick();											// Tick. Luego Dibujamos la escena
	setInterval(drawScene, 10);  
}

/* Inicializamos el canvas. NO CAMBIA */
function initGL(canvas) {
	try{
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl"); 
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;                   
	}catch(e){
	}
	
	if (!gl) {
		alert("Could not initialise WebGL, sorry :-(");
	}
}

/* Tick. CAMBIA */
function tick() {
	requestAnimFrame(tick);
	//.......
	drawScene();
	
}

/* Dibujamos la escena. CAMBIA */
function drawScene() {
	// Se configura el vierport dentro de área ¨canvas¨. en este caso se utiliza toda el área disponible
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

	// Se habilita el color de borrado para la pantalla (Color Buffer) y otros buffers
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	setupBuffers();
	var u_proj_matrix = gl.getUniformLocation(glProgram, "uPMatrix");
	// Preparamos una matriz de perspectiva.
	mat4.perspective(pMatrix, 45, 640.0/480.0, 0.1, 100.0);
	gl.uniformMatrix4fv(u_proj_matrix, false, pMatrix);

	var u_model_view_matrix = gl.getUniformLocation(glProgram, "uMVMatrix");
	// Preparamos una matriz de modelo+vista.
	mat4.identity(mvMatrix);
	mat4.translate(mvMatrix, mvMatrix, [0.0, 0.0, -5.0]);
	mat4.rotate(mvMatrix, mvMatrix, t, [0.0, 1.0, 0.0]);
	t = t + 0.01;

	gl.uniformMatrix4fv(u_model_view_matrix, false, mvMatrix);

	my_grid.drawVertexGrid();
}


/* Configuracion de webGL. NO CAMBIA */
function setupWebGL() {
	gl.clearColor(0.1, 0.1, 0.2, 1.0);  				// Seteamos el color de borrado
	gl.enable(gl.DEPTH_TEST);                              
	gl.depthFunc(gl.LEQUAL); 
}
   
   
/* Inicializamos los Shaders. NO CAMBIA POR AHORA */         
function initShaders() {
	// Obtenemos los shaders ya compilados
	var fragmentShader = getShader(gl, "shader-fs");
	var vertexShader = getShader(gl, "shader-vs");

	// Creamos un programa de shaders de WebGL.
	glProgram = gl.createProgram();

	// Asociamos cada shader compilado al programa.
	gl.attachShader(glProgram, vertexShader);
	gl.attachShader(glProgram, fragmentShader);

	// Linkeamos los shaders para generar el programa ejecutable.
	gl.linkProgram(glProgram);

	// Chequeamos y reportamos si hubo algún error.
	if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
	  alert("Unable to initialize the shader program: " + 
			gl.getProgramInfoLog(glProgram));
	  return null;
	}

	// Le decimos a WebGL que de aquí en adelante use el programa generado.
	gl.useProgram(glProgram);
}       

/* Obtenemos los shaders. NO CAMBIA POR AHORA */    
function getShader(gl, id) {
	var shaderScript, src, currentChild, shader;

	// Obtenemos el elemento <script> que contiene el código fuente del shader.
	shaderScript = document.getElementById(id);
	if (!shaderScript) {
		return null;
	}

	// Extraemos el contenido de texto del <script>.
	src = "";
	currentChild = shaderScript.firstChild;
	while(currentChild) {
		if (currentChild.nodeType == currentChild.TEXT_NODE) {
			src += currentChild.textContent;
		}
		currentChild = currentChild.nextSibling;
	}

	// Creamos un shader WebGL según el atributo type del <script>.
	if (shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		return null;
	}

	// Le decimos a WebGL que vamos a usar el texto como fuente para el shader.
	gl.shaderSource(shader, src);

	// Compilamos el shader.
	gl.compileShader(shader);  
	  
	// Chequeamos y reportamos si hubo algún error.
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
	  alert("An error occurred compiling the shaders: " + 
			gl.getShaderInfoLog(shader));  
	  return null;  
	}
	  
	return shader;
}






//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function makeShader(src, type) {
	//compile the vertex shader
	var shader = gl.createShader(type);
	gl.shaderSource(shader, src);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
	}
	return shader;
}

function setupBuffers() {
	my_grid = new VertexGrid(5,5);
	my_grid.createUniformPlaneGrid();
	my_grid.createIndexBuffer();
	my_grid.setupWebGLBuffers();
}




var cant_vertices = 0;

// OBJETO VERTEX-GRID
// Definimos un constructor para el objeto VertexGrid
function VertexGrid (_rows, _cols) {
	this.cols = _cols;
	this.rows = _rows;
	this.index_buffer = null;

	this.position_buffer = null;
	this.color_buffer = null;

	this.webgl_position_buffer = null;
	this.webgl_color_buffer = null;
	this.webgl_index_buffer = null;

	this.createIndexBuffer = function(){

	var buffer_aux = [];
	var i = 0;
	var j = 0;
	
	for (j = 0; j < _rows - 2; j++) {
		for (i = 0; i < _cols; i++) {
			buffer_aux.push(i + _cols*j);
			buffer_aux.push(i + _cols*(j+1));
		}
		buffer_aux.push(i + _cols*(j+1) - 1);	//Repito los puntos para unir las filas de la matriz
		buffer_aux.push(_cols*(j+1));					
	}
	
	for (i = 0; i < _cols; i++) {			//En la última iteracion no uno las filas
		buffer_aux.push(i + _cols*j);
		buffer_aux.push(i + _cols*(j+1));
	}

		this.index_buffer = buffer_aux;
		cant_vertices = buffer_aux.length;
	}

	// Esta función inicializa el position_buffer y el color buffer de forma de 
	// crear un plano de color gris que se extiende sobre el plano XY, con Z=0
	// El plano se genera centrado en el origen.
	// El propósito de esta función es a modo de ejemplo de como inicializar y cargar
	// los buffers de las posiciones y el color para cada vértice.
	this.createUniformPlaneGrid = function(){

		this.position_buffer = [];
		this.color_buffer = [];

		for (var i = 0.0; i < this.rows; i++) { 
		   for (var j = 0.0; j < this.cols; j++) {

			   // Para cada vértice definimos su posición
			   // como coordenada (x, y, z=0)
			   this.position_buffer.push(i-(this.rows-1.0)/2.0);
			   this.position_buffer.push(j-(this.rows-1)/2.0);
			   this.position_buffer.push(0);

			   // Para cada vértice definimos su color
			   this.color_buffer.push(1.0/this.rows * i);
			   this.color_buffer.push(0.2);
			   this.color_buffer.push(1.0/this.cols * j);
									  
		   };
		};
	}

	this.setupWebGLBuffers = function(){

		// 1. Creamos un buffer para las posicioens dentro del pipeline.
		this.webgl_position_buffer = gl.createBuffer();
		// 2. Le decimos a WebGL que las siguientes operaciones que vamos a ser se aplican sobre el buffer que
		// hemos creado.
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		// 3. Cargamos datos de las posiciones en el buffer.
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

		// Repetimos los pasos 1. 2. y 3. para la información del color
		this.webgl_color_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);   

		// Repetimos los pasos 1. 2. y 3. para la información de los índices
		// Notar que esta vez se usa ELEMENT_ARRAY_BUFFER en lugar de ARRAY_BUFFER.
		// Notar también que se usa un array de enteros en lugar de floats.
		this.webgl_index_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
	}


	this.drawVertexGrid = function() {
		var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
		gl.enableVertexAttribArray(vertexPositionAttribute);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

		var vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
		gl.enableVertexAttribArray(vertexColorAttribute);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
		gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

		// Dibujamos.
		gl.drawElements(gl.TRIANGLE_STRIP, cant_vertices, gl.UNSIGNED_SHORT, 0);
	}
}




