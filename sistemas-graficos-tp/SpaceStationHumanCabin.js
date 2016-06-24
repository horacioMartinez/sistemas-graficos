function SpaceStationHumanCabin() {
	var profileBuffer = [];
	var curva = new CurvaBSpline();
	var puntosDeControl = [[1.25,1.25,0], [1.25,-1.25,0], [-1.25,-1.25,0], [-1.25,1.25,0],[1.25,1.25,0], [1.25,-1.25,0]];

	// Perfil
	profileBuffer = curva.getVertices(puntosDeControl, 0.1);

	this.cabina = new ClosedExtrusion(profileBuffer, 2, "textures/gris.jpg");
}

SpaceStationHumanCabin.prototype.draw = function (modelMatrix) {
	this.cabina.draw(modelMatrix);
}
