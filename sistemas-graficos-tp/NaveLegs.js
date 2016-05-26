function NaveLegs() {
    this.leg = new NaveLeg();
}

NaveLegs.prototype.draw = function (modelMatrix) {
	mat4.translate(modelMatrix, modelMatrix, [6,-6,4.5]);
	mat4.rotate(modelMatrix, modelMatrix, Math.PI/2, [0,1,0]);
	mat4.rotate(modelMatrix, modelMatrix, -Math.PI/2, [1,0,0]);

	var matLeg2 = mat4.clone(modelMatrix);
	mat4.translate(matLeg2, matLeg2, [3,0,0]);
	var matLeg3 = mat4.clone(modelMatrix);
	mat4.translate(matLeg3, matLeg3, [2,12,0]);
	mat4.rotate(matLeg3, matLeg3, Math.PI, [0,0,1]);

	this.leg.draw(modelMatrix);
	this.leg.draw(matLeg2);	
	this.leg.draw(matLeg3);	
}
