function Cilindro(radio, largo, nseg) {
	var vertices = [];
	var circulo = new Circle(radio, 0.0, 0.0, 0.0);
	var d = 1.0 / nseg;
	for (var i = 0; i < nseg; i++) {
		var u = d * i;
		var pos = circulo.p(u);
		vertices = vertices.concat([ pos[0], pos[1] ]);
	}
	pos = circulo.p(0.0);
	vertices = vertices.concat([ pos[0], pos[1] ]);
	this.extrusion = new Extrusion(largo, vertices);
}

Cilindro.prototype.initTexture = function(texture) {
	this.extrusion.initTexture(texture);
};

Cilindro.prototype.draw = function(modelMatrix) {
	this.extrusion.draw(modelMatrix);
};
