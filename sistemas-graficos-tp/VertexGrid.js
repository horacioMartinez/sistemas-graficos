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






