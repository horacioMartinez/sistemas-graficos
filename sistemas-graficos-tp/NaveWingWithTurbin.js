function NaveWingWithTurbin() {
	this.wing = new NaveWing();
	this.turbin = new NaveTurbin();
}

NaveWingWithTurbin.prototype.draw = function(modelMatrix) {
	// Dibujamos el ala
	this.wing.draw(modelMatrix);
	
	// Dibujamos las turbinas
	var matTurbin1 = mat4.clone(modelMatrix);
	mat4.translate(matTurbin1,matTurbin1,[6,0.75,0.5]);
	this.turbin.draw(matTurbin1);
	
	var matTurbin2 = mat4.clone(modelMatrix);
	mat4.translate(matTurbin2,matTurbin2,[-6,0.75,0.5]);
	this.turbin.draw(matTurbin2);
}
