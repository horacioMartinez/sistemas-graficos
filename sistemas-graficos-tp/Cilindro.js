function Cilindro(radio, largo, verticesBorde) {
    this.radio = radio || 1;
    this.largo = largo || 1;
    verticesBorde = verticesBorde || 15;

    var profileBuffer = [
        new Vertex([0, 1, 0], [1, 0, 0], [0, 0, 1], [0, this.largo/2, 0], null),

        new Vertex([0, 1, 0], [1, 0, 0], [0, 0, 1], [this.radio, this.largo/2, 0], null),
        new Vertex([1, 0, 0], [0, -1, 0], [0, 0, -1], [this.radio, this.largo/2, 0], null),

        new Vertex([1, 0, 0], [0, -1, 0], [0, 0, -1], [this.radio, -this.largo/2, 0], null),
        new Vertex([0, -1, 0], [-1, 0, 0], [0, 0, 1], [this.radio, -this.largo/2, 0], null),

        new Vertex([0, -1, 0], [-1, 0, 0], [0, 0, 1], [0, -this.largo/2, 0], null)
    ];

    this.sup = new SupRevolucion(profileBuffer, verticesBorde);
    //SupRevolucion.call(this, profileBuffer, 15);
}

Cilindro.prototype.draw = function (modelMatrix) {
    this.sup.draw(modelMatrix);
};

/*Cilindro.prototype = Object.create(SupRevolucion.prototype);
 Cilindro.prototype.constructor = Cilindro;*/



/*
 Cilindro.prototype.initBuffers = function() {

 this.position_buffer = [];
 this.color_buffer = [];

 var radio = 1;
 for (var i = 0.0; i < this.rows; i++) {
 for (var j = 0.0; j < this.cols; j++) {
 var alfa = j * Math.PI * 2 / (this.rows - 1);
 var x = Math.sin(alfa);
 var y = Math.cos(alfa);
 var z = i;
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
 }*/
