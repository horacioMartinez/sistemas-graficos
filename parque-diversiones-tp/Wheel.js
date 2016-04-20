
function Wheel(ratio, width){
	this.ratio = ratio;
	this.width = width;
	this.radialCyl = new Cylinder();
	this.radialCyl.initTexture("metal.png");
	this.axisCyl = new Cylinder();
	this.axisCyl.initTexture("metal.png");
	this.auxiCyl = new Cylinder();
	this.auxiCyl.initTexture("metal.png");
}

Wheel.prototype.initReflectionMap = function(ref_map){
	this.radialCyl.initReflectionMap(ref_map);
	this.axisCyl.initReflectionMap(ref_map);
	this.auxiCyl.initReflectionMap(ref_map);
};

Wheel.prototype.draw = function(modelMatrix){
	/* Dibujamos los cilindros radiales */
	var mat1 = mat4.create();
	mat4.identity(mat1);
	mat4.multiply(mat1, modelMatrix);

	var scaleMatrix = mat4.create();
	mat4.identity(scaleMatrix);
	mat4.scale(scaleMatrix, [0.05, 0.05, 2*this.ratio]);

	var rotationMatrix = mat4.create();
	mat4.identity(rotationMatrix);
	mat4.rotate(rotationMatrix, Math.PI/8, [0.0, 1.0, 0.0]);

	var axialTranslationMatrix = mat4.create();
	mat4.identity(axialTranslationMatrix);
	mat4.translate(axialTranslationMatrix, [0.0, this.width/2.0, 0.0]);	
	mat4.multiply(mat1, axialTranslationMatrix);
	var finalMatrix = mat4.create();
	for(var i=0; i<8; ++i){
		mat4.multiply(mat1, rotationMatrix);
		mat4.identity(finalMatrix);
		mat4.multiply(finalMatrix, mat1);
		mat4.multiply(finalMatrix, scaleMatrix);
		this.radialCyl.draw(finalMatrix);
	}
	
	mat4.identity(mat1);
	mat4.multiply(mat1, modelMatrix);
	mat4.identity(axialTranslationMatrix);
	mat4.translate(axialTranslationMatrix, [0.0, -this.width/2.0, 0.0]);	
	mat4.multiply(mat1, axialTranslationMatrix);
	for(var i=0; i<8; ++i){
		mat4.multiply(mat1, rotationMatrix);
		mat4.identity(finalMatrix);
		mat4.multiply(finalMatrix, mat1);
		mat4.multiply(finalMatrix, scaleMatrix);
		this.radialCyl.draw(finalMatrix);
	}
	
	/* Cilindro Eje */
	var matAxis = mat4.create();
	mat4.identity(matAxis);
	mat4.multiply(matAxis, modelMatrix);
	mat4.rotate(matAxis, Math.PI/2.0, [1.0, 0.0, 0.0]);
	mat4.scale(matAxis, [0.06, 0.06, this.width*1.7]);
	this.axisCyl.draw(matAxis);
	
	/* Ejes de las cabinas */
	var matCabAxis = mat4.create();
	for(var i=0; i<8; ++i){
		mat4.identity(matCabAxis);
		mat4.multiply(matCabAxis, modelMatrix);
		mat4.rotate(matCabAxis, i*Math.PI/4.0, [0.0, 1.0, 0.0]);
		mat4.translate(matCabAxis, [this.ratio, 0.0, 0.0]);
		mat4.rotate(matCabAxis, Math.PI/2.0, [1.0, 0.0, 0.0]);
		mat4.scale(matCabAxis, [0.05, 0.05, this.width]);
		this.axisCyl.draw(matCabAxis);
	}
	
	/* Tangenciales y del medio: los que unen los radiales */
	var matTang = mat4.create();
	var matMid = mat4.create();
	for(var i=0; i<16; ++i){
		mat4.identity(matTang);
		mat4.multiply(matTang, modelMatrix);
		mat4.identity(matMid);
		mat4.multiply(matMid, modelMatrix);
		
		mat4.rotate(matTang, Math.PI/16.0 + i*Math.PI/8.0, [0.0, 1.0, 0.0]);
		mat4.translate(matTang, [this.ratio, this.width/2.0, 0.0]);
		mat4.scale(matTang, [0.05, 0.05, 2*this.ratio*Math.sin(Math.PI/16.0)]);
		this.auxiCyl.draw(matTang);
		
		mat4.rotate(matMid, Math.PI/16.0 + i*Math.PI/8.0, [0.0, 1.0, 0.0]);
		mat4.translate(matMid, [this.ratio/2.0, this.width/2.0, 0.0]);
		mat4.scale(matMid, [0.05, 0.05, this.ratio*Math.sin(Math.PI/16.0)]);
		this.auxiCyl.draw(matMid);
	}
	
	for(var i=0; i<16; ++i){
		mat4.identity(matTang);
		mat4.multiply(matTang, modelMatrix);
		mat4.identity(matMid);
		mat4.multiply(matMid, modelMatrix);
		
		mat4.rotate(matTang, Math.PI/16.0 + i*Math.PI/8.0, [0.0, 1.0, 0.0]);
		mat4.translate(matTang, [this.ratio, -this.width/2.0, 0.0]);
		mat4.scale(matTang, [0.05, 0.05, 2*this.ratio*Math.sin(Math.PI/16.0)]);
		this.auxiCyl.draw(matTang);
		
		mat4.rotate(matMid, Math.PI/16.0 + i*Math.PI/8.0, [0.0, 1.0, 0.0]);
		mat4.translate(matMid, [this.ratio/2.0, -this.width/2.0, 0.0]);
		mat4.scale(matMid, [0.05, 0.05, this.ratio*Math.sin(Math.PI/16.0)]);
		this.auxiCyl.draw(matMid);
	}
};
