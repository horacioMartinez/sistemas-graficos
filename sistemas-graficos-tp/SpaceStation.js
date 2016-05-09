function SpaceStation() {
	this.cargo_bay = new SpaceStationCargoBay();
	this.center = new SpaceStationCenter();
	this.cabin = new SpaceStationCabin();

	this.pipe = new SpaceStationCabin();
}

SpaceStation.prototype.draw = function(modelMatrix) {
	
	// Dibujamos la estación circular
	this.cargo_bay.draw(modelMatrix);
	
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
}
