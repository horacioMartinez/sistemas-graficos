function Plane(ancho, alto, texturePath, textureStep, oscuro) {
    this.ancho = ancho || 1;
    this.alto = alto || 1;
    this.textureStep = textureStep || 1;
    this.oscuro = oscuro;
    VertexGrid.call(this, 2, 2, texturePath);
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
    if (this.oscuro) {
        this.normal_buffer = [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        ];
    }
    this.tangent_buffer = [
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0
    ];

    this.binormal_buffer = [
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0
    ];

    this.texture_coord_buffer = [
        0, 0,
        0, this.textureStep,
        this.textureStep, 0,
        this.textureStep, this.textureStep
    ];
}