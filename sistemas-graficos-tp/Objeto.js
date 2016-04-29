function Object() {
	this.position_buffer = null;
	this.texture_coord_buffer = null;
	this.normal_buffer = null;
	this.index_buffer = null;

	this.webgl_position_buffer = null;
	this.webgl_normal_buffer = null;
	this.webgl_texture_coord_buffer = null;
	this.webgl_index_buffer = null;
	
	//tangent
	//binormal
}

// Configuro los Buffers
this.setupWebGLBuffers() {
	// Creación e Inicialización de los buffers a nivel de OpenGL
	
	// Buffer de Normales
	this.webgl_normal_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);
	this.webgl_normal_buffer.itemSize = 3;
	this.webgl_normal_buffer.numItems = this.normal_buffer.length / 3;

	// Buffer de Binormales
	// Buffer de Tangentes

	// Buffer de Coordenadas
	this.webgl_texture_coord_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coord_buffer), gl.STATIC_DRAW);
	this.webgl_texture_coord_buffer.itemSize = 2;
	this.webgl_texture_coord_buffer.numItems = this.texture_coord_buffer.length / 2;

	// Buffer de Posiciones
	this.webgl_position_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
	this.webgl_position_buffer.itemSize = 3;
	this.webgl_position_buffer.numItems = this.position_buffer.length / 3;

	// Buffer de Indices
	this.webgl_index_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
	this.webgl_index_buffer.itemSize = 1;
	this.webgl_index_buffer.numItems = this.index_buffer.length;
}

// Dibujo al Objeto
this.draw = function() {
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.webgl_texture_coord_buffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
	gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);

	/*gl.activeTexture(gl.TEXTURE0);			//PUEDE HABER MÁS DE UNA TEXTURA
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	gl.uniform1i(shaderProgram.samplerUniform, 0);*/
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
	gl.drawElements(gl.TRIANGLES, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
}
