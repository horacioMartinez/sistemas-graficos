/**
 * @param height: altura del objeto 3D
 * @param baseVerticesList: es una lista de vertices que recorren la base,
 * 							con sus coordenadas x,y:
 * 								[x1,y1,x2,y2,...,xn,yn]
 */

function ExtrusionOpened(height, baseVerticesList){
	this.numberOfVerticesInBase = baseVerticesList.length/2.0;

	this.baseVerticesList = baseVerticesList;
	this.height = height;
	Grid.call(this, 1, 2*this.numberOfVerticesInBase-1);
};

inheritPrototype(ExtrusionOpened, Grid);

ExtrusionOpened.prototype.createPositionBuffer = function(){
	this.position_buffer = [];
	this.normal_buffer = [];
	this.texture_coord_buffer = [];

	var i, x, y, z, lastX, lastY, deltaX, deltaY, firstNormalX, firstNormalY, firstBinormalX, firstBinormalY;
	// Cuerpo:
	x = this.baseVerticesList[2];
	y = this.baseVerticesList[3];
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
		//if(i != 0){
			this.normal_buffer.push(deltaY);
			this.normal_buffer.push(-deltaX);
			this.normal_buffer.push(0.0);
			this.binormal_buffer.push(-deltaX);
			this.binormal_buffer.push(-deltaY);
			this.binormal_buffer.push(0.0);
		/*}else{
			firstNormalX = deltaY;
			firstNormalY = -deltaX;
			firstBinormalX = firstNormalY;
			firstBinormalY = -firstBinormalX;
		}*/
		
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
	/*
	this.normal_buffer.push(firstNormalX);
	this.normal_buffer.push(firstNormalY);
	this.normal_buffer.push(0.0);
	this.binormal_buffer.push(firstBinormalX);
	this.binormal_buffer.push(firstBinormalY);
	this.binormal_buffer.push(0.0);
	*/

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
		/*}else{
			firstNormalX = deltaY;
			firstNormalY = -deltaX;
			firstBinormalX = firstNormalY;
			firstBinormalY = -firstBinormalX;
		}
		*/
		
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
	/*
	this.normal_buffer.push(firstNormalX);
	this.normal_buffer.push(firstNormalY);
	this.normal_buffer.push(0.0);
	this.binormal_buffer.push(firstBinormalX);
	this.binormal_buffer.push(firstBinormalY);
	this.binormal_buffer.push(0.0);
	*/
};
