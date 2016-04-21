function Cilindro(_rows, _cols) {
  VertexGrid.call(this, _rows, _cols);
}

Cilindro.prototype = Object.create(VertexGrid.prototype);
Cilindro.prototype.constructor = Cilindro;

Cilindro.prototype.createUniformPlaneGrid = function() {

  this.position_buffer = [];
  this.color_buffer = [];

  var radio = 1;
  for (var i = 0.0; i < this.rows; i++) {
    for (var j = 0.0; j < this.cols; j++) {
      var alfa = j * Math.PI * 2 / (this.rows - 1);
      var x = Math.sin(alfa);
      var y = Math.cos(alfa);
      var z = i / 10;
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