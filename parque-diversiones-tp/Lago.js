function BezierCubica2d(vertice1, vertice2, vertice3, vertice4) {
	var vertices3d = [];
	vertices3d.push(vertice1.concat([ 0.0 ]));
	vertices3d.push(vertice2.concat([ 0.0 ]));
	vertices3d.push(vertice3.concat([ 0.0 ]));
	vertices3d.push(vertice4.concat([ 0.0 ]));
	this.bez3d = new BezierCubica(vertices3d[0], vertices3d[1], vertices3d[2],
			vertices3d[3]);
}

BezierCubica2d.prototype.p = function(u) {
	return this.bez3d.p(u).slice(0, 2);
};

function CurvaLago() {
	this.curva1 = new BezierCubica2d([ 2, 0 ], [ 3, 2 ], [ 1, 5 ], [ -1, 4 ]);
	this.curva2 = new BezierCubica2d([ -1, 4 ], [ -3, 3 ], [ -4, 2 ], [ -3, 0 ]);
	this.curva3 = new BezierCubica2d([ -3, 0 ], [ -2, -2 ], [ -2, -5 ],
			[ 0, -6 ]);
	this.curva4 = new BezierCubica2d([ 0, -6 ], [ 2, -7 ], [ 3, -5 ],
			[ 3.1, -4 ]);
	this.curva5 = new BezierCubica2d([ 3.1, -4 ], [ 3.2, -3 ], [ 1, -2 ], [ 2,
			0 ]);
}
CurvaLago.prototype.p = function(u) {
	if (u < 1.0) {
		return this.curva1.p(u).concat(0);
	}
	if (u < 2.0) {
		return this.curva2.p(u - 1.0).concat(0);
	}
	if (u < 3.0) {
		return this.curva3.p(u - 2.0).concat(0);
	}
	if (u < 4.0) {
		return this.curva4.p(u - 3.0).concat(0);
	}
	// if (u < 5.0) {
	return this.curva5.p(u - 4.0).concat(0);
	// }
};
function Lago() {
	var curva = new CurvaLago();
	var tss = subdividirCurva(curva, 0, 4.99, 100, 50000);
	var puntos = [];
	//console.log("cuuc:", curva.p(0));
	for (var i = 0; i < tss.length; i++) {
		puntos = puntos.concat(curva.p(tss[i]).slice(0, 2));
	}
	puntos = puntos.concat(curva.p(0.0).slice(0, 2));
	this.extrusion = new Extrusion(1.0, puntos);
	this.extrusion.setDeltaUV(0.0025, 0.0025);
	this.extrusion.initTexture("water.png", 0.01, 0.01);
	this.extnormal = this.extrusion.getNormals();
}

Lago.prototype.draw = function(modelMatrix) {
	var matrix = mat4.create(modelMatrix);

	mat4.translate(matrix, [ 0.0, 0.0, -0.25 ], matrix);
	this.extrusion.updateTextCoord();
	this.extrusion.draw(matrix);
	for (var i = 0; i < this.extnormal.length; i++) {
		// this.extnormal[i].dibujar(matrix);
	}
};

Lago.prototype.initReflectionMap = function(r_map){
	this.extrusion.initReflectionMap(r_map);
};

Lago.prototype.useReflectionMap = function(){
	return this.extrusion.useReflectionMap;
};

Lago.prototype.initNormalMap = function(n_map){
	this.extrusion.initNormalMap(n_map);
};

Lago.prototype.useNormalMap = function(){
	return this.extrusion.useNormalMap;
};