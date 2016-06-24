function SpaceStationHumanCabin() {
	var profileBuffer = [];
	var curva = new CurvaBSpline();
	var puntosDeControl = [[1.25,-1.25,0], [1.25,1.25,0], [-1.25,1.25,0], [-1.25,-1.25,0], [1.25,-1.25,0], [1.25,1.25,0]];
	
	// Perfil
	profileBuffer = curva.getVertices(puntosDeControl, 0.1);

	ClosedExtrusion.call(this, profileBuffer, 2, "textures/gris.jpg");
}

SpaceStationHumanCabin.prototype = Object.create(ClosedExtrusion.prototype);
SpaceStationHumanCabin.prototype.constructor = SpaceStationHumanCabin;
