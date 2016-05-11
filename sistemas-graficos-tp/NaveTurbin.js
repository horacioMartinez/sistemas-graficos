function NaveTurbin() {
	var curva = new CurvaBezierCubica();
	var puntosControl = [[0,2,0], [0.25,2,0], [0.5,2,0], [1,2,0],
								  [1.25,2.5,0], [1.75,2.5,0], [2,2,0],
								  [2.5,0.5,0], [1.5,-1.5,0], [0.75,-2,0],
								  [0.75,-1.85,0], [0.75,-1.65,0], [0.75,-1.5,0],
								  [0.5,-1.5,0], [0.25,-1.5,0], [0,-1.5,0] ];
						
	var escalado = 1.5;			
	for (var i = 0; i < puntosControl.length; i++) {	// BIEN CABEZA
		(puntosControl[i])[0] /= escalado;
		(puntosControl[i])[1] /= escalado;

	} 					
	var profileBuffer = curva.getVertices(puntosControl,0.1);
  	SupRevolucion.call(this,profileBuffer, 15); 
}

NaveTurbin.prototype = Object.create(SupRevolucion.prototype);
NaveTurbin.prototype.constructor = NaveTurbin;
