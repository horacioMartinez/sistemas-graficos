// OBJETO VERTEX-GRID
// Definimos un constructor para el objeto VertexGrid
function VertexGrid(_rows, _cols) {
	this.cant_vertices = 0;
	this.cols = _cols;
	this.rows = _rows;
	this.index_buffer = null;

	this.position_buffer = null;
	this.color_buffer = null;

	this.webgl_position_buffer = null;
	this.webgl_color_buffer = null;
	this.webgl_index_buffer = null;

	// esta funcion la tienen que definir las clases que hereden!!!
	this.initBuffers();

	this.createIndexBuffer();
	this.setupWebGLBuffers();
}

VertexGrid.prototype.createIndexBuffer = function() {

	var buffer_aux = [];
	var i = 0;
	var j = 0;

	for (j = 0; j < this.rows - 2; j++) {
		for (i = 0; i < this.cols; i++) {
			buffer_aux.push(i + this.cols * j);
			buffer_aux.push(i + this.cols * (j + 1));
		}
		buffer_aux.push(i + this.cols * (j + 1) - 1); //Repito los puntos para unir las filas de la matriz
		buffer_aux.push(this.cols * (j + 1));
	}

	for (i = 0; i < this.cols; i++) { //En la última iteracion no uno las filas
		buffer_aux.push(i + this.cols * j);
		buffer_aux.push(i + this.cols * (j + 1));
	}

	this.index_buffer = buffer_aux;
	this.cant_vertices = buffer_aux.length;
}

VertexGrid.prototype.setupWebGLBuffers = function() {

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


VertexGrid.prototype.drawVertexGrid = function() {
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
	gl.drawElements(gl.TRIANGLE_STRIP, this.cant_vertices, gl.UNSIGNED_SHORT, 0);
}