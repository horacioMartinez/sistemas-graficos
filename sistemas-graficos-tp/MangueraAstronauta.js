function MangueraAstronauta() {
    this.PUNTO_FINAL = [22,14,-20];
    this.ESCALA_MANGUERA = 0.15;
    this.ESCALA_ASTRONAUTA = 0.5;

    var puntosTrayectoria = [
        [-18, 4, -6],
        [-10, 2, -12],
        [-4, 10, -4],
        [-4, 4, -6],
        [6, -6, -2],
        [-2, -2, -2],
        [0.5, 0.5, 0],
        [3, 4, 0],
        [4, 6, 4],
        [4, 8, 2],
        [12, 8, 0],
        [14, 6, -2],
        [20, 2, -4],
        [20, 12, -4],
        this.PUNTO_FINAL,
        this.PUNTO_FINAL
    ];

    var internalPoints = [[0, 0, 0], [0.45, 0, 0], [1, 0.65, 0], [1, 1, 0],
        [1, 1.45, 0], [0.45, 2, 0], [0, 2, 0],
        [-0.45, 2, 0], [-1, 1.45, 0], [-1, 1, 0],
        [-1, 0.65, 0], [-0.45, 0, 0], [0, 0, 0]
    ];

    for (var i = 0; i < internalPoints.length; i++){
        vec3.scale(internalPoints[i],internalPoints[i],this.ESCALA_MANGUERA);
    }


    var cBSpline = new CurvaBSpline();
    puntosTrayectoria = cBSpline.getVertices(puntosTrayectoria, 0.1);

    var bezier = new CurvaBezierCubica();
    internalPoints = bezier.getVertices(internalPoints, 0.1);

    this.mangera = new SupBarrido(puntosTrayectoria, internalPoints);
    this.astronauta = new Plane(8*this.ESCALA_ASTRONAUTA,8*this.ESCALA_ASTRONAUTA,'textures/astronaut.png');
}

MangueraAstronauta.prototype.draw = function (modelMatrix) {
    var matAstronauta = mat4.clone(modelMatrix);
    mat4.translate(matAstronauta,matAstronauta,[-this.astronauta.ancho/2,-this.astronauta.alto/2,0]);
    mat4.translate(matAstronauta,matAstronauta,this.PUNTO_FINAL);

    var matManguera = mat4.clone(modelMatrix);
    mat4.translate(matManguera,matManguera,[2.5,0,0]);
    this.mangera.draw(matManguera);
    this.astronauta.draw(matAstronauta);
};