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
			var perfilPosition = this.profileBuffer[j].position;
			var perfilBinormal = this.profileBuffer[j].binormal;
			var perfilTangent =  this.profileBuffer[j].tangent;
			
			var x = perfilPosition[0] * Math.cos(alfa); 
			var y = perfilPosition[1] * 1;
			var z = perfilPosition[0] * Math.sin(alfa);	// Notar que volvemos a usar la coordenada x ya que z = 0 para todo punto.
			
			this.position_buffer.push(x);
			this.position_buffer.push(y);
			this.position_buffer.push(z);
			
			this.color_buffer.push(x * y * z );	// TODO: MODIFICAR COLOR
			this.color_buffer.push(j * x);
			this.color_buffer.push(y * i );	
		}
	}
	// TODO: FALTA DEFINIR LOS VECTORES DE NORMALES, BINORMALES Y DE COORDENADAS DE COLOR						
}
