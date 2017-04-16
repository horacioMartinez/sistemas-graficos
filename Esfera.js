function Esfera(_rows, _cols,texturePath) {
	VertexGrid.call(this, _rows, _cols,texturePath);
}

Esfera.prototype = Object.create(VertexGrid.prototype);
Esfera.prototype.constructor = Esfera;

Esfera.prototype.initBuffers = function() {
	
	this.position_buffer = [];
	this.color_buffer = [];

	var radio = 1;
	for (var i = 0.0; i < this.rows; i++) {
		var alfa = i * Math.PI / (this.rows - 1);

		for (var j = 0.0; j < this.cols; j++) {
			var beta = j * 2 * Math.PI / (this.cols - 1);
			var x = Math.cos(beta) * Math.sin(alfa);
			var y = Math.cos(alfa);
			var z = Math.sin(beta) * Math.sin(alfa);
			// Para cada vértice definimos su posición
			// como coordenada (x, y, z)
			this.position_buffer.push(radio * x);
			this.position_buffer.push(radio * y);
			this.position_buffer.push(radio * z);

			// Para cada vértice definimos su color
			this.color_buffer.push(x * y * z / this.rows * i);
			this.color_buffer.push(j * x / y);
			this.color_buffer.push(y * i / this.cols * j);

		};
	};
}