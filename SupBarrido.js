// textureCount es la cantidad de veces que se repite la textura
function SupBarrido(trayectoryBuffer, profileBuffer, texturePath, textureCount) {	
  	this.trayectoryBuffer = trayectoryBuffer;
	this.profileBuffer = profileBuffer;
	this.textureCount = textureCount;
  	VertexGrid.call(this, trayectoryBuffer.length, profileBuffer.length,texturePath);
}

SupBarrido.prototype = Object.create(VertexGrid.prototype);
SupBarrido.prototype.constructor = SupBarrido;

SupBarrido.prototype.initBuffers = function() {
	this.position_buffer = [];
	this.color_buffer = [];
	
	var switch_u = 0.0;
	
	var textureLength = parseInt(this.trayectoryBuffer.length / this.textureCount);
				
	for (var i = 0; i < this.trayectoryBuffer.length; i ++) {
		var translationVertex = this.trayectoryBuffer[i];
		var translationPosition = translationVertex.position;
		var translationBinormal = translationVertex.binormal;
		var translationNormal = translationVertex.normal;
		var translationTangent = translationVertex.tangent;
		
		if ( (1.0 - (i % textureLength) / textureLength) == 1.0 ) {
			switch_u = 1.0 - switch_u;
		}

		for (var j = 0; j < this.profileBuffer.length; j ++) {
			var perfilPosition = this.profileBuffer[j].position;
			var perfilNormal = this.profileBuffer[j].normal;
			
			// Posiciones
			var x = translationBinormal[0] * perfilPosition[0] + translationNormal [0] * perfilPosition[1] - translationTangent[0] * perfilPosition[2] + translationPosition[0];
			var y = translationBinormal[1] * perfilPosition[0] + translationNormal [1] * perfilPosition[1] - translationTangent[1] * perfilPosition[2] + translationPosition[1];
			var z = translationBinormal[2] * perfilPosition[0] + translationNormal [2] * perfilPosition[1] - translationTangent[2] * perfilPosition[2] + translationPosition[2];
			this.position_buffer.push(x);
			this.position_buffer.push(y);
			this.position_buffer.push(z);

			// Normales
			var nx = translationBinormal[0] * perfilNormal[0] + translationNormal[0] * perfilNormal[1] + translationTangent[0] * perfilNormal[2]; 
			var ny = translationBinormal[1] * perfilNormal[0] + translationNormal[1] * perfilNormal[1] + translationTangent[1] * perfilNormal[2];
			var nz = translationBinormal[2] * perfilNormal[0] + translationNormal[2] * perfilNormal[1] + translationTangent[2] * perfilNormal[2];
			var normal = vec3.normalize([], [nx, ny, nz]);
			this.normal_buffer.push(normal[0], normal[1], normal[2]);
			
			// Tangentes
			this.tangent_buffer.push(translationTangent[0], translationTangent[1], translationTangent[2]);
			
			// Binormales
			var binormal = vec3.normalize([], vec3.cross([], normal, translationTangent));	// TODO: Hay que tener cuidado con este producto
			this.binormal_buffer.push(binormal[0], binormal[1], binormal[2]);
			
			// Coordenadas
			var u = 1.0 - (i % textureLength) / textureLength;		
			var v = 1.0 - (j / (this.profileBuffer.length - 1));

			if (switch_u == 1.0) {
				u = 1.0 - (i % textureLength) / textureLength;		
			} else {
				u = (i % textureLength) / textureLength;		
			}
			
			this.texture_coord_buffer.push(u);
			this.texture_coord_buffer.push(v);
		}
		

	}
}
