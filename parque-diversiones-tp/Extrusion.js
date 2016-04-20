function calcularPuntos(path, vertices, u) {
	var matriz = mat4.create();
	mat4.identity(matriz);
	var tangente = path.t(u);
	var normal = calcularNormal(tangente);
	var binormal = calcularBinormal(tangente, normal);
	var vert = vec3.create(path.p(u));
	mat4.translate(matriz, vert, matriz);
	matriz[0] = normal[0];
	matriz[1] = normal[1];
	matriz[2] = normal[2];
	matriz[4] = binormal[0];
	matriz[5] = binormal[1];
	matriz[6] = binormal[2];
	matriz[8] = tangente[0];
	matriz[9] = tangente[1];
	matriz[10] = tangente[2];
	var newVertices = [];
	for (var i = 0; i < vertices.length - 2; i += 3) {
		var oldVertex = vec3.create([ vertices[i], vertices[i + 1],
				vertices[i + 2] ]);
		var newVertex = vec3.create();
		mat4.multiplyVec3(matriz, oldVertex, newVertex);
		newVertices.push(newVertex[0]);
		newVertices.push(newVertex[1]);
		newVertices.push(newVertex[2]);
	}
	return newVertices;
}

function matrizAlinear(nx, ny, nz, pos) {
	var matriz = mat4.create();
	mat4.identity(matriz);
	var vpos = vec3.create(pos);
	mat4.translate(matriz, vpos);
	matriz[0] = nx[0];
	matriz[1] = nx[1];
	matriz[2] = nx[2];
	matriz[4] = ny[0];
	matriz[5] = ny[1];
	matriz[6] = ny[2];
	matriz[8] = nz[0];
	matriz[9] = nz[1];
	matriz[10] = nz[2];
	return matriz;
}

function matrizNormal(nx, ny, nz, pos) {
	var mat = matrizAlinear(nx, ny, nz);
	mat4.inverse(mat);
	mat4.transpose(mat);
	return mat;
}

function calcularNormales(path, vertices, u) {
	var matriz = mat4.create();
	mat4.identity(matriz);
	var tangente = path.t(u);
	var normal = calcularNormal(tangente);
	var binormal = calcularBinormal(tangente, normal);
	var vert = vec3.create(path.p(u));
	var matriz = matrizNormal(normal, binormal, tangente);
	var newVertices = [];
	for (var i = 0; i < vertices.length - 2; i += 3) {
		var oldVertex = vec3.create([ vertices[i], vertices[i + 1],
				vertices[i + 2] ]);
		var newVertex = vec3.create();
		mat4.multiplyVec3(matriz, oldVertex, newVertex);
		newVertices.push(newVertex[0]);
		newVertices.push(newVertex[1]);
		newVertices.push(newVertex[2]);
	}
	return newVertices;
}

function Tube(norms, seccion, curva, ts) {
	this.seccion = seccion.slice(0);
	this.centroides = [];
	var verticesAux = [];
	var seccionAux = [];
	this.normales = [];
	var normalAux = [];
	for (var i = 0; i < ts.length; i++) {
		var t = ts[i];
		seccionAux = calcularPuntos(curva, seccion, t);
		normalAux = calcularNormales(curva, norms, t);
		// this.centroides.push(this.calculateCentroid(seccionAux));
		this.normales = this.normales.concat(normalAux);
		verticesAux = verticesAux.concat(seccionAux);
	}
	seccionAux = calcularPuntos(curva, seccion, 0.0);
	normalAux = calcularPuntos(curva, norms, 0.0);
	this.normales = this.normales.concat(normalAux);

	// this.centroides.push(this.calculateCentroid(seccionAux));
	verticesAux = verticesAux.concat(seccionAux);
	this.vertices = verticesAux.slice(0);
	var tam = seccion.length / 3 - 1;
	this.lines = [];
	Grid.call(this, ts.length, tam);

};

inheritPrototype(Tube, Grid);

function calculateCentroid(seccion) {
	var x = 0;
	var y = 0;
	var z = 0;
	for (var i = 0; i < seccion.length - 1; i += 3) {
		x += seccion[i];
	}
	for (var i = 1; i < seccion.length - 1; i += 3) {
		y += seccion[i];
	}
	for (var i = 2; i < seccion.length - 1; i += 3) {
		// console.log("<z<z<", seccion[i]);
		z += seccion[i];
		// console.log("zzzz", z);
	}
	// console.log("z es ", z);
	x /= (seccion.length - 1) / 3.0;
	y /= (seccion.length - 1) / 3.0;
	z /= (seccion.length - 1) / 3.0;

	return [ x, y, z ];

}

Tube.prototype.createPositionBuffer = function() {
	var x = 0;
	var y = 0;
	var z = 0;
	var i = 0;
	this.position_buffer = [];
	this.normal_buffer = [];
	this.texture_coord_buffer = [];
	var j = 0;
	var u = 0;
	var v = 0;
	var c = -1;
	for (i = 0; i < this.vertices.length - 2; i += 3) {
		var vertice = this.vertices.slice(i, i + 3);

		if (j % (this.seccion.length / 3) == 0) {
			u = 1 - u;
			c++;
		}

		this.texture_coord_buffer.push((1.0 / (this.seccion.length / 3 - 1))
				* (j % (this.seccion.length / 3)));
		this.texture_coord_buffer.push(u);
		this.position_buffer = this.position_buffer.concat(vertice);
		j++;
		var n = this.normales.slice(i, i + 3);
		// vec3.scale(n, 0.1);
		this.lines.push(new Linea([ 0, 0, 0 ], n, [ 1.0, 1.0, 1.0 ], vertice));
	}
	this.normal_buffer = this.normales.slice(0);
};

Tube.prototype.getNorms = function() {
	return this.lines;
};

function Extrusion(height, baseVerticesList) {
	this.normales = [];
	this.baseVerticesList = baseVerticesList;
	this.centroid = calculateCentroid(this.baseVerticesList);
	this.maxX = 0.0;
	this.maxY = 0.0;
	for (var i = 0; i < this.baseVerticesList.length - 2; i += 3) {
		if (this.baseVerticesList[i] > this.maxX)
			this.maxX = this.baseVerticesList[i];
		if (this.baseVerticesList[i + 1] > this.maxy)
			this.maxY = this.baseVerticesList[i + 1];
	}

	this.numberOfVerticesInBase = baseVerticesList.length / 2.0;
	this.height = height;
	Grid.call(this, 3, this.numberOfVerticesInBase - 1);
};

inheritPrototype(Extrusion, Grid);

Extrusion.prototype.getNormals = function() {
	return this.normales;
};

Extrusion.prototype.createPositionBuffer = function() {
	this.position_buffer = [];
	this.normal_buffer = [];
	this.texture_coord_buffer = [];

	var i, x, y, z;
	// Tapa de abajo:
	for (i = 0; i < this.numberOfVerticesInBase; ++i) {
		x = 0;
		y = 0;
		z = -this.height / 2.0;
		// z = 0.0;

		this.normal_buffer.push(x);
		this.normal_buffer.push(y);
		this.normal_buffer.push(-1.0);
		
		this.tangent_buffer.push(1.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(0.0);

		this.binormal_buffer.push(0.0);
		this.binormal_buffer.push(-1.0);
		this.binormal_buffer.push(0.0);

		this.texture_coord_buffer.push(i / this.numberOfVerticesInBase);
		this.texture_coord_buffer.push(1.0);

		this.position_buffer.push(x);
		this.position_buffer.push(y);
		this.position_buffer.push(z);
	}
	// Cuerpo:
	for (i = 0; i < this.numberOfVerticesInBase * 2; ++i) {
		x = this.baseVerticesList[i];
		y = this.baseVerticesList[++i];
		z = -this.height / 2.0;
		// z = 0.0;

		this.normal_buffer.push(0.0);
		this.normal_buffer.push(0.0);
		this.normal_buffer.push(-1.0);

		this.tangent_buffer.push(1.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(0.0);

		this.binormal_buffer.push(0.0);
		this.binormal_buffer.push(-1.0);
		this.binormal_buffer.push(0.0);
		
		this.texture_coord_buffer.push(x);
		this.texture_coord_buffer.push(y);

		this.position_buffer.push(x);
		this.position_buffer.push(y);
		this.position_buffer.push(z);
	}
	for (i = 0; i < this.numberOfVerticesInBase * 2; ++i) {
		x = this.baseVerticesList[i];
		y = this.baseVerticesList[++i];
		z = this.height / 2.0;
		// z = -this.height;

		this.normal_buffer.push(0);
		this.normal_buffer.push(0);
		this.normal_buffer.push(1);

		this.tangent_buffer.push(1.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(0.0);

		this.binormal_buffer.push(0.0);
		this.binormal_buffer.push(1.0);
		this.binormal_buffer.push(0.0);
		
		this.texture_coord_buffer.push(x / 5);
		this.texture_coord_buffer.push(y / 5);

		this.position_buffer.push(x);
		this.position_buffer.push(y);
		this.position_buffer.push(z);
	}
	// Tapa de arriba:
	for (i = 0; i < this.numberOfVerticesInBase; ++i) {
		x = 0;
		y = 0;
		z = this.height / 2.0;
		// z = -this.height;

		this.normal_buffer.push(x);
		this.normal_buffer.push(y);
		this.normal_buffer.push(1.0);

		this.tangent_buffer.push(1.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(0.0);

		this.binormal_buffer.push(0.0);
		this.binormal_buffer.push(1.0);
		this.binormal_buffer.push(0.0);
		
		this.texture_coord_buffer.push(0.0);
		this.texture_coord_buffer.push(0.0);

		this.position_buffer.push(x);
		this.position_buffer.push(y);
		this.position_buffer.push(z);
	}
	//console.log("papap");
	//console.log(this.numberOfVerticesInBase);

	for (var j = 0; j < this.position_buffer.length - 2; j += 3) {
		var n = this.normal_buffer.slice(j, j + 3);
		var v = this.position_buffer.slice(j, j + 3);
		this.normales.push(new Linea([ 0, 0, 0 ], n, [ 1, 1, 1 ], v));
	}

};
