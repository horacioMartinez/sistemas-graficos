function SpaceStationCylinder() {
	var profileBuffer = [];
	var curva = new CurvaBSpline();
	var puntosDeControl = [ [0.5,0.5,0], [0.5,-0.5,0], [-0.5,-0.5,0], [-0.5,0.5,0], [0.5,0.5,0], [0.5,-0.5,0] ];
	
	// Perfil
	profileBuffer = curva.getVertices(puntosDeControl, 0.1);

	ClosedExtrusion.call(this, profileBuffer, 7, "textures/dorado.jpg");
}

SpaceStationCylinder.prototype = Object.create(ClosedExtrusion.prototype);
SpaceStationCylinder.prototype.constructor = SpaceStationCylinder;
