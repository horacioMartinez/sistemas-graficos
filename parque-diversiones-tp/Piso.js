/**
 * @param height: altura del objeto 3D
 * @param baseVerticesList: es una lista de vertices que recorren la base,
 * 							con sus coordenadas x,y:
 * 								[x1,y1,x2,y2,...,xn,yn]
 */

function Piso(){
	this.width = 512;
	this.height = this.width/2.0;
	this.density = 500.0;
	
	Grid.call(this, 1, 1);
};

inheritPrototype(Piso, Grid);

Piso.prototype.createPositionBuffer = function(){
	this.position_buffer = [];
	this.normal_buffer = [];
	this.texture_coord_buffer = [];

	this.tangent_buffer.push(1.0);
	this.tangent_buffer.push(0.0);
	this.tangent_buffer.push(0.0);
	this.binormal_buffer.push(0.0);
	this.binormal_buffer.push(1.0);
	this.binormal_buffer.push(0.0);
	this.normal_buffer.push(0.0);
	this.normal_buffer.push(0.0);
	this.normal_buffer.push(1.0);
	this.texture_coord_buffer.push(0.0);
	this.texture_coord_buffer.push(0.0);
	this.position_buffer.push(-this.width/2.0);
	this.position_buffer.push(-this.height/2.0);
	this.position_buffer.push(0.0);
	
	this.tangent_buffer.push(1.0);
	this.tangent_buffer.push(0.0);
	this.tangent_buffer.push(0.0);
	this.binormal_buffer.push(0.0);
	this.binormal_buffer.push(1.0);
	this.binormal_buffer.push(0.0);
	this.normal_buffer.push(0.0);
	this.normal_buffer.push(0.0);
	this.normal_buffer.push(1.0);
	this.texture_coord_buffer.push(0.0);
	this.texture_coord_buffer.push(this.density);
	this.position_buffer.push(-this.width/2.0);
	this.position_buffer.push(this.height/2.0);
	this.position_buffer.push(0.0);
	
	this.tangent_buffer.push(1.0);
	this.tangent_buffer.push(0.0);
	this.tangent_buffer.push(0.0);
	this.binormal_buffer.push(0.0);
	this.binormal_buffer.push(1.0);
	this.binormal_buffer.push(0.0);
	this.normal_buffer.push(0.0);
	this.normal_buffer.push(0.0);
	this.normal_buffer.push(1.0);
	this.texture_coord_buffer.push(this.density);
	this.texture_coord_buffer.push(0.0);
	this.position_buffer.push(this.width/2.0);
	this.position_buffer.push(-this.height/2.0);
	this.position_buffer.push(0.0);
	
	this.tangent_buffer.push(1.0);
	this.tangent_buffer.push(0.0);
	this.tangent_buffer.push(0.0);
	this.binormal_buffer.push(0.0);
	this.binormal_buffer.push(1.0);
	this.binormal_buffer.push(0.0);
	this.normal_buffer.push(0.0);
	this.normal_buffer.push(0.0);
	this.normal_buffer.push(1.0);
	this.texture_coord_buffer.push(this.density);
	this.texture_coord_buffer.push(this.density);
	this.position_buffer.push(this.width/2.0);
	this.position_buffer.push(this.height/2.0);
	this.position_buffer.push(0.0);
};
