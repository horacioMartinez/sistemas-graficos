function SpaceStationCabin() {
	var profileBuffer = [];
	var curva = new CurvaBSpline();
	var puntosDeControl = [[0.5,-0.5,0], [0.5,0.5,0], [-0.5,0.5,0], [-0.5,-0.5,0], [0.5,-0.5,0], [0.5,0.5,0]];

	//var curva = new CurvaBezierCubica();
	//var puntosDeControl = [[0.5,0,0], [1,1,0], [-1,1,0], [-0.5,0,0], 
		//							  [-1,-1,0], [1,-1,0], [0.5,0,0]];
	
	// Perfil
	profileBuffer = curva.getVertices(puntosDeControl, 0.1);

	ClosedExtrusion.call(this, profileBuffer, 7, "textures/metal.jpg");
}

SpaceStationCabin.prototype = Object.create(ClosedExtrusion.prototype);
SpaceStationCabin.prototype.constructor = SpaceStationCabin;
