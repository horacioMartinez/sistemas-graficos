/**
 * 
 */

function Sphere(latitude_bands, longitude_bands){
	Grid.call(this, latitude_bands, longitude_bands);
	this.latitudeBands = latitude_bands;
	this.longitudeBands = longitude_bands;
};

inheritPrototype(Sphere, Grid);

Sphere.prototype.createPositionBuffer = function(){
	this.position_buffer = [];
	this.normal_buffer = [];
	this.texture_coord_buffer = [];

	var latNumber;
	var longNumber;

	for (latNumber=0; latNumber <= this.latitudeBands; latNumber++) {
		var theta = latNumber * Math.PI / this.latitudeBands;
		var sinTheta = Math.sin(theta);
		var cosTheta = Math.cos(theta);

		for (longNumber=0; longNumber <= this.longitudeBands; ++longNumber) {
			var phi = longNumber * 2 * Math.PI / this.longitudeBands;
			var sinPhi = Math.sin(phi);
			var cosPhi = Math.cos(phi);

			var x = cosPhi * sinTheta;
			var y = cosTheta;
			var z = sinPhi * sinTheta;
			var u = 1.0 - (longNumber / this.longitudeBands);
			var v = 1.0 - (latNumber / this.latitudeBands);

			this.normal_buffer.push(x);
			this.normal_buffer.push(y);
			this.normal_buffer.push(z);

			this.texture_coord_buffer.push(u);
			this.texture_coord_buffer.push(v);

			this.position_buffer.push(x);
			this.position_buffer.push(y);
			this.position_buffer.push(z);
		}
	}	
};
