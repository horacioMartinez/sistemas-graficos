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
			var perfilTangent =  this.profileBuffer[j].tangent;
			
			var x = translationBinormal[0] * perfilPosition[0] + translationNormal [0] * perfilPosition[1] - translationTangent[0] * perfilPosition[2] + translationPosition[0];
			var y = translationBinormal[1] * perfilPosition[0] + translationNormal [1] * perfilPosition[1] - translationTangent[1] * perfilPosition[2] + translationPosition[1];
			var z = translationBinormal[2] * perfilPosition[0] + translationNormal [2] * perfilPosition[1] - translationTangent[2] * perfilPosition[2] + translationPosition[2];
			
			this.position_buffer.push(x);
			this.position_buffer.push(y);
			this.position_buffer.push(z);
			
			this.color_buffer.push(x * y * z );
			this.color_buffer.push(j * x);
			this.color_buffer.push(y * i );	
			
			/*var nx = tp.binormal[0] * pbn[0] + tp.normal[0] * pbn[1] + tp.tangent[0] * pbn[2]; //	CUANDO TRABAJEMOS CON VECTORES DE NORMALES Y BINORMALES PARA ILUMINACIÓN TRABAJAMOS CON ESTO.
			var ny = tp.binormal[1] * pbn[0] + tp.normal[1] * pbn[1] + tp.tangent[1] * pbn[2];
			var nz = tp.binormal[2] * pbn[0] + tp.normal[2] * pbn[1] + tp.tangent[2] * pbn[2];
			
			var normal = vec3.normalize([], [nx, ny, nz]);
			normalData.push(normal[0], normal[1], normal[2]);
			tangentData.push(tp.tangent[0], tp.tangent[1], tp.tangent[2]);
		
			var binormal = vec3.normalize([], vec3.cross([], normal, tp.tangent));
			binormalData.push(binormal[0], binormal[1], binormal[2]);
			
			textureCoordData.push(u);
			textureCoordData.push(i / (this.profilePoints.length - 1));*/
		}
	}
}
