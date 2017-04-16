function SupRevolucion(profileBuffer, stepsRevolucion,texturePath) {	// stepsRevolucion = numero de pasos
  	this.stepsRevolucion = stepsRevolucion;
	this.profileBuffer = profileBuffer;
  	VertexGrid.call(this, stepsRevolucion, profileBuffer.length,texturePath);
}

SupRevolucion.prototype = Object.create(VertexGrid.prototype);
SupRevolucion.prototype.constructor = SupRevolucion;

SupRevolucion.prototype.initBuffers = function() {
	this.position_buffer = [];
	this.color_buffer = [];		
	
	for (var i = 0; i < this.stepsRevolucion; i++) {
		var alfa = i * 2 * Math.PI / (this.stepsRevolucion - 1);
		
		for (var j = 0; j < this.profileBuffer.length; j ++) {               
			// Definimos la matrix de rotación
			var rotationMatrix = mat4.create();
			mat4.rotate(rotationMatrix, rotationMatrix, alfa, [0, 1, 0]);	//Eje de rotacion = y

			var perfilPosition = this.profileBuffer[j].position;
			var perfilNormal = this.profileBuffer[j].normal;
			var perfilBinormal = this.profileBuffer[j].binormal;
			var perfilTangent =  this.profileBuffer[j].tangent;
				
			// Posiciones		
			var x = vec3.transformMat4([], perfilPosition, rotationMatrix)[0];
			var y = vec3.transformMat4([], perfilPosition, rotationMatrix)[1];
			var z = vec3.transformMat4([], perfilPosition, rotationMatrix)[2];
			this.position_buffer.push(x, y, z);
						
			// Normales
			var normal_x = vec3.transformMat4([], perfilNormal, rotationMatrix)[0];
			var normal_y = vec3.transformMat4([], perfilNormal, rotationMatrix)[1];
			var normal_z = vec3.transformMat4([], perfilNormal, rotationMatrix)[2];
			this.normal_buffer.push(normal_x, normal_y, normal_z);
			
			// Tangentes
			var tang_x = vec3.transformMat4([], perfilTangent, rotationMatrix)[0];
			var tang_y = vec3.transformMat4([], perfilTangent, rotationMatrix)[1];
			var tang_z = vec3.transformMat4([], perfilTangent, rotationMatrix)[2];
			this.tangent_buffer.push(tang_x, tang_y, tang_z);
			
			// Binormales
			var binormal_x = vec3.transformMat4([], perfilBinormal, rotationMatrix)[0];	
			var binormal_y = vec3.transformMat4([], perfilBinormal, rotationMatrix)[1];
			var binormal_z = vec3.transformMat4([], perfilBinormal, rotationMatrix)[2];
			this.binormal_buffer.push(binormal_x, binormal_y, binormal_z);
			
			// Definimos u,v para las texturas
			var u = 1.0 - (i / this.stepsRevolucion);
            var v = 1.0 - (j / this.profileBuffer.length);
            
			// Coordenadas de texturas
			this.texture_coord_buffer.push(u);
			this.texture_coord_buffer.push(v);
		}
	}
}
