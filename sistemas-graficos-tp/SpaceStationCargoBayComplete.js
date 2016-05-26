function SpaceStationCargoBayComplete() {
	var profileBuffer = [];
	var curva = new CurvaBezierCubica();										
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

	var internalBuffer = curva.getVertices(internalPoints,0.1);
	var externalBuffer = curva.getVertices(externalPoints,0.1);
	profileBuffer = internalBuffer.concat( externalBuffer );
	var curva = new CurvaBezierCubica();
	var puntosControl = [[4,-4,0] , [10,10,0],  [-10,10,0], [-4,-4,0] ];
	var trayectoryBuffer = curva.getVertices(puntosControl,0.1);
	
	this.cargoBay = new SpaceStationCargoBay(trayectoryBuffer, profileBuffer);
	this.firstCargoBayCover = new SpaceStationCargoBayCover(internalBuffer, externalBuffer, trayectoryBuffer[0]);
	this.lastCargoBayCover = new SpaceStationCargoBayCover(internalBuffer, externalBuffer, trayectoryBuffer[trayectoryBuffer.length - 1]);
}

SpaceStationCargoBayComplete.prototype.draw = function (modelMatrix) {
	this.cargoBay.draw(modelMatrix);	
	this.firstCargoBayCover.draw(modelMatrix);
	this.lastCargoBayCover.draw(modelMatrix);
}
