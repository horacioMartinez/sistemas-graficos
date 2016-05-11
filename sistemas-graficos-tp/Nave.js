function Nave() {
	this.casco = new NaveCasco(6, 9);
	this.wing = new NaveCompleteWing();
	this.leg = new NaveLeg();
}

Nave.prototype.draw = function(modelMatrix) {
	mat4.scale(modelMatrix,modelMatrix,[0.2,0.2,0.2]);
	mat4.translate(modelMatrix,modelMatrix,[-40,20,-20]);	
	// Dibujamos el Casco
	var matCasco = mat4.clone(modelMatrix);
	mat4.translate(matCasco,matCasco,[-12,-3,0]);
	this.casco.draw(matCasco);
	
	// Dibujamos las Alas
	this.wing.draw(modelMatrix);
	
	// Dibujamos las Patas
	//this.leg.draw(modelMatrix);
}
