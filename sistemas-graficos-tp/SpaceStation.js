function SpaceStation() {
	this.cargo_bay = new SpaceStationCargoBayComplete();
	this.center = new SpaceStationCenter();
	this.cabin = new SpaceStationCabin();
	this.pipe = new SpaceStationCabin();
	this.mangueraAstronauta = new MangueraAstronauta();
}

SpaceStation.prototype.draw = function(modelMatrix) {

	// Dibujamos la estación circular
	var matCargoBay = mat4.clone(modelMatrix);
	mat4.translate(matCargoBay,matCargoBay,[0,0.5,0]);
	mat4.rotateX(matCargoBay,matCargoBay,Math.PI/2);
	this.cargo_bay.draw(matCargoBay);

	// Dibujamos la superficie de revolución del medio
	var matCenter = mat4.clone(modelMatrix);
	mat4.translate(matCenter,matCenter,[0,0.75,0]);
	this.center.draw(matCenter);
	
	// Dibujamos los cilindros del centro
	var cant_cilindros = 6;
	for (var i = 1; i < cant_cilindros + 1; ++i) {
		var angle = i * Math.PI * 2 / (cant_cilindros + 1);

		var matCilinder = mat4.clone(modelMatrix);
		mat4.rotate(matCilinder,matCilinder,angle,[0,1,0]);
		mat4.translate(matCilinder,matCilinder,[0,0,-4]);
		this.pipe.draw(matCilinder);
	}

	var matManguera = mat4.clone(modelMatrix);
	mat4.translate(matManguera,matManguera, [10.1,-1.7,3]);
	mat4.scale(matManguera,matManguera,[0.3,0.3,0.3]);
	this.mangueraAstronauta.draw(matManguera);
}
