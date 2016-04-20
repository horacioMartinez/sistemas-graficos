/**
 * @param height: altura del objeto 3D
 * @param baseVerticesList: es una lista de vertices que recorren la base,
 * 							con sus coordenadas x,y:
 * 								[x1,y1,x2,y2,...,xn,yn]
 */

function ExtrusionClosed(height, baseVerticesList){
	this.numberOfVerticesInBase = baseVerticesList.length/2.0;

	this.baseVerticesList = baseVerticesList;
	this.height = height;
	Grid.call(this, 5, 2*(this.numberOfVerticesInBase)-1);
};

inheritPrototype(ExtrusionClosed, Grid);

ExtrusionClosed.prototype.createPositionBuffer = function(){
	this.position_buffer = [];
	this.normal_buffer = [];
	this.texture_coord_buffer = [];

	var i, x, y, z, lastX, lastY, deltaX, deltaY, firstNormalX, firstNormalY, firstBinormalX, firstBinormalY;
	// Tapa de abajo:
	for(i=0; i < this.numberOfVerticesInBase; ++i){
		x = 0;
		y = 0;
		z = -this.height/2.0;

		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(1.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(1.0);
		this.tangent_buffer.push(0.0);

		this.binormal_buffer.push(-1.0);
		this.binormal_buffer.push(0.0);
		this.binormal_buffer.push(0.0);
		this.binormal_buffer.push(-1.0);
		this.binormal_buffer.push(0.0);
		this.binormal_buffer.push(0.0);
		
		this.normal_buffer.push(0.0);
		this.normal_buffer.push(0.0);
		this.normal_buffer.push(-1.0);
		this.normal_buffer.push(0.0);
		this.normal_buffer.push(0.0);
		this.normal_buffer.push(-1.0);


		this.texture_coord_buffer.push(i/this.numberOfVerticesInBase);
		this.texture_coord_buffer.push(1.0);
		this.texture_coord_buffer.push(i/this.numberOfVerticesInBase);
		this.texture_coord_buffer.push(1.0);

		this.position_buffer.push(x);
		this.position_buffer.push(y);
		this.position_buffer.push(z);
		this.position_buffer.push(x);
		this.position_buffer.push(y);
		this.position_buffer.push(z);
	}
	// Cuerpo:
	for(i=0; i < this.numberOfVerticesInBase*2; ++i){
		x = this.baseVerticesList[i];
		y = this.baseVerticesList[++i];
		z = -this.height/2.0;

		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(1.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(1.0);
		this.tangent_buffer.push(0.0);

		this.binormal_buffer.push(-1.0);
		this.binormal_buffer.push(0.0);
		this.binormal_buffer.push(0.0);
		this.binormal_buffer.push(-1.0);
		this.binormal_buffer.push(0.0);
		this.binormal_buffer.push(0.0);
		
		this.normal_buffer.push(0.0);
		this.normal_buffer.push(0.0);
		this.normal_buffer.push(-1.0);
		this.normal_buffer.push(0.0);
		this.normal_buffer.push(0.0);
		this.normal_buffer.push(-1.0);

		this.texture_coord_buffer.push(i/this.numberOfVerticesInBase);
		this.texture_coord_buffer.push(2.0/3.0);
		this.texture_coord_buffer.push(i/this.numberOfVerticesInBase);
		this.texture_coord_buffer.push(2.0/3.0);

		this.position_buffer.push(x);
		this.position_buffer.push(y);
		this.position_buffer.push(z);
		this.position_buffer.push(x);
		this.position_buffer.push(y);
		this.position_buffer.push(z);
	}
	for(i=0; i < this.numberOfVerticesInBase*2; ++i){
		lastX = x;
		lastY = y;
		
		x = this.baseVerticesList[i];
		y = this.baseVerticesList[++i];
		z = -this.height/2.0;

		deltaX = x - lastX;
		deltaY = y - lastY;

		this.normal_buffer.push(deltaY);
		this.normal_buffer.push(-deltaX);
		this.normal_buffer.push(0.0);
		this.binormal_buffer.push(-deltaX);
		this.binormal_buffer.push(-deltaY);
		this.binormal_buffer.push(0.0);
		//if(i != 0)
		this.normal_buffer.push(deltaY);
		this.normal_buffer.push(-deltaX);
		this.normal_buffer.push(0.0);
		this.binormal_buffer.push(-deltaX);
		this.binormal_buffer.push(-deltaY);
		this.binormal_buffer.push(0.0);
		//fi
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(1.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(1.0);

		this.texture_coord_buffer.push(i/this.numberOfVerticesInBase);
		this.texture_coord_buffer.push(2.0/3.0);
		this.texture_coord_buffer.push(i/this.numberOfVerticesInBase);
		this.texture_coord_buffer.push(2.0/3.0);

		this.position_buffer.push(x);
		this.position_buffer.push(y);
		this.position_buffer.push(z);
		this.position_buffer.push(x);
		this.position_buffer.push(y);
		this.position_buffer.push(z);
	}
	//add first

	for(i=0; i < this.numberOfVerticesInBase*2; ++i){
		lastX = x;
		lastY = y;
		
		x = this.baseVerticesList[i];
		y = this.baseVerticesList[++i];
		z = this.height/2.0;

		deltaX = x - lastX;
		deltaY = y - lastY;
		
		this.normal_buffer.push(deltaY);
		this.normal_buffer.push(-deltaX);
		this.normal_buffer.push(0.0);
		this.binormal_buffer.push(-deltaX);
		this.binormal_buffer.push(-deltaY);
		this.binormal_buffer.push(0.0);
		//if(i != 0){
		this.normal_buffer.push(deltaY);
		this.normal_buffer.push(-deltaX);
		this.normal_buffer.push(0.0);
		this.binormal_buffer.push(-deltaX);
		this.binormal_buffer.push(-deltaY);
		this.binormal_buffer.push(0.0);

		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(1.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(1.0);
		
		this.texture_coord_buffer.push(i/this.numberOfVerticesInBase);
		this.texture_coord_buffer.push(1.0/3.0);
		this.texture_coord_buffer.push(i/this.numberOfVerticesInBase);
		this.texture_coord_buffer.push(1.0/3.0);

		this.position_buffer.push(x);
		this.position_buffer.push(y);
		this.position_buffer.push(z);
		this.position_buffer.push(x);
		this.position_buffer.push(y);
		this.position_buffer.push(z);
	}
//	add first
	
	for(i=0; i < this.numberOfVerticesInBase*2; ++i){
		lastX = x;
		lastY = y;
		
		x = this.baseVerticesList[i];
		y = this.baseVerticesList[++i];
		z = this.height/2.0;

		this.tangent_buffer.push(1.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(1.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(0.0);

		this.binormal_buffer.push(0.0);
		this.binormal_buffer.push(1.0);
		this.binormal_buffer.push(0.0);
		this.binormal_buffer.push(0.0);
		this.binormal_buffer.push(1.0);
		this.binormal_buffer.push(0.0);
		
		this.normal_buffer.push(0.0);
		this.normal_buffer.push(0.0);
		this.normal_buffer.push(1.0);
		this.normal_buffer.push(0.0);
		this.normal_buffer.push(0.0);
		this.normal_buffer.push(1.0);

		this.texture_coord_buffer.push(i/this.numberOfVerticesInBase);
		this.texture_coord_buffer.push(1.0/3.0);
		this.texture_coord_buffer.push(i/this.numberOfVerticesInBase);
		this.texture_coord_buffer.push(1.0/3.0);

		this.position_buffer.push(x);
		this.position_buffer.push(y);
		this.position_buffer.push(z);
		this.position_buffer.push(x);
		this.position_buffer.push(y);
		this.position_buffer.push(z);
	}	

	// Tapa de arriba:
	for(i=0; i < this.numberOfVerticesInBase; ++i){
		x = 0;
		y = 0;
		z = this.height/2.0;

		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(-1.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(0.0);
		this.tangent_buffer.push(-1.0);
		this.tangent_buffer.push(0.0);

		this.binormal_buffer.push(-1.0);
		this.binormal_buffer.push(0.0);
		this.binormal_buffer.push(0.0);
		this.binormal_buffer.push(-1.0);
		this.binormal_buffer.push(0.0);
		this.binormal_buffer.push(0.0);
		
		this.normal_buffer.push(x);
		this.normal_buffer.push(y);
		this.normal_buffer.push(1.0);

		this.texture_coord_buffer.push(i/this.numberOfVerticesInBase);
		this.texture_coord_buffer.push(0.0);

		this.position_buffer.push(x);
		this.position_buffer.push(y);
		this.position_buffer.push(z);

		this.normal_buffer.push(x);
		this.normal_buffer.push(y);
		this.normal_buffer.push(1.0);

		this.texture_coord_buffer.push(i/this.numberOfVerticesInBase);
		this.texture_coord_buffer.push(0.0);

		this.position_buffer.push(x);
		this.position_buffer.push(y);
		this.position_buffer.push(z);
	}
};
