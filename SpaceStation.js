function SpaceStation() {
	this.cargo_bay = new SpaceStationCargoBay();
	this.center = new SpaceStationCenter();
	this.pipe = new SpaceStationCylinder();
	this.mangueraAstronauta = new MangueraAstronauta();
	this.human_cabin =new SpaceStationHumanCabin();
}

SpaceStation.prototype.draw = function(modelMatrix) {

	// Dibujamos la estación circular
	var matCargoBay = mat4.clone(modelMatrix);
	mat4.translate(matCargoBay,matCargoBay,[0,0.5,0]);
	mat4.rotateX(matCargoBay,matCargoBay,Math.PI/2);
	this.cargo_bay.draw(matCargoBay);
	
	// Dibujamos la superficie de revolución del medio
	var matCenter = mat4.clone(modelMatrix);
	mat4.translate(matCenter,matCenter,[0,0.75,1.25]);
	this.center.draw(matCenter);
	
	// Dibujamos los cilindros del centro
	gl.uniform1i(shaderProgram.useReflectionUniform, true);		// Ponemos la reflexion
    gl.uniform1f(shaderProgram.reflectFactorUniform, 0.6);
	var cant_cilindros = 6;
	for (var i = 1; i < cant_cilindros + 1; ++i) {
		var angle = Math.PI + (i * Math.PI * 2 / (cant_cilindros + 1));

		var matCilinder = mat4.clone(modelMatrix);
		mat4.translate(matCilinder,matCilinder,[0,0,1.25]);
		mat4.rotate(matCilinder,matCilinder,angle,[0,1,0]);
		this.pipe.draw(matCilinder);
	}
	gl.uniform1i(shaderProgram.useReflectionUniform, false);	// Sacamos la reflexion

	var matManguera = mat4.clone(modelMatrix);
	mat4.translate(matManguera,matManguera, [10.1,-1.7,3]);
	mat4.scale(matManguera,matManguera,[0.3,0.3,0.3]);
	this.mangueraAstronauta.draw(matManguera);
	
	// Dibujamos las Cabinas
	var cant_cilindros = 3;
	for (var i = 1; i < cant_cilindros + 1; ++i) {
		var angle = Math.PI + (i * Math.PI * 2 / (cant_cilindros + 1));

		var matCilinder = mat4.clone(modelMatrix);
		mat4.rotate(matCilinder,matCilinder,angle,[0,1,0]);
		
		if (i == 2) {
			mat4.translate(matCilinder,matCilinder,[0,0,2]);
		}
		mat4.translate(matCilinder,matCilinder,[0,0,8.25]);
		//this.human_cabin.draw(matCilinder);
	}
}
