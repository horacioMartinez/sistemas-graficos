function Nave() {
	this.casco = new NaveCasco(6, 7);
}

Nave.prototype.draw = function(modelMatrix) {
	
	this.casco.draw(modelMatrix);
	
}
