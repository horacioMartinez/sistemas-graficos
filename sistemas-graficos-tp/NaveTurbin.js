function NaveTurbin() {
	// Definimos el Casco de la Turbina
	var curva = new CurvaBezierCubica();
	var puntosControl = [[0,2,0], [0.25,2,0], [0.5,2,0], [1,2,0],
								  [1.25,2.5,0], [1.75,2.5,0], [2,2,0],
								  [2.5,0.5,0], [1.5,-1.5,0], [0.75,-2,0],
								  [0.75,-1.85,0], [0.75,-1.65,0], [0.75,-1.5,0],
								  [0.5,-1.5,0], [0.25,-1.5,0], [0,-1.5,0] ];
								  					
	var escalado = 1.5;			
	for (var i = 0; i < puntosControl.length; i++) {	// ESCALAMOS ACÁ PARA NO TENER QUE ESCALAR PARA NO
		(puntosControl[i])[0] /= escalado;				// TENER QUE ESCALAR EN CADA TICK => EFICIENCIA!
		(puntosControl[i])[1] /= escalado;
	} 					
	var profileBuffer = curva.getVertices(puntosControl,0.1);
  	this.cascoTurbina = new SupRevolucion(profileBuffer, 15, 'textures/mosaicos.jpg');
  	
  	// Definimos el Plasma de la Turbina
	var puntosPlasmaSuperior = [[0,2,0], [0.25,2,0], [0.5,2,0], [1,2,0]];
	var puntosPlasmaInferior = [[0,-1.5,0], [0.25,-1.5,0], [0.5,-1.5,0], [0.75,-1.5,0]];
	
	var escalado = 1.5;			
	for (var i = 0; i < puntosPlasmaSuperior.length; i++) {	// ESCALAMOS ACÁ PARA NO TENER QUE ESCALAR PARA NO
		(puntosPlasmaSuperior[i])[0];						// TENER QUE ESCALAR EN CADA TICK => EFICIENCIA!
		(puntosPlasmaSuperior[i])[1] -= 0.5;
		(puntosPlasmaInferior[i])[0] /= escalado;			
		(puntosPlasmaInferior[i])[1] = (puntosPlasmaInferior[i][1] / escalado -0.25);
	} 	
	var profileBufferPlasmaSuperior = curva.getVertices(puntosPlasmaSuperior,0.1);
	var profileBufferPlasmaInferior = curva.getVertices(puntosPlasmaInferior,0.1);

  	this.plasmaSuperior = new SupRevolucion(profileBufferPlasmaSuperior, 15, 'textures/shiphull_normalmap.jpg');
  	this.plasmaInferior = new SupRevolucion(profileBufferPlasmaInferior, 15, 'textures/shiphull_normalmap.jpg');								 
}

NaveTurbin.prototype.draw = function(modelMatrix) {
	this.cascoTurbina.draw(modelMatrix);
	
	gl.uniform1i(shaderProgram.useAutoIlumination, true);	// Ponemos Autoiluminacion
	gl.uniform1f(shaderProgram.autoIluminationIntensity, 5);
	this.plasmaSuperior.draw(modelMatrix);
	this.plasmaInferior.draw(modelMatrix);
	gl.uniform1f(shaderProgram.autoIluminationIntensity, 2);
	gl.uniform1i(shaderProgram.useAutoIlumination, false);	// Scamos Autoiluminacion
}
