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
											
	my_grid = new UniformPlaneGrid(5,5);				// Creamos la cámara y los objetos de la escena.
	cilindro = new Cilindro(5,4);
	esfera = new Esfera(10,10);					

	spaceStation = new SpaceStation();					// LE PUSE ESTACION ESPACIAL PARA YA TENER DEFINIDOS LOS OBJETOS NOMAS...
	spaceStationCenter = new SpaceStationCenter();		// HAY UNA HERENCIA DE ESTAS A SUP DE BARRIDO Y REVOLUCION
		
	tick();												// Tick. Luego Dibujamos la escena
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

	//my_grid.drawVertexGrid();
	//cilindro.drawVertexGrid();
	//esfera.drawVertexGrid();
	//spaceStation.drawVertexGrid();
	spaceStationCenter.drawVertexGrid();
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






