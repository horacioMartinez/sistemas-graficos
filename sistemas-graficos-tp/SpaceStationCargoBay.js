function SpaceStationCargoBay() {
	var profileBuffer = [];
	var curva = new CurvaBezierCubica();
	
	// Puntos Internos
	var puntosParedInterna1	= [ [1,1,0], [0.66,1,0], [0.33,1,0], [0,1,0] ];
	var puntosParedInterna2	= [ [0,-1,0], [0.33,-1,0], [0.66,-1,0], [1,-1,0] ];						
	var puntosTechoInterno = [ [0,1,0], [-0.75,1,0], [-0.75,-1,0], [0,-1,0] ];									
	var puntosPisoInterno =  [ [1,-1,0], [1,-0.66,0], [1,0.33,0], [1,1,0] ];	
		
	// Puntos Externos
	var puntosParedExterna2 = [[0,1.75,0], [0,1.7,0], [0,1.6,0], [0,1.5,0],
											 [0.25,1.5,0], [0.5,1.5,0], [1,1.5,0],
										     [1,1.6,0], [1,1.7,0], [1,1.75,0]];
	var puntosVentanaExterna	= [[1,-1.75,0], [1,-1.7,0], [1,-1.6,0], [1,-1.5,0],
											[0.5,-1.5,0], [0.25,-1.5,0], [0,-1.5,0],
											[0,-1.6,0], [0,-1.7,0], [0,-1.75,0]];						
	var puntosTechoExterno = [[0,-1.75,0], [-1.5,-1.75,0], [-1.5,1.75,0], [0,1.75,0]];									
	var puntosPisoExterno =  [[1,1.75,0], [2,1.75,0], [2,-1.75,0], [1,-1.75,0]];							
						
	// Puntos de las tapas			
	var internalPoints = [ [0,-1,0], [-0.75,-1,0], [-0.75,1,0], [0,1,0],
									 [0,1,0], [0,1,0], [0,1,0],			//repito
									 [0,1,0], [0.5,1,0], [1,1,0],
									 [1,1,0], [1,1,0], [1,1,0], 		//repito
									 [1,0.25,0], [1,-0.25,0], [1,-1,0],
									 [1,-1,0], [1,-1,0], [1,-1,0],		//repito
								     [0.5,-1,0], [0.25,-1,0], [-0,-1,0],
								     [0,-1,0], [0,-1,0], [0,-1,0]];		//repito 
									
	var externalPoints = [ [0,-1.75,0], [-1.5,-1.75,0], [-1.5,1.75,0], [0,1.75,0],
										[0,1.7,0], [0,1.6,0], [0,1.5,0],
										[0.25,1.5,0], [0.5,1.5,0], [1,1.5,0],
										[1,1.6,0], [1,1.7,0], [1,1.75,0],

										[2,1.75,0], [2,-1.75,0], [1,-1.75,0],
										[1,-1.7,0], [1,-1.6,0], [1,-1.5,0],
										[0.5,-1.5,0], [0.25,-1.5,0], [0,-1.5,0],
										[0,-1.6,0], [0,-1.7,0], [0,-1.75,0]];

	// Profile Buffer Internos
	var profileBufferParedInterna1 = curva.getVertices(puntosParedInterna1, 0.1);
	var profileBufferParedInterna2 = curva.getVertices(puntosParedInterna2, 0.1);
	var profileBufferTechoInterno = curva.getVertices(puntosTechoInterno, 0.1);
	var profileBufferPisoInterno = curva.getVertices(puntosPisoInterno, 0.1);

	// Profile Buffer Externos
	var profileBufferVentanaExterna = curva.getVertices(puntosVentanaExterna, 0.01);
	var profileBufferParedExterna2 = curva.getVertices(puntosParedExterna2, 0.1);
	var profileBufferTechoExterno = curva.getVertices(puntosTechoExterno, 0.1);
	var profileBufferPisoExterno = curva.getVertices(puntosPisoExterno, 0.1);
	
	// Trayectoria	
	var puntosControl = [[6,-6,0] , [14,14,0],  [-14,14,0], [-6,-6,0] ];
	var trayectoryBuffer = curva.getVertices(puntosControl,0.01);
	
	// Profile Buffer Tapas
	var internalBuffer = curva.getVertices(internalPoints,0.1);
	var externalBuffer = curva.getVertices(externalPoints,0.1);
	
	// Estructuras Internas
	this.paredInterna1 = new SupBarrido(trayectoryBuffer, profileBufferParedInterna1, "textures/paredInterna1.png", 4);
	this.techoInterno = new SupBarrido(trayectoryBuffer, profileBufferTechoInterno, "textures/techo2.jpg", 5);	// 5 luces en el techo
	this.paredInterna2 = new SupBarrido(trayectoryBuffer, profileBufferParedInterna2, "textures/paredInterna1.png", 4);
	this.pisoInterno = new SupBarrido(trayectoryBuffer, profileBufferPisoInterno, "textures/piso.jpg", 5);

	// Estructuras Externas
	this.ventanaExterna = new SupBarrido(trayectoryBuffer, profileBufferVentanaExterna, "textures/ventanal.jpg", 4); // 4 ventanas
	this.techoExterno = new SupBarrido(trayectoryBuffer, profileBufferTechoExterno, "textures/shiphull.png", 5);	
	this.paredExterna2 = new SupBarrido(trayectoryBuffer, profileBufferParedExterna2, "textures/shiphull.png", 4);
	this.pisoExterno = new SupBarrido(trayectoryBuffer, profileBufferPisoExterno, "textures/shiphull.png", 5);

	// Tapas
	this.firstCargoBayCover = new SpaceStationCargoBayCover(internalBuffer, externalBuffer, trayectoryBuffer[0]);
	this.lastCargoBayCover = new SpaceStationCargoBayCover(internalBuffer, externalBuffer, trayectoryBuffer[trayectoryBuffer.length - 1]);
}

SpaceStationCargoBay.prototype.draw = function (modelMatrix) {

	// Dibujo estructuras internas
	this.paredInterna1.draw(modelMatrix);
	this.techoInterno.draw(modelMatrix);
	this.paredInterna2.draw(modelMatrix);
	this.pisoInterno.draw(modelMatrix);
	
	// Dibujo estructuras externas
	this.ventanaExterna.draw(modelMatrix);
	this.techoExterno.draw(modelMatrix);
	this.paredExterna2.draw(modelMatrix);
	this.pisoExterno.draw(modelMatrix);
	
	// Dibujo Tapas	
	this.firstCargoBayCover.draw(modelMatrix);
	this.lastCargoBayCover.draw(modelMatrix);
}
