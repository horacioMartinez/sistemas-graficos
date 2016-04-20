/**
 * 
 */

function Grid(latitude_bands, longitude_bands) {
	this.latitudeBands = latitude_bands;
	this.longitudeBands = longitude_bands;

	this.position_buffer = null;
	this.tangent_buffer = [];
	this.binormal_buffer = [];
	this.normal_buffer = null;
	this.texture_coord_buffer = null;
	this.index_buffer = null;

	this.webgl_position_buffer = null;
	this.webgl_tangent_buffer = null;
	this.webgl_binormal_buffer = null;
	this.webgl_normal_buffer = null;
	this.webgl_texture_coord_buffer = null;
	this.webgl_index_buffer = null;

	this.texture = null;
	this.normalMap = null;
	this.reflectionMap = null;
	this.du = 0.0;
	this.dv = 0.0;
	this.initBuffers();

	this.useNormalMap = false;
	this.useReflectionMap = false;
};

// ya
Grid.prototype.draw = function(modelMatrix) {
	// Se configuran los buffers que alimentarán el pipeline

	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
			this.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute,
			this.webgl_texture_coord_buffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
	gl.vertexAttribPointer(shaderProgram.vertexTangentAttribute,
			this.webgl_tangent_buffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
	gl.vertexAttribPointer(shaderProgram.vertexBinormalAttribute,
			this.webgl_binormal_buffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
	gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute,
			this.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	gl.uniform1i(shaderProgram.textureSamplerUniform, 0);

	// Se descartan los escalados y translaciones
	gl.uniformMatrix4fv(shaderProgram.ModelMatrixUniform, false, modelMatrix);
	var normalMatrix = mat3.create();
	mat4.toInverseMat3(modelMatrix, normalMatrix);
	mat3.transpose(normalMatrix);
	gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);

	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, this.normalMap);
	gl.uniform1i(shaderProgram.normalSamplerUniform, 1);

	gl.activeTexture(gl.TEXTURE2);
	gl.bindTexture(gl.TEXTURE_2D, this.reflectionMap);
	gl.uniform1i(shaderProgram.reflectionSamplerUniform, 2);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
	// gl.drawElements(gl.LINE_LOOP, this.webgl_index_buffer.numItems,
	// gl.UNSIGNED_SHORT, 0);

	gl.drawElements(gl.TRIANGLES, this.webgl_index_buffer.numItems,
			gl.UNSIGNED_SHORT, 0);
	// ///////////////////////////////
};

Grid.prototype.updateTextCoord = function() {
	for (var i = 0; i < this.texture_coord_buffer.length; i += 2) {
		this.texture_coord_buffer[i] = this.texture_coord_buffer[i] + this.du;
	}
	for (var i = 1; i < this.texture_coord_buffer.length; i += 2) {
		this.texture_coord_buffer[i] = this.texture_coord_buffer[i] + this.dv;
	}
	this.webgl_texture_coord_buffer = gl.createBuffer();

	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coord_buffer),
			gl.STATIC_DRAW);
	this.webgl_texture_coord_buffer.itemSize = 2;
	this.webgl_texture_coord_buffer.numItems = this.texture_coord_buffer.length / 2;
};

Grid.prototype.setDeltaUV = function(du, dv) {
	this.du = du;
	this.dv = dv;
};

Grid.prototype.setupWebGLBuffers = function() {
	// console.log("Grid.prototype.setupWebGLBuffers");
	// Activo el buffer de normales
	this.webgl_normal_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer),
			gl.STATIC_DRAW);
	this.webgl_normal_buffer.itemSize = 3;
	this.webgl_normal_buffer.numItems = this.normal_buffer.length / 3;

	// Activo el buffer de binormales
	if (this.binormal_buffer.length > 0) {
		this.webgl_binormal_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.binormal_buffer),
				gl.STATIC_DRAW);
		this.webgl_binormal_buffer.itemSize = 3;
		this.webgl_binormal_buffer.numItems = this.binormal_buffer.length / 3;
	} else {
		this.webgl_binormal_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer),
				gl.STATIC_DRAW);
		this.webgl_binormal_buffer.itemSize = 3;
		this.webgl_binormal_buffer.numItems = this.normal_buffer.length / 3;
	}

	// Activo el buffer de tangentes
	if (this.tangent_buffer.length > 0) {
		this.webgl_tangent_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tangent_buffer),
				gl.STATIC_DRAW);
		this.webgl_tangent_buffer.itemSize = 3;
		this.webgl_tangent_buffer.numItems = this.tangent_buffer.length / 3;
	} else {
		this.webgl_tangent_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer),
				gl.STATIC_DRAW);
		this.webgl_tangent_buffer.itemSize = 3;
		this.webgl_tangent_buffer.numItems = this.normal_buffer.length / 3;
	}

	// Activo el buffer de coordenadas de texturas
	this.webgl_texture_coord_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coord_buffer),
			gl.STATIC_DRAW);
	this.webgl_texture_coord_buffer.itemSize = 2;
	this.webgl_texture_coord_buffer.numItems = this.texture_coord_buffer.length / 2;

	// Activo el buffer de posiciones
	this.webgl_position_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer),
			gl.STATIC_DRAW);
	this.webgl_position_buffer.itemSize = 3;
	this.webgl_position_buffer.numItems = this.position_buffer.length / 3;

	// Activo el buffer de indices
	this.webgl_index_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer),
			gl.STATIC_DRAW);
	this.webgl_index_buffer.itemSize = 1;
	this.webgl_index_buffer.numItems = this.index_buffer.length;
};

Grid.prototype.createIndexBuffer = function() {
	this.index_buffer = [];

	var latNumber;
	var longNumber;

	for (latNumber = 0; latNumber < this.latitudeBands; latNumber++) {
		for (longNumber = 0; longNumber < this.longitudeBands; longNumber++) {
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
};

Grid.prototype.initTexture = function(texture_file) {
	var aux_texture = gl.createTexture();
	this.texture = aux_texture;
	this.texture.image = new Image();

	var tex = this.texture;
	var im = tex.image;
	this.texture.image.onload = function() {
		handleLoadedTexture(tex, im);
	};
	this.texture.image.src = "./assets/" + texture_file;

};

Grid.prototype.initNormalMap = function(normal_file) {
	this.useNormalMap = true;
	var aux_texture = gl.createTexture();
	this.normalMap = aux_texture;
	this.normalMap.image = new Image();

	var tex = this.normalMap;
	var im = tex.image;
	this.normalMap.image.onload = function() {
		handleLoadedTexture(tex, im);
	};
	this.normalMap.image.src = "./assets/" + normal_file;
};

Grid.prototype.initReflectionMap = function(reflection_file) {
	this.useReflectionMap = true;
	var aux_texture = gl.createTexture();
	this.reflectionMap = aux_texture;
	this.reflectionMap.image = new Image();

	var tex = this.reflectionMap;
	var im = tex.image;
	this.reflectionMap.image.onload = function() {
		handleLoadedTexture(tex, im);
	};
	this.reflectionMap.image.src = "./assets/" + reflection_file;
};

Grid.prototype.initBuffers = function() {
	// Si no implemento este metodo en mi clase, no la puedo instanciar:
	this.createPositionBuffer();
	// Buffer de indices de los triangulos
	this.createIndexBuffer();
	this.setupWebGLBuffers();
};

function handleLoadedTexture(tex, im) {
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.bindTexture(gl.TEXTURE_2D, tex);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
			gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);

	gl.bindTexture(gl.TEXTURE_2D, null);
};
