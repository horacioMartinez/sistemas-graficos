function ClosedExtrusion(profileBuffer, stepsClosedExtrusion) {	// stepsClosedExtrusion = numero de pasos
  	this.stepsClosedExtrusion = stepsClosedExtrusion;
	this.profileBuffer = profileBuffer;
  	VertexGrid.call(this, stepsClosedExtrusion + 4, profileBuffer.length); 
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

			// Color
			this.color_buffer.push(x * y * z );	// TODO: MODIFICAR COLOR
			this.color_buffer.push(j * x);
			this.color_buffer.push(y * i );	
			
		}
	}
	
	// Ultima tapa:
	centro_z = i - 1;
	this.agregarTapa(centro_x, centro_y, centro_z);
	// TODO: FALTA DEFINIR LOS VECTORES DE NORMALES, BINORMALES Y DE COORDENADAS DE COLOR						
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
			
			// Normales
			this.normal_buffer.push(perfilNormal[0]);
			this.normal_buffer.push(perfilNormal[1]);
			this.normal_buffer.push(perfilNormal[2]);
			
			// Color
			this.color_buffer.push(x * y * z );	// TODO: MODIFICAR COLOR
			this.color_buffer.push(j * x);
			this.color_buffer.push(y);		
			
			// Coordenadas
			this.texture_coord_buffer.push(j / (this.profileBuffer.length - 1));
			this.texture_coord_buffer.push(j / (this.profileBuffer.length - 1));
			
			
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
			} else {
				this.normal_buffer.push(1);
			}

			// Color
			this.color_buffer.push(x * y * z );	// TODO: MODIFICAR COLOR
			this.color_buffer.push(j * x);
			this.color_buffer.push(y);
			
			// Coordenadas
			this.texture_coord_buffer.push(j / (this.profileBuffer.length - 1));
			this.texture_coord_buffer.push(j / (this.profileBuffer.length - 1));	
	}
}
