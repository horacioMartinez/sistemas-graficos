function SpaceStationHumanCabin() {
	var profileBuffer = [];
	var curva = new CurvaBSpline();
	var puntosDeControl = [[1.25,1.25,0], [1.25,-1.25,0], [-1.25,-1.25,0], [-1.25,1.25,0],[1.25,1.25,0], [1.25,-1.25,0]];

	// Perfil
	profileBuffer = curva.getVertices(puntosDeControl, 0.1);

	this.cabina = new ClosedExtrusion(profileBuffer, 2, "textures/gri.jpg");
}

SpaceStationHumanCabin.prototype.draw = function (modelMatrix) {
	gl.uniform1i(shaderProgram.useTextureUniform, false);		// Sin Textura
	gl.uniform4f(shaderProgram.colorWOTextureUniform, 0.1, 0.1, 0.1, 1.0);	// Color
		this.cabina.draw(modelMatrix);
	gl.uniform4f(shaderProgram.colorWOTextureUniform, 1.0, 1.0, 1.0, 1.0);
	gl.uniform1i(shaderProgram.useTextureUniform, true);		// Con Textura
}
