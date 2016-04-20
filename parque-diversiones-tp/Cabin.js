function Cabin() {
	this.texture = "red.png";
	this.width = 2.0;
	this.depth = 1.5;
	this.height = 4.0;
	this.windowUp = 0.18 * this.height;
	this.windowDown = 0.6 * this.height;
	this.roof = new CabinRoof(this.width, this.depth, this.height,
			this.windowUp);
	this.roof.initTexture(this.texture);
	this.floor = new CabinFloor(this.width, this.depth, this.height,
			this.windowDown);
	this.floor.initTexture(this.texture);
	this.column = new CabinColumn(this.windowDown - this.windowUp);
	this.column.initTexture(this.texture);
}

Cabin.prototype.draw = function(modelMatrix) {
	this.roof.draw(modelMatrix);
	this.floor.draw(modelMatrix);

	var mCol = mat4.create();

	var mScale = mat4.create();
	mat4.identity(mScale);
	mat4.scale(mScale, [ 0.1 * this.width, 0.1 * this.depth, 1.0 ]);

	var mRotate = mat4.create();
	mat4.identity(mRotate);
	mat4.rotate(mRotate, Math.PI / 2.0, [ 0.0, 0.0, 1.0 ]);

	var matTranslate = mat4.create();
	mat4.identity(matTranslate);
	mat4.translate(matTranslate, [ -0.5 * this.width, -0.5 * this.depth,
			this.windowUp ]);

	mat4.identity(mCol);
	mat4.multiply(mCol, modelMatrix);
	mat4.multiply(mCol, matTranslate);
	mat4.multiply(mCol, mScale);
	this.column.draw(mCol);

	mat4.identity(matTranslate);
	mat4.translate(matTranslate, [ 0.5 * this.width, -0.5 * this.depth,
			this.windowUp ]);

	mat4.identity(mCol);
	mat4.multiply(mCol, modelMatrix);
	mat4.multiply(mCol, matTranslate);
	mat4.multiply(mCol, mScale);
	mat4.multiply(mCol, mRotate);
	this.column.draw(mCol);

	mat4.identity(matTranslate);
	mat4.translate(matTranslate, [ 0.5 * this.width, 0.5 * this.depth,
			this.windowUp ]);

	mat4.identity(mCol);
	mat4.multiply(mCol, modelMatrix);
	mat4.multiply(mCol, matTranslate);
	mat4.multiply(mCol, mScale);
	mat4.multiply(mCol, mRotate);
	mat4.multiply(mCol, mRotate);
	this.column.draw(mCol);

	mat4.identity(matTranslate);
	mat4.translate(matTranslate, [ -0.5 * this.width, 0.5 * this.depth,
			this.windowUp ]);

	mat4.identity(mCol);
	mat4.multiply(mCol, modelMatrix);
	mat4.multiply(mCol, matTranslate);
	mat4.multiply(mCol, mScale);
	mat4.multiply(mCol, mRotate);
	mat4.multiply(mCol, mRotate);
	mat4.multiply(mCol, mRotate);
	this.column.draw(mCol);
};

function CabinRoof(w, d, h, winUp) {
	this.width = w;
	this.depth = d;
	this.height = h;
	this.windowUp = winUp;
	Grid.call(this, 3, 8);
}

inheritPrototype(CabinRoof, Grid);

CabinRoof.prototype.createPositionBuffer = function() {
	this.position_buffer = [];
	this.normal_buffer = [];
	this.texture_coord_buffer = [];

	// Centro en la punta del techo:
	for (var i = 0; i <= 8; ++i) {
		this.addPoint(0, 0, 0);
	}
	// Rectangulo:
	var z = 0.07 * this.height;
	this.addPoint(-0.45 * this.width, 0.45 * this.depth, z);
	this.addPoint(-0.45 * this.width, 0.45 * this.depth, z);

	this.addPoint(0.45 * this.width, 0.45 * this.depth, z);
	this.addPoint(0.45 * this.width, 0.45 * this.depth, z);

	this.addPoint(0.45 * this.width, -0.45 * this.depth, z);
	this.addPoint(0.45 * this.width, -0.45 * this.depth, z);

	this.addPoint(-0.45 * this.width, -0.45 * this.depth, z);
	this.addPoint(-0.45 * this.width, -0.45 * this.depth, z);

	this.addPoint(-0.45 * this.width, 0.45 * this.depth, z);

	// Abro triangulitos:
	z = 0.12 * this.height;
	this.addPoint(-0.5 * this.width, 0.45 * this.depth, z);
	this.addPoint(-0.45 * this.width, 0.5 * this.depth, z);

	this.addPoint(0.45 * this.width, 0.5 * this.depth, z);
	this.addPoint(0.5 * this.width, 0.45 * this.depth, z);

	this.addPoint(0.5 * this.width, -0.45 * this.depth, z);
	this.addPoint(0.45 * this.width, -0.5 * this.depth, z);

	this.addPoint(-0.45 * this.width, -0.5 * this.depth, z);
	this.addPoint(-0.5 * this.width, -0.45 * this.depth, z);

	this.addPoint(-0.5 * this.width, 0.45 * this.depth, z);

	// Llego a la ventana:
	var z = this.windowUp;
	this.addPoint(-0.5 * this.width, 0.45 * this.depth, z);
	this.addPoint(-0.45 * this.width, 0.5 * this.depth, z);

	this.addPoint(0.45 * this.width, 0.5 * this.depth, z);
	this.addPoint(0.5 * this.width, 0.45 * this.depth, z);

	this.addPoint(0.5 * this.width, -0.45 * this.depth, z);
	this.addPoint(0.45 * this.width, -0.5 * this.depth, z);

	this.addPoint(-0.45 * this.width, -0.5 * this.depth, z);
	this.addPoint(-0.5 * this.width, -0.45 * this.depth, z);

	this.addPoint(-0.5 * this.width, 0.45 * this.depth, z);

};

CabinRoof.prototype.addPoint = function(x, y, z) {
	this.normal_buffer.push(x);
	this.normal_buffer.push(y);
	this.normal_buffer.push(z);

	this.texture_coord_buffer.push(x / this.width);
	this.texture_coord_buffer.push(y / this.depth);

	this.position_buffer.push(x);
	this.position_buffer.push(y);
	this.position_buffer.push(z);
};

function CabinFloor(w, d, h, winDown) {
	this.width = w;
	this.depth = d;
	this.height = h;
	this.windowDown = winDown;
	Grid.call(this, 3, 8);
}

inheritPrototype(CabinFloor, Grid);

CabinFloor.prototype.createPositionBuffer = function() {
	this.position_buffer = [];
	this.normal_buffer = [];
	this.texture_coord_buffer = [];

	// Parte baja de la ventana
	var z = this.windowDown;
	this.addPoint(-0.5 * this.width, 0.45 * this.depth, z);
	this.addPoint(-0.45 * this.width, 0.5 * this.depth, z);

	this.addPoint(0.45 * this.width, 0.5 * this.depth, z);
	this.addPoint(0.5 * this.width, 0.45 * this.depth, z);

	this.addPoint(0.5 * this.width, -0.45 * this.depth, z);
	this.addPoint(0.45 * this.width, -0.5 * this.depth, z);

	this.addPoint(-0.45 * this.width, -0.5 * this.depth, z);
	this.addPoint(-0.5 * this.width, -0.45 * this.depth, z);

	this.addPoint(-0.5 * this.width, 0.45 * this.depth, z);

	// Empiezo a cerrar triangulos
	var z = 0.9 * this.height;
	this.addPoint(-0.5 * this.width, 0.45 * this.depth, z);
	this.addPoint(-0.45 * this.width, 0.5 * this.depth, z);

	this.addPoint(0.45 * this.width, 0.5 * this.depth, z);
	this.addPoint(0.5 * this.width, 0.45 * this.depth, z);

	this.addPoint(0.5 * this.width, -0.45 * this.depth, z);
	this.addPoint(0.45 * this.width, -0.5 * this.depth, z);

	this.addPoint(-0.45 * this.width, -0.5 * this.depth, z);
	this.addPoint(-0.5 * this.width, -0.45 * this.depth, z);

	this.addPoint(-0.5 * this.width, 0.45 * this.depth, z);

	// Cierro triangulitos:
	var z = this.height;
	this.addPoint(-0.45 * this.width, 0.45 * this.depth, z);
	this.addPoint(-0.45 * this.width, 0.45 * this.depth, z);

	this.addPoint(0.45 * this.width, 0.45 * this.depth, z);
	this.addPoint(0.45 * this.width, 0.45 * this.depth, z);

	this.addPoint(0.45 * this.width, -0.45 * this.depth, z);
	this.addPoint(0.45 * this.width, -0.45 * this.depth, z);

	this.addPoint(-0.45 * this.width, -0.45 * this.depth, z);
	this.addPoint(-0.45 * this.width, -0.45 * this.depth, z);

	this.addPoint(-0.45 * this.width, 0.45 * this.depth, z);

	// Piso:
	for (var i = 0; i <= 8; ++i) {
		this.addPoint(0, 0, z);
	}
};

CabinFloor.prototype.addPoint = function(x, y, z) {
	this.normal_buffer.push(x);
	this.normal_buffer.push(y);
	this.normal_buffer.push(z);

	this.texture_coord_buffer.push(x / this.width);
	this.texture_coord_buffer.push(y / this.depth);

	this.position_buffer.push(x);
	this.position_buffer.push(y);
	this.position_buffer.push(z);
};

function CabinColumn(h) {
	this.height = h;
	Grid.call(this, 1, 3);
}

inheritPrototype(CabinColumn, Grid);

CabinColumn.prototype.createPositionBuffer = function() {
	this.position_buffer = [];
	this.normal_buffer = [];
	this.texture_coord_buffer = [];

	this.addPoint(2.0, 0.0, 0.0);
	this.addPoint(0.5, 0.0, 0.0);
	this.addPoint(0.0, 0.5, 0.0);
	this.addPoint(0.0, 2.0, 0.0);

	this.addPoint(2.0, 0.0, this.height);
	this.addPoint(0.5, 0.0, this.height);
	this.addPoint(0.0, 0.5, this.height);
	this.addPoint(0.0, 2.0, this.height);
};

CabinColumn.prototype.addPoint = function(x, y, z) {
	this.normal_buffer.push(x);
	this.normal_buffer.push(y);
	this.normal_buffer.push(z);

	this.texture_coord_buffer.push(x / this.height);
	this.texture_coord_buffer.push(y / this.height);

	this.position_buffer.push(x);
	this.position_buffer.push(y);
	this.position_buffer.push(z);
};
