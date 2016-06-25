function Cilindro(radio, largo, verticesBorde,texturePath) {
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

    this.sup = new SupRevolucion(profileBuffer, verticesBorde,texturePath);
}

Cilindro.prototype.draw = function (modelMatrix) {
    this.sup.draw(modelMatrix);
};
