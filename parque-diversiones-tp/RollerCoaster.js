RollerCoaster.prototype.initTextures = function() {
	this.durmiente.initTexture("metal2.jpg");
	this.rielIzq.initTexture("metal.jpg");
	this.poste.initTexture("metal2.jpg");
	this.rielDer.initTexture("metal.jpg");
	this.rielCentral.initTexture("metal2.jpg");
};

RollerCoaster.prototype.initReflectionMap = function(ref_map){
	this.useReflectionMap = true;
	this.rielDer.initReflectionMap(ref_map);
	this.rielIzq.initReflectionMap(ref_map);
	this.rielCentral.initReflectionMap(ref_map);
	this.carro.initReflectionMap(ref_map);
};

RollerCoaster.prototype.construirRieles = function() {

	var circle = new Circle(0.0375, -0.1, 0.0, 0.0);

	// var poligonoRielIzq = [ -0.15, -0.05, 0.0, -0.15, 0.05, 0.0, -0.1, 0.05,
	// 0.0, -0.1, -0.05, 0.0, -0.15, -0.05, 0.0 ];
	var poligonoRielIzq = [];
	var nseg = 10;
	var d = 1.0 / nseg;

	for (var i = 0; i < nseg + 1; i++) {
		poligonoRielIzq = poligonoRielIzq.concat(circle.p(d * i));
	}

	circle = new Circle(0.0375, 0.1, 0.0, 0.0);

	// var poligonoRielIzq = [ -0.15, -0.05, 0.0, -0.15, 0.05, 0.0, -0.1, 0.05,
	// 0.0, -0.1, -0.05, 0.0, -0.15, -0.05, 0.0 ];
	var poligonoRielDer = [];

	for (var i = 0; i < nseg + 1; i++) {
		poligonoRielDer = poligonoRielDer.concat(circle.p(d * i));
	}
	circle = new Circle(0.0125, 0.0, -0.02, 0.0);

	// var poligonoRielIzq = [ -0.15, -0.05, 0.0, -0.15, 0.05, 0.0, -0.1, 0.05,
	// 0.0, -0.1, -0.05, 0.0, -0.15, -0.05, 0.0 ];
	var poligonoRielCentral = [];

	for (var i = 0; i < nseg + 1; i++) {
		poligonoRielCentral = poligonoRielCentral.concat(circle.p(d * i));
	}
	circle = new Circle(0.0375, -0.1, 0.0, 0.0);
	var normalesRielIzq = [];
	for (var i = 0; i < nseg + 1; i++) {
		normalesRielIzq = normalesRielIzq.concat(circle.n(d * i));
	}
	circle = new Circle(0.0375, 0.1, 0.0, 0.0);
	var normalesRielDer = [];
	for (var i = 0; i < nseg + 1; i++) {
		normalesRielDer = normalesRielDer.concat(circle.n(d * i));
	}
	circle = new Circle(0.0125, 0.0, -0.02, 0.0);
	var normalesRielCentral = [];
	for (var i = 0; i < nseg + 1; i++) {
		normalesRielCentral = normalesRielCentral.concat(circle.n(d * i));
	}
	this.rielIzq = new Tube(normalesRielIzq, poligonoRielIzq, this.curva,
			this.ts);

	this.rielDer = new Tube(normalesRielDer, poligonoRielDer, this.curva,
			this.ts);

	this.rielCentral = new Tube(normalesRielCentral, poligonoRielCentral,
			this.curva, this.ts);

};

function RollerCoaster() {

	this.curva = new MonRusaConLoop();

	// Obtengo los valores de t para tener aprox. 300 segmentos.
	var nSegmentos = 300;
	var detalle = 10000;
	this.ts = subdividirCurva(this.curva, 0, 9.99, nSegmentos, detalle);

	var radioPoste = 0.024;
	var nSegmentosPoste = 10;

	this.poste = new Cilindro(radioPoste, 1.0, nSegmentosPoste);

	var poligonoFrenteDurmiente = [ -0.1, -0.02, -0.1, 0.02, 0.0, 0.0, 0.1,
			0.02, 0.1, -0.02, 0.0, -0.05, -0.1, -0.02 ];

	var anchoDurmiente = 0.05;
	this.durmiente = new Extrusion(anchoDurmiente, poligonoFrenteDurmiente);

	this.construirRieles();

	this.carro = new Carrito();
	this.timer_mrusa = 0.0;
	this.posicionCarro = [];
	this.ucarr = 0.0;
	this.initTextures();
	this.useReflectionMap = false;
}

RollerCoaster.prototype.draw = function(modelMatrix) {
	this.avanzarTemporizador();
	this.rielIzq.draw(modelMatrix);
	var lines = this.rielCentral.getNorms();
	for (var i = 0; i < lines.length / 10; i++) {
		// lines[i].dibujar(modelMatrix);
	}

	this.rielDer.draw(modelMatrix);
	this.rielCentral.draw(modelMatrix);
	for (var i = 0; i < this.ts.length; i++) {
		var u = this.ts[i];
		var tangente = this.curva.t(u);
		var normal = calcularNormal(tangente);
		var binormal = calcularBinormal(tangente, normal);
		var pos = this.curva.p(u);
		var matriz = matrizAlinear(normal, binormal, tangente, pos);
		mat4.multiply(modelMatrix, matriz, matriz);
		this.durmiente.draw(matriz);
		if (i % 5 == 0 && (u < 0.3 || u > 1.0)) {
			var mPoste = mat4.create(modelMatrix);
			mat4.translate(mPoste, pos, mPoste);
			var angulo = Math.atan(tangente[1] / tangente[0]) + Math.PI / 2;
			mat4.rotate(mPoste, angulo, [ 0.0, 0.0, 1.0 ], mPoste);
			mat4.translate(mPoste, [ 0.125, 0.0, 0.0 ], mPoste);
			mat4.scale(mPoste, [ 1.0, 1.0, pos[2] ], mPoste);
			mat4.translate(mPoste, [ 0.0, 0.0, -0.5 ], mPoste);
			this.poste.draw(mPoste);
			mPoste = mat4.create(modelMatrix);
			mat4.translate(mPoste, pos, mPoste);
			mat4.rotate(mPoste, angulo, [ 0.0, 0.0, 1.0 ], mPoste);
			mat4.translate(mPoste, [ -0.125, 0.0, 0.0 ], mPoste);
			mat4.scale(mPoste, [ 1.0, 1.0, pos[2] ], mPoste);
			mat4.translate(mPoste, [ 0.0, 0.0, -0.5 ], mPoste);
			this.poste.draw(mPoste);

		}
	}

	var mtangente = this.curva.t(this.ucarr);
	var mnormal = calcularNormal(mtangente);
	var mbinormal = calcularBinormal(mtangente, mnormal);
	var mpos = this.curva.p(this.ucarr);
	var matriz = matrizAlinear(mnormal, mbinormal, mtangente, mpos);
	mat4.multiply(modelMatrix, matriz, matriz);
	this.carro.dibujar(matriz);
};

RollerCoaster.prototype.avanzarTemporizador = function() {
	this.ucarr = 9.99 - this.timer_mrusa;
	var deltaT = 0.0;
	if (this.ucarr < 0.25) {
		deltaT = 0.0085;
	} else if (this.ucarr < 0.5) {
		deltaT = 0.0075;
	} else if (this.ucarr < 0.75) {
		deltaT = 0.006;
	} else if (this.ucarr < 0.98) {
		deltaT = 0.004;
	} else if (this.ucarr < 1.0) {
		deltaT = 0.0015;
	} else if (this.ucarr < 1.05) {
		deltaT = 0.01;
	} else if (this.ucarr < 1.25) {
		deltaT = 0.03;
	} else if (this.ucarr < 2.0) {
		deltaT = 0.055;
	} else if (this.ucarr < 2.5) {
		deltaT = 0.04;
	} else if (this.ucarr < 3.0) {
		deltaT = 0.03;
	} else if (this.ucarr < 4.0) {
		deltaT = 0.02;
	} else if (this.ucarr < 5.0) {
		deltaT = 0.025;
	} else if (this.ucarr < 6.0) {
		deltaT = 0.03;
	} else if (this.ucarr < 6.5) {
		deltaT = 0.025;
	} else if (this.ucarr < 7.0) {
		deltaT = 0.015;
	} else if (this.ucarr < 8.0) {
		deltaT = 0.015;
	} else if (this.ucarr < 9.0) {
		deltaT = 0.0175;
	} else if (this.ucarr < 10.0) {
		deltaT = 0.02;
	}
	if (this.timer_mrusa < 1.0 && this.timer_mrusa + deltaT / velocidad > 1.0)
		this.timer_mrusa = 1.0;
	else
		this.timer_mrusa += 0.5 * deltaT / velocidad;
	if (this.timer_mrusa >= 9.99)
		this.timer_mrusa = 0.0;
};

RollerCoaster.prototype.obtenerPosicionCarro = function() {
	return this.curva.p(9.99 - this.timer_mrusa);
};

RollerCoaster.prototype.obtenerDireccionCarro = function() {
	var aux = this.curva.t(9.99 - this.timer_mrusa);
	vec3.subtract([ 0.0, 0.0, 0.0 ], aux, aux);
	return aux;
};

RollerCoaster.prototype.obtenerDireccionBinormal = function() {
	return calcularBinormal(this.curva.t(9.99 - this.timer_mrusa),
			calcularNormal(this.curva.t(9.99 - this.timer_mrusa)));
};
RollerCoaster.prototype.obtenerDireccionNormal = function() {
	return calcularNormal(this.curva.t(9.99 - this.timer_mrusa));
};

RollerCoaster.prototype.increaseCarritoSpeed = function() {
	this.carro.increaseSpeed();
};

RollerCoaster.prototype.decreaseCarritoSpeed = function() {
	this.carro.decreaseSpeed();
};
