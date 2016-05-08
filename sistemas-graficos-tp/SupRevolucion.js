function SupRevolucion(profileBuffer, stepsRevolucion) {	// stepsRevolucion = numero de pasos
  	this.stepsRevolucion = stepsRevolucion;
	this.profileBuffer = profileBuffer;
  	VertexGrid.call(this, stepsRevolucion, profileBuffer.length); 
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
			
			// Color
			this.color_buffer.push(x * y * z );	// TODO: MODIFICAR COLOR
			this.color_buffer.push(j * x);
			this.color_buffer.push(y * i );	
			
			// Normales
			var normal_x = vec3.transformMat4([], perfilNormal, rotationMatrix)[0];
			var normal_y = vec3.transformMat4([], perfilNormal, rotationMatrix)[1];
			var normal_z = vec3.transformMat4([], perfilNormal, rotationMatrix)[2];
			
			this.normal_buffer.push(normal_x, normal_y, normal_z);
			
			// Coordenadas de texturas
			this.texture_coord_buffer.push(i / (this.profileBuffer.length - 1));
			this.texture_coord_buffer.push(i / (this.profileBuffer.length - 1));
		}
	}
}
