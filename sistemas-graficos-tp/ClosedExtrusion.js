function ClosedExtrusion(profileBuffer, stepsClosedExtrusion,texturePath) {	// stepsClosedExtrusion = numero de pasos
  	this.stepsClosedExtrusion = stepsClosedExtrusion;
	this.profileBuffer = profileBuffer;
  	VertexGrid.call(this, stepsClosedExtrusion + 4, profileBuffer.length,texturePath);
}

ClosedExtrusion.prototype = Object.create(VertexGrid.prototype);
ClosedExtrusion.prototype.constructor = ClosedExtrusion;

ClosedExtrusion.prototype.initBuffers = function() {
	this.position_buffer = [];
	this.color_buffer = [];		
	this.normal_buffer = [];
	
	// Calculo el centro promedio de la superficie
	var centro_x = 0;
	var centro_y = 0;
	var centro_z = 0;
	
	for (var j = 0; j < this.profileBuffer.length; j ++) {
		var perfilPosition = this.profileBuffer[j].position;
		centro_x += perfilPosition[0];
		centro_y += perfilPosition[1];
	}
	centro_x = centro_x / this.profileBuffer.length;
	centro_y = centro_y / this.profileBuffer.length;
	
	// Primera tapa
	this.agregarTapa(centro_x, centro_y, centro_z);
	
	// Cuerpo
	for (var i = 0; i < this.stepsClosedExtrusion; i++) {		
		for (var j = 0; j < this.profileBuffer.length; j ++) {
			var perfilPosition = this.profileBuffer[j].position;
			var perfilNormal = this.profileBuffer[j].normal;
			var perfilBinormal = this.profileBuffer[j].binormal;
			var perfilTangent =  this.profileBuffer[j].tangent;
			
			var x = perfilPosition[0] * 1; 
			var y = perfilPosition[1] * 1;
			var z = perfilPosition[2] + i;
			
			// Posicion
			this.position_buffer.push(x);
			this.position_buffer.push(y);
			this.position_buffer.push(z);
			
			// Normales
			this.normal_buffer.push(perfilNormal[0]);
			this.normal_buffer.push(perfilNormal[1]);
			this.normal_buffer.push(perfilNormal[2]);
			
			// Tangentes
			this.tangent_buffer.push(0);
			this.tangent_buffer.push(0);
			this.tangent_buffer.push(1);	// Apunta en z
			
			// Binormales			
			var binormal = vec3.normalize([], vec3.cross([], perfilNormal, [0,0,1]));
			this.binormal_buffer.push(binormal[0], binormal[1], binormal[2]);

			// Coordenadas de textura
			var u = i / (this.stepsClosedExtrusion - 1);
			var v = j / (this.profileBuffer.length - 1);
			this.texture_coord_buffer.push(u);
			this.texture_coord_buffer.push(v);
		}
	}
	
	// Ultima tapa:
	centro_z = i - 1;
	this.agregarTapa(centro_x, centro_y, centro_z);

	this.tangent_buffer = []; // Se borran ya que no hacen falta
	this.binormal_buffer = [];
}

ClosedExtrusion.prototype.agregarTapa = function(centro_x, centro_y, centro_z) {
	for (var j = 0; j < this.profileBuffer.length; j ++) {
			var perfilPosition = this.profileBuffer[j].position;
			var perfilNormal = this.profileBuffer[j].normal;
			var perfilBinormal = this.profileBuffer[j].binormal;
			var perfilTangent =  this.profileBuffer[j].tangent;
			
			var x = perfilPosition[0] * 1; 
			var y = perfilPosition[1] * 1;
			var z = perfilPosition[2] + centro_z;
			
			// Posicion
			this.position_buffer.push(x);
			this.position_buffer.push(y);
			this.position_buffer.push(z);
						
			if (centro_z == 0) {
				this.normal_buffer.push(0);
				this.normal_buffer.push(0);
				this.normal_buffer.push(-1);
			} else {
				this.normal_buffer.push(0);
				this.normal_buffer.push(0);
				this.normal_buffer.push(1);	
			}
			
			// Coordenadas
			this.texture_coord_buffer.push(j / (this.profileBuffer.length - 1));
			this.texture_coord_buffer.push(j / (this.profileBuffer.length - 1));
			
			// Tangentes

			// Binormales			

			
			////////////////////////////////////////////////////////////////////
			//////////////// Vertice centro de la superficie ///////////////////
			////////////////////////////////////////////////////////////////////
			
			// Posicion
			this.position_buffer.push(centro_x);
			this.position_buffer.push(centro_y);
			this.position_buffer.push(centro_z);
			
			// Normales
			this.normal_buffer.push(0);
			this.normal_buffer.push(0);
			if (centro_z == 0) {
				this.normal_buffer.push(-1);
				this.texture_coord_buffer.push(1);
			} else {
				this.normal_buffer.push(1);
				this.texture_coord_buffer.push(0);
			}
			
			// Tangentes

			// Binormales	
			
			// Coordenadas
			
			this.texture_coord_buffer.push(j / (this.profileBuffer.length - 1));	
	}
}
