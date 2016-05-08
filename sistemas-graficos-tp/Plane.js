// Esta función inicializa el position_buffer y el color buffer de forma de 
// crear un plano de color gris que se extiende sobre el plano XY, con Z=0
// El plano se genera centrado en el origen.
// El propósito de esta función es a modo de ejemplo de como inicializar y cargar
// los buffers de las posiciones y el color para cada vértice.

function Plane(ancho, alto) {
    this.ancho = ancho || 1;
    this.alto = alto || 1;
    VertexGrid.call(this, 2, 2);
}

Plane.prototype = Object.create(VertexGrid.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.initBuffers = function () {
    this.position_buffer = [];
    this.normal_buffer = [];
    this.texture_coord_buffer = [];
    var alto = this.alto;
    var ancho = this.ancho;

    this.position_buffer = [
        0, 0, 0,
        0, alto, 0,
        ancho, 0, 0,
        ancho, alto, 0
    ];
    this.normal_buffer = [
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1
    ];
    this.texture_coord_buffer = [
        0, 0,
        0, 1,
        1, 1,
        1, 0
    ];

    /*
     this.position_buffer = [];
     this.color_buffer = [];

     for (var i = 0.0; i < this.rows; i++) {
     for (var j = 0.0; j < this.cols; j++) {

     // Para cada vértice definimos su posición
     // como coordenada (x, y, z=0)
     this.position_buffer.push(i - (this.rows - 1.0) / 2.0);
     this.position_buffer.push(j - (this.rows - 1) / 2.0);
     this.position_buffer.push(0);

     // Para cada vértice definimos su color
     this.color_buffer.push(1.0 / this.rows * i);
     this.color_buffer.push(0.2);
     this.color_buffer.push(1.0 / this.cols * j);

     }
     }
     */

}