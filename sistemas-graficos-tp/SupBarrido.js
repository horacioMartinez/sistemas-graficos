function SupBarrido(trayectoryBuffer, profileBuffer) {
  	this.trayectoryBuffer = trayectoryBuffer;
	this.profileBuffer = profileBuffer;
  	VertexGrid.call(this, trayectoryBuffer.length, profileBuffer.length);
}

SupBarrido.prototype = Object.create(VertexGrid.prototype);
SupBarrido.prototype.constructor = SupBarrido;

SupBarrido.prototype.initBuffers = function() {
	this.position_buffer = [];
	this.color_buffer = [];											
			
	for (var i = 0; i < this.trayectoryBuffer.length; i ++) {
		var translationVertex = this.trayectoryBuffer[i];
		var translationPosition = translationVertex.position;
		var translationBinormal = translationVertex.binormal;
		var translationNormal = translationVertex.normal;
		var translationTangent = translationVertex.tangent;

		for (var j = 0; j < this.profileBuffer.length; j ++) {
			var perfilPosition = this.profileBuffer[j].position;
			var perfilBinormal = this.profileBuffer[j].binormal;
			
			var x = translationBinormal[0] * perfilPosition[0] + translationNormal [0] * perfilPosition[1] - translationTangent[0] * perfilPosition[2] + translationPosition[0];
			var y = translationBinormal[1] * perfilPosition[0] + translationNormal [1] * perfilPosition[1] - translationTangent[1] * perfilPosition[2] + translationPosition[1];
			var z = translationBinormal[2] * perfilPosition[0] + translationNormal [2] * perfilPosition[1] - translationTangent[2] * perfilPosition[2] + translationPosition[2];
			
			this.position_buffer.push(x);
			this.position_buffer.push(y);
			this.position_buffer.push(z);
			
			var nx = translationBinormal[0] * perfilBinormal[0] + translationNormal[0] * perfilBinormal[1] + translationTangent[0] * perfilBinormal[2]; //	CUANDO TRABAJEMOS CON VECTORES DE NORMALES Y BINORMALES PARA ILUMINACIÓN TRABAJAMOS CON ESTO.
			var ny = translationBinormal[1] * perfilBinormal[0] + translationNormal[1] * perfilBinormal[1] + translationTangent[1] * perfilBinormal[2];
			var nz = translationBinormal[2] * perfilBinormal[0] + translationNormal[2] * perfilBinormal[1] + translationTangent[2] * perfilBinormal[2];

			var normal = vec3.normalize([], [nx, ny, nz]);
			this.normal_buffer.push(normal[0], normal[1], normal[2]);
			
			// TODO: corregir esto
			this.texture_coord_buffer.push(i / (this.profileBuffer.length - 1));
			this.texture_coord_buffer.push(i / (this.profileBuffer.length - 1));
		}
	}
}
