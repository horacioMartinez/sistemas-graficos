/**
 * @param profileVerticesList: es una lista de vertices que recorren el perfil, 
 * 							con sus coordenadas r,z:
 * 								[r1,z1,r2,z2,...,rn,zn]
 */

function Revolution(profileVerticesList){
	this.numberOfVerticesInProfile = profileVerticesList.length/2.0;
	this.numberOfAngularSteps = 50;
	this.profileVerticesList = profileVerticesList;
	Grid.call(this, 2*this.numberOfVerticesInProfile-3, this.numberOfAngularSteps);
};

inheritPrototype(Revolution, Grid);

Revolution.prototype.createPositionBuffer = function(){
	this.position_buffer = [];
	this.normal_buffer = [];
	this.texture_coord_buffer = [];

	var i, j, k, x, y, z, nextX, nextY, nextZ, nextI, nextJ, deltaX, deltaY, deltaZ, normalX, normalY, normalZ;

	for(i=0; i < this.numberOfVerticesInProfile-1; ++i){
		var partialNormals = [];
		var partialPositions = [];
		var partialTextures = [];
		var partialNextPositions = [];
		var partialNextTextures = [];
		for(j=0; j <= this.numberOfAngularSteps; ++j){
			nextI = i + 1;
			nextJ = j + 1;
			x = this.profileVerticesList[2*i] * Math.cos(j*2.0*Math.PI/this.numberOfAngularSteps);
			y = this.profileVerticesList[2*i] * Math.sin(j*2.0*Math.PI/this.numberOfAngularSteps);
			z = this.profileVerticesList[2*i + 1];
			nextX = this.profileVerticesList[2*nextI] * Math.cos(j*2.0*Math.PI/this.numberOfAngularSteps);
			nextY = this.profileVerticesList[2*nextI] * Math.sin(j*2.0*Math.PI/this.numberOfAngularSteps);
			nextZ = this.profileVerticesList[2*nextI + 1];
			deltaX = nextX - x;
			deltaY = nextY - y;
			deltaZ = nextZ - z;
			
			normalX = x * deltaZ;
			normalY = y * deltaZ;
			normalZ = - y * deltaY - x * deltaX;
			
			//si se le paso como punto el (0,0,0), la normal va a dar cualquier cosa
			if(normalX == 0)
				if(normalY == 0)
					if(normalZ == 0)
						normalZ = -1.0;

			partialNormals.push(normalX);
			partialNormals.push(normalY);
			partialNormals.push(normalZ);

			partialTextures.push(i/this.numberOfVerticesInProfile);
			partialTextures.push(j/this.numberOfAngularSteps);
			partialNextTextures.push(i/this.numberOfVerticesInProfile);
			partialNextTextures.push(j/this.numberOfAngularSteps);

			partialPositions.push(x);
			partialPositions.push(y);
			partialPositions.push(z);
			partialNextPositions.push(nextX);
			partialNextPositions.push(nextY);
			partialNextPositions.push(nextZ);
		}
		for(k=0; k < partialNormals.length; ++k){
			this.normal_buffer.push(partialNormals[k]);
			this.position_buffer.push(partialPositions[k]);
		}
		for(k=0; k < partialTextures.length; ++k){
			this.texture_coord_buffer.push(partialTextures[k]);
		}
		for(k=0; k < partialNormals.length; ++k){
			this.normal_buffer.push(partialNormals[k]);
			this.position_buffer.push(partialNextPositions[k]);
		}
		for(k=0; k < partialNextTextures.length; ++k){
			this.texture_coord_buffer.push(partialNextTextures[k]);
		}
	}
};
