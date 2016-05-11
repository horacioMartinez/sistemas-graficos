function NaveCompleteWing() {
	this.wing = new NaveWingWithTurbin();
	this.wingUnion = new SpaceStationCabin();
}

NaveCompleteWing.prototype.draw = function(modelMatrix) {
	// Dibujamos las Alas
	// Ala 1
	this.wing.draw(modelMatrix);

	
	// Ala 2
	var matWing = mat4.clone(modelMatrix);
	mat4.translate(matWing,matWing,[0,0,7]);	// Separadas a 7 ya que conocemos el ancho de la nave
	this.wing.draw(matWing);
	
	//Unión de Alas
	var matUnion = mat4.clone(modelMatrix);
	mat4.scale(matUnion,matUnion,[1.5,1.5,2]);	
	mat4.translate(matUnion,matUnion,[0,-0.4,-0.5]);	
	this.wingUnion.draw(matUnion);
}
