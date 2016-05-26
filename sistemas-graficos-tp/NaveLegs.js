function NaveLegs() {
    this.leg = new NaveLeg();
	this.patasCerradas = false;
	this.initListeners();
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

	var matleg1 = mat4.clone(modelMatrix);

	if (this.patasCerradas){
		mat4.scale(matleg1,matleg1,[0,0,0]);
		mat4.scale(matLeg2,matLeg2,[0,0,0]);
		mat4.scale(matLeg3,matLeg3,[0,0,0]);
	}
	this.leg.draw(matleg1);
	this.leg.draw(matLeg2);	
	this.leg.draw(matLeg3);
};


NaveLegs.prototype.initListeners = function () {
	var self = this;

	window.addEventListener("keydown", function (e) {
		var tecla = e.keyCode;

		if (tecla == 82) // R
			self.patasCerradas = true;
		if (tecla == 84) // T
			self.patasCerradas = false;
	});

};