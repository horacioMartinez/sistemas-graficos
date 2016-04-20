
function FairWheel(){
	this.timer = 0.000;
	this.speed = 0.01;
	this.ratioOfWheel = 1.75;
	this.widthOfWheel = 0.7;
	this.wheel = new Wheel(this.ratioOfWheel, this.widthOfWheel);
	this.foot = new FootOfWheel();
	this.foot.initTexture("metal.jpg");
	this.cabin = new Cabin();
	this.useReflectionMap = false;
}

FairWheel.prototype.initReflectionMap = function(ref_map){
	this.useReflectionMap = true;
	this.wheel.initReflectionMap(ref_map);
	this.foot.initReflectionMap(ref_map);
};

FairWheel.prototype.draw = function(modelMatrix){
	var matRotated = mat4.create();
	mat4.identity(matRotated);
	mat4.multiply(matRotated, modelMatrix);
	mat4.rotate(matRotated, this.timer, [0.0, 1.0, 0.0]);
	this.wheel.draw(matRotated);
	var matFoot1 = mat4.create();
	mat4.identity(matFoot1);
	mat4.multiply(matFoot1, modelMatrix);
	mat4.translate(matFoot1, [0.0, this.widthOfWheel/1.4, 0.0]);
	mat4.rotate(matFoot1, Math.PI/2.0, [1.0, 0.0, 0.0]);
	mat4.rotate(matFoot1, Math.PI, [0.0, 0.0, 1.0]);
	this.foot.draw(matFoot1);
	var matFoot2 = mat4.create();
	mat4.identity(matFoot2);
	mat4.multiply(matFoot2, modelMatrix);
	mat4.translate(matFoot2, [0.0, -this.widthOfWheel/1.4, 0.0]);
	mat4.rotate(matFoot2, Math.PI/2.0, [1.0, 0.0, 0.0]);
	mat4.rotate(matFoot2, Math.PI, [0.0, 0.0, 1.0]);
	this.foot.draw(matFoot2);
	
	
	var cabinMatrix = mat4.create();
	for(var i=0; i<8; ++i){
		mat4.identity(cabinMatrix);
		mat4.multiply(cabinMatrix, modelMatrix);
		mat4.rotate(cabinMatrix, this.timer + i*Math.PI/4.0, [0.0, 1.0, 0.0]);
		mat4.translate(cabinMatrix, [this.ratioOfWheel, 0.0, 0.0]);
		mat4.rotate(cabinMatrix, -this.timer - i*Math.PI/4.0, [0.0, 1.0, 0.0]);
		mat4.rotate(cabinMatrix, Math.PI/2.0, [0.0, 0.0, 1.0]);
		mat4.scale(cabinMatrix, [0.2, 0.2, 0.2]);
		this.cabin.draw(cabinMatrix);
	}
	
	
	this.timer += this.speed;
};


function FootOfWheel(){
	var vertex = [-0.25, 0.25,
	              0.25, 0.25,
	              0.75, -3.00,
	              -0.75, -3.00,
	              -0.25, 0.25];
	ExtrusionClosed.call(this, 0.05, vertex);
}

inheritPrototype(FootOfWheel, ExtrusionClosed);
