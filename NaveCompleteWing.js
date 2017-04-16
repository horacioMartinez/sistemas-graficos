function NaveCompleteWing() {
	var profileBuffer = [];
	var curva = new CurvaBSpline();
	var puntosDeControl = [ [0.5,0.5,0], [0.5,-0.5,0], [-0.5,-0.5,0], [-0.5,0.5,0], [0.5,0.5,0], [0.5,-0.5,0] ];
	
	// Perfil
	profileBuffer = curva.getVertices(puntosDeControl, 0.1);

	this.wing = new NaveWingWithTurbin();
	this.wingUnion = new ClosedExtrusion(profileBuffer, 7, "textures/dorado.jpg");
}

NaveCompleteWing.prototype.draw = function(modelMatrix, vel) {

	var rotacion = (Math.PI/2 * vel/50);
	if (rotacion > Math.PI/2){
		rotacion = Math.PI/2;
	}
	if (rotacion < -Math.PI/2){
		rotacion = -Math.PI/2;
	}

	// Dibujamos las Alas
	// Ala 1
	var matWing1 = mat4.clone(modelMatrix);
	mat4.translate(matWing1,matWing1,[0,0.75,-1]);
	mat4.rotateZ(matWing1,matWing1,rotacion);
	this.wing.draw(matWing1);

	// Ala 2
	var matWing = mat4.clone(modelMatrix);
	mat4.translate(matWing,matWing,[0,0.75,6]);	// Separadas a 6 ya que conocemos el ancho de la nave
	mat4.rotateZ(matWing,matWing,rotacion);
	this.wing.draw(matWing);
	
	//Unión de Alas
	var matUnion = mat4.clone(modelMatrix);
	mat4.scale(matUnion,matUnion,[1.5,1.5,1.25]);	
	mat4.translate(matUnion,matUnion,[0,-0.4,-0.5]);	
	this.wingUnion.draw(matUnion);
}
