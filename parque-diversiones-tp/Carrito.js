function Carrito() {
	this.paredLateral = new Extrusion(0.02, [ -0.2, -0.15, -0.2, 0.1, 0.3,
			0.15, 0.3, -0.15, -0.2, -0.15 ]);
	this.paredTrasera = new Extrusion(0.02, [ -0.15, -0.15, -0.15, 0.15, 0.15,
			0.15, 0.15, -0.15, -0.15, -0.15 ]);
	this.paredDelantera = new Extrusion(0.02, [ -0.15, -0.15, -0.15, 0.1, 0.15,
			0.1, 0.15, -0.15, -0.15, -0.15 ]);
	this.piso = new Extrusion(0.48, [ -0.15, -0.025, -0.15, 0.025, 0.15, 0.025,
			0.15, -0.025, -0.15, -0.025 ]);
	var radioRueda = 0.05;
	var nsegRueda = 20;
	var profRueda = 0.05;
	this.cilindro = new Cilindro(radioRueda, profRueda, nsegRueda);
	this.cilindro.initTexture("metal2.jpg");
	this.paredLateral.initTexture("red.png");
	this.paredTrasera.initTexture("red.png");
	this.paredDelantera.initTexture("red.png");
	this.piso.initTexture("red.png");
	this.velRuedas = 1.28;
	this.ang = 0.00;
	this.silla = new CarouselChair();
	this.silla.initTexture("leather.jpg");
}

Carrito.prototype.initReflectionMap = function(ref_map) {
	this.paredLateral.initReflectionMap(ref_map);
	this.paredTrasera.initReflectionMap(ref_map);
	this.paredDelantera.initReflectionMap(ref_map);
	this.silla.initReflectionMap(ref_map);
	this.piso.initReflectionMap(ref_map);
};

Carrito.prototype.dibujar = function(modelMatrix) {

	gl.uniform1f(shaderProgram.reflectionLevel, 0.05);

	despl = -0.0175;

	var matrizSilla = mat4.create(modelMatrix);
	mat4.scale(matrizSilla, [ 0.7, 0.9, 0.7 ]);
	mat4.translate(matrizSilla, [ 0, 0.5, 0.35 ], matrizSilla);
	mat4.rotate(matrizSilla, Math.PI / 2, [ 0.0, 1.0, 0.0 ], matrizSilla);
	mat4.rotate(matrizSilla, Math.PI, [ 1.0, 0.0, 0.0 ], matrizSilla);
	mat4.scale(matrizSilla, [ 0.2, 0.2, 0.2 ]);

	this.silla.draw(matrizSilla);

	matrizSilla = mat4.create(modelMatrix);
	mat4.scale(matrizSilla, [ 0.7, 0.9, 0.7 ]);
	mat4.translate(matrizSilla, [ 0, 0.5, 0.05 ], matrizSilla);
	mat4.rotate(matrizSilla, Math.PI / 2, [ 0.0, 1.0, 0.0 ], matrizSilla);
	mat4.rotate(matrizSilla, Math.PI, [ 1.0, 0.0, 0.0 ], matrizSilla);
	mat4.scale(matrizSilla, [ 0.2, 0.2, 0.2 ]);

	this.silla.draw(matrizSilla);

	gl.uniform1f(shaderProgram.reflectionLevel, 0.15);

	this.ang -= this.velRuedas;
	var matrizParedLateral = mat4.create(modelMatrix);
	mat4.translate(matrizParedLateral, [ 0.0, despl, 0.0 ], matrizParedLateral);
	mat4.translate(matrizParedLateral, [ -0.15, 0.3, 0.0 ], matrizParedLateral);
	mat4.rotate(matrizParedLateral, -Math.PI / 2, [ 0.0, 1.0, 0.0 ],
			matrizParedLateral);

	this.paredLateral.draw(matrizParedLateral);
	matrizParedLateral = mat4.create(modelMatrix);
	mat4.translate(matrizParedLateral, [ 0.0, despl, 0.0 ], matrizParedLateral);
	mat4.translate(matrizParedLateral, [ 0.15, 0.3, 0.0 ], matrizParedLateral);
	mat4.rotate(matrizParedLateral, -Math.PI / 2, [ 0.0, 1.0, 0.0 ],
			matrizParedLateral);

	this.paredLateral.draw(matrizParedLateral);
	var matrizParedTrasera = mat4.create(modelMatrix);
	mat4.translate(matrizParedTrasera, [ 0.0, despl, 0.0 ], matrizParedTrasera);
	mat4.translate(matrizParedTrasera, [ 0.0, 0.3, 0.285 ], matrizParedTrasera);
	this.paredTrasera.draw(matrizParedTrasera);
	var matrizParedDelantera = mat4.create(modelMatrix);
	mat4.translate(matrizParedDelantera, [ 0.0, despl, 0.0 ],
			matrizParedDelantera);
	mat4.translate(matrizParedDelantera, [ 0.0, 0.3, -0.185 ],
			matrizParedDelantera);
	this.paredDelantera.draw(matrizParedDelantera);
	var matrizPiso = mat4.create(modelMatrix);
	mat4.translate(matrizPiso, [ 0.0, despl, 0.0 ], matrizPiso);
	mat4.translate(matrizPiso, [ 0.0, 0.175, 0.05 ], matrizPiso);
	this.piso.draw(matrizPiso);

	var matRueda = mat4.create(modelMatrix);
	mat4.translate(matRueda, [ 0.0, despl, 0.0 ], matRueda);
	mat4.translate(matRueda, [ 0.125, 0.1, 0.25 ], matRueda);
	mat4.rotate(matRueda, Math.PI / 2, [ 0.0, 1.0, 0.0 ], matRueda);
	mat4.rotate(matRueda, this.ang, [ 0.0, 0.0, 1.0 ], matRueda);

	this.cilindro.draw(matRueda);

	matRueda = mat4.create(modelMatrix);
	mat4.translate(matRueda, [ 0.0, despl, 0.0 ], matRueda);
	mat4.translate(matRueda, [ -0.125, 0.1, 0.25 ], matRueda);
	mat4.rotate(matRueda, Math.PI / 2, [ 0.0, 1.0, 0.0 ], matRueda);
	mat4.rotate(matRueda, this.ang, [ 0.0, 0.0, 1.0 ], matRueda);

	this.cilindro.draw(matRueda);

	matRueda = mat4.create(modelMatrix);
	mat4.translate(matRueda, [ 0.0, despl, 0.0 ], matRueda);
	mat4.translate(matRueda, [ 0.125, 0.1, -0.15 ], matRueda);
	mat4.rotate(matRueda, Math.PI / 2, [ 0.0, 1.0, 0.0 ], matRueda);
	mat4.rotate(matRueda, this.ang, [ 0.0, 0.0, 1.0 ], matRueda);

	this.cilindro.draw(matRueda);

	matRueda = mat4.create(modelMatrix);
	mat4.translate(matRueda, [ 0.0, despl, 0.0 ], matRueda);
	mat4.translate(matRueda, [ -0.125, 0.1, -0.15 ], matRueda);
	mat4.rotate(matRueda, Math.PI / 2, [ 0.0, 1.0, 0.0 ], matRueda);
	mat4.rotate(matRueda, this.ang, [ 0.0, 0.0, 1.0 ], matRueda);

	this.cilindro.draw(matRueda);

};

Carrito.prototype.increaseSpeed = function() {
	this.velRuedas *= 2.0;
};

Carrito.prototype.decreaseSpeed = function() {
	this.velRuedas /= 2.0;
};
