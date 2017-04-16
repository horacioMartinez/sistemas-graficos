function SpaceStationCargoBayCover(internalBuffer, externalBuffer, vertex) {
	this.internalBuffer = internalBuffer;
	this.externalBuffer = externalBuffer;
	this.vertex = vertex;
  	VertexGrid.call(this, 2, internalBuffer.length, 'textures/container.png');
}

SpaceStationCargoBayCover.prototype = Object.create(VertexGrid.prototype);
SpaceStationCargoBayCover.prototype.constructor = SpaceStationCargoBayCover;

SpaceStationCargoBayCover.prototype.initBuffers = function() {
	this.createCover(this.vertex, this.internalBuffer);
	this.createCover(this.vertex, this.externalBuffer);
}

SpaceStationCargoBayCover.prototype.createCover = function(vertex, buffer) {
	var translationPosition = vertex.position;
	var translationBinormal = vertex.binormal;
	var translationNormal = vertex.normal;
	var translationTangent = vertex.tangent;

	for (var j = 0; j < buffer.length; j ++) {
		var perfilPosition = buffer[j].position;
		var perfilNormal = buffer[j].normal;
			
		// Posiciones
		var x = translationBinormal[0] * perfilPosition[0] + translationNormal [0] * perfilPosition[1] - translationTangent[0] * perfilPosition[2] + translationPosition[0];
		var y = translationBinormal[1] * perfilPosition[0] + translationNormal [1] * perfilPosition[1] - translationTangent[1] * perfilPosition[2] + translationPosition[1];
		var z = translationBinormal[2] * perfilPosition[0] + translationNormal [2] * perfilPosition[1] - translationTangent[2] * perfilPosition[2] + translationPosition[2];
			
		this.position_buffer.push(x);
		this.position_buffer.push(y);
		this.position_buffer.push(z);

		// Normales
		var nx = translationBinormal[0] * perfilNormal[0] + translationNormal[0] * perfilNormal[1] + translationTangent[0] * perfilNormal[2]; //	CUANDO TRABAJEMOS CON VECTORES DE NORMALES Y BINORMALES PARA ILUMINACIÓN TRABAJAMOS CON ESTO.
		var ny = translationBinormal[1] * perfilNormal[0] + translationNormal[1] * perfilNormal[1] + translationTangent[1] * perfilNormal[2];
		var nz = translationBinormal[2] * perfilNormal[0] + translationNormal[2] * perfilNormal[1] + translationTangent[2] * perfilNormal[2];

		var normal = vec3.normalize([], [nx, ny, nz]);
		this.normal_buffer.push(normal[0], normal[1], normal[2]);
			
		// TODO: corregir esto
		this.texture_coord_buffer.push(0 / (buffer.length - 1));
		this.texture_coord_buffer.push(0 / (buffer.length - 1));
	}
}
