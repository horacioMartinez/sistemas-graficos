
function VertexGrid(_rows, _cols, texturePath) {

	texturePath = texturePath ? texturePath : "textures/mars_1k_color.jpg";

	this.cant_vertices = 0;
	this.cols = _cols;
	this.rows = _rows;
	this.index_buffer = null;

	// estos 3 se deben completar con la funcion de abajo. (Se deben completar con las coordenadas x,y,z (ej 4,3,5,...) no con vertices.
	// el de textura lleva solo 2 coordenadas: u,v y se completa u,v de cada vertice (ej 0.1,0.5,.. )
	this.position_buffer = [];
	this.normal_buffer = [];
	this.tangent_buffer = [];
	this.binormal_buffer = [];
	this.texture_coord_buffer = [];

	this.initBuffers();		// esta funcion la tienen que definir las clases que hereden!!!

	this.createIndexBuffer();
	this.setupWebGLBuffers();

	this.initTexture(texturePath);
}

VertexGrid.prototype.initTexture = function(texture_file){
	this.texture = gl.createTexture();
	this.texture.image = new Image();
	var self = this;
	this.texture.image.onload = function () {
		self.handleLoadedTexture();
	};
	this.texture.image.src = texture_file;
};

VertexGrid.prototype.handleLoadedTexture = function(){
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.texture.image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);

	gl.bindTexture(gl.TEXTURE_2D, null);
};

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
};

VertexGrid.prototype.setupWebGLBuffers = function() {

	if (this.normal_buffer.length < 1){
		throw new Error("Tenes que definir las normales de los vertices");
	}
	if (this.texture_coord_buffer.length < 1){
		throw new Error("Tenes que definir las coordenadas de la textura de los vertices");
	}

	// Normales
	this.webgl_normal_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);
	this.webgl_normal_buffer.itemSize = 3;
	this.webgl_normal_buffer.numItems = this.normal_buffer.length / 3;

	// Binormales
	if (this.binormal_buffer.length > 0) {
		this.webgl_binormal_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.binormal_buffer), gl.STATIC_DRAW);
		this.webgl_binormal_buffer.itemSize = 3;
		this.webgl_binormal_buffer.numItems = this.binormal_buffer.length / 3;
	} else {
		this.webgl_binormal_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer),gl.STATIC_DRAW);
		this.webgl_binormal_buffer.itemSize = 3;
		this.webgl_binormal_buffer.numItems = this.normal_buffer.length / 3;
	}

	// Tangentes
	if (this.tangent_buffer.length > 0) {
		this.webgl_tangent_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tangent_buffer), gl.STATIC_DRAW);
		this.webgl_tangent_buffer.itemSize = 3;
		this.webgl_tangent_buffer.numItems = this.tangent_buffer.length / 3;
	} else {
		this.webgl_tangent_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);
		this.webgl_tangent_buffer.itemSize = 3;
		this.webgl_tangent_buffer.numItems = this.normal_buffer.length / 3;
	}

	// Coordenadas
	this.webgl_texture_coord_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coord_buffer), gl.STATIC_DRAW);
	this.webgl_texture_coord_buffer.itemSize = 2;
	this.webgl_texture_coord_buffer.numItems = this.texture_coord_buffer.length / 2;

	// Posiciones
	this.webgl_position_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
	this.webgl_position_buffer.itemSize = 3;
	this.webgl_position_buffer.numItems = this.position_buffer.length / 3;

	// Indices
	this.webgl_index_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
	this.webgl_index_buffer.itemSize = 1;
	this.webgl_index_buffer.numItems = this.index_buffer.length;
};


VertexGrid.prototype.draw = function(modelMatrix) {

	// Se configuran los buffers que alimentarán el pipeline
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.webgl_texture_coord_buffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
	gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
	gl.vertexAttribPointer(shaderProgram.vertexTangentAttribute, this.webgl_tangent_buffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
	gl.vertexAttribPointer(shaderProgram.vertexBinormalAttribute, this.webgl_binormal_buffer.itemSize, gl.FLOAT, false, 0, 0);
			
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
	gl.drawElements(gl.TRIANGLE_STRIP, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
};
