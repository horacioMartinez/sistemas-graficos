function Carousel() {
	this.timer = 0.00;
	this.speed = 0.01;
	this.axis = new CarouselAxis();
	this.axis.initTexture("colours.png");
	this.roof = new CarouselRoofWithChairs();
}

Carousel.prototype.draw = function(modelMatrix) {
	var mAxis = mat4.create();
	mat4.identity(mAxis);
	mat4.multiply(mAxis, modelMatrix);
	mat4.translate(mAxis, [ 0.0, 0.0, 4.0 ]);
	mat4.scale(mAxis, [ 1.0, 1.0, -1.0 ]);
	this.axis.draw(mAxis);

	var mRoof = mat4.create();
	mat4.identity(mRoof);
	mat4.multiply(mRoof, modelMatrix);
	mat4.translate(mRoof, [ 0.0, 0.0, -3.6 ]);
	mat4.rotate(mRoof, -Math.PI / 18.0, [ 0.0, 1.0, 0.0 ]);
	mat4.rotate(mRoof, -this.timer, [ 0.0, 0.0, 1.0 ]);
	mat4.scale(mRoof, [ 1.6, 1.6, 1.8 ]);
	this.roof.draw(mRoof);

	this.timer += this.speed;
};

function CarouselAxis() {
	this.vertexOfProfile = [ 0.0, 0.0, 1.0, 0.0, 1.0, 2.5, 0.8, 3.0, 0.8, 4.0,
			0.7, 4.1, 0.7, 7.0 ];

	Revolution.call(this, this.vertexOfProfile);
}

inheritPrototype(CarouselAxis, Revolution);

function CarouselRoof() {
	this.vertexOfProfile = [ 0.0, 0.0, 3.0, 0.0, 3.0, 0.5, 0.2, 0.8 ];
	Revolution.call(this, this.vertexOfProfile);
}

inheritPrototype(CarouselRoof, Revolution);

function CarouselRoofWithChairs() {
	this.roof = new CarouselRoof();
	this.roof.initTexture("colours.png");
	this.chair = new CarouselChairWithChain();
}

CarouselRoofWithChairs.prototype.draw = function(modelMatrix) {
	this.roof.draw(modelMatrix);

	var chairMat = mat4.create();
	for (var i = 0; i < 16; ++i) {
		mat4.identity(chairMat);
		mat4.multiply(chairMat, modelMatrix);
		mat4.rotate(chairMat, i * Math.PI / 8.0, [ 0.0, 0.0, 1.0 ]);
		mat4.translate(chairMat, [ 2.5, 0.0, 0.5 ]);
		mat4.scale(chairMat, [ 1.0, 1.0, 0.75 ]);
		mat4.rotate(chairMat, -Math.PI / 2.0, [ 0.0, 0.0, 1.0 ]);
		mat4.rotate(chairMat, -Math.PI / 10.0, [ 1.0, 0.0, 0.0 ]);
		this.chair.draw(chairMat);
	}
};

function CarouselChair() {
	this.vertexOfProfile = [ 0.0, 0.0, 0.1, 1.0, 1.1, 1.0 ];
	ExtrusionOpened.call(this, 2, this.vertexOfProfile);
}

inheritPrototype(CarouselChair, ExtrusionOpened);

function CarouselChairWithChain() {
	this.chair = new CarouselChair();
	this.chair.initTexture("red.png");
	this.chainCyl = new Cylinder();
	this.chainCyl.initTexture("metal.jpg");
	this.chainCyl.initReflectionMap("sky3.jpg");
}

CarouselChairWithChain.prototype.draw = function(modelMatrix) {
	var chainMatrix = mat4.create();
	mat4.identity(chainMatrix);
	mat4.multiply(chainMatrix, modelMatrix);
	mat4.translate(chainMatrix, [ 0.0, 0.0, 1.15 ]);
	mat4.scale(chainMatrix, [ 0.02, 0.02, 3.0 ]);

	this.chainCyl.draw(chainMatrix);

	var chainMatrix = mat4.create();
	mat4.identity(chainMatrix);
	mat4.multiply(chainMatrix, modelMatrix);
	mat4.translate(chainMatrix, [ 0.0, 0.0, 2.65 ]);
	mat4.rotate(chainMatrix, Math.PI / 4.0, [ 1.0, 0.0, 0.0 ]);
	mat4.translate(chainMatrix, [ 0.0, 0.0, 0.25 ]);
	mat4.scale(chainMatrix, [ 0.02, 0.02, 0.5 ]);
	this.chainCyl.draw(chainMatrix);

	var chainMatrix = mat4.create();
	mat4.identity(chainMatrix);
	mat4.multiply(chainMatrix, modelMatrix);
	mat4.translate(chainMatrix, [ 0.0, 0.0, 2.65 ]);
	mat4.rotate(chainMatrix, -Math.PI / 4.0, [ 1.0, 0.0, 0.0 ]);
	mat4.translate(chainMatrix, [ 0.0, 0.0, 0.25 ]);
	mat4.scale(chainMatrix, [ 0.02, 0.02, 0.5 ]);
	this.chainCyl.draw(chainMatrix);

	var chairMatrix = mat4.create();
	mat4.identity(chairMatrix);
	mat4.multiply(chairMatrix, modelMatrix);
	mat4.translate(chairMatrix, [ 0.0, 0.0, 2.99 ]);
	mat4.rotate(chairMatrix, Math.PI / 2.0, [ 1.0, 0.0, 0.0 ]);
	mat4.scale(chairMatrix, [ 0.36, 0.36, 0.36 ]);
	this.chair.draw(chairMatrix);
};
