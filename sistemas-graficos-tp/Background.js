function Background() {
    this.universo = new Plane(1,1,'textures/universe.jpg',10,true);
}

Background.prototype.draw = function (modelMatrix) {

    var distancia = 500;

    var matUniverso = mat4.clone(modelMatrix);
    mat4.translate(matUniverso,matUniverso,[0,0,distancia ]);
    mat4.scale(matUniverso,matUniverso,[distancia*2,distancia*2,1]);
    mat4.translate(matUniverso,matUniverso,[-0.5,-0.5,0]);
    this.universo.draw(matUniverso);
    mat4.translate(matUniverso,matUniverso,[0,0,-distancia *2]);
    this.universo.draw(matUniverso);

    matUniverso = mat4.clone(modelMatrix);
    mat4.rotateY(matUniverso,matUniverso,Math.PI/2);
    mat4.translate(matUniverso,matUniverso,[0,0,distancia]);
    mat4.scale(matUniverso,matUniverso,[distancia*2,distancia*2,1]);
    mat4.translate(matUniverso,matUniverso,[-0.5,-0.5,0]);
    this.universo.draw(matUniverso);

    matUniverso = mat4.clone(modelMatrix);
    mat4.rotateY(matUniverso,matUniverso,Math.PI/2);
    mat4.translate(matUniverso,matUniverso,[0,0,-distancia]);
    mat4.scale(matUniverso,matUniverso,[distancia*2,distancia*2,1]);
    mat4.translate(matUniverso,matUniverso,[-0.5,-0.5,0]);
    this.universo.draw(matUniverso);


    matUniverso = mat4.clone(modelMatrix);
    mat4.rotateX(matUniverso,matUniverso,Math.PI/2);
    mat4.translate(matUniverso,matUniverso,[0,0,distancia]);
    mat4.scale(matUniverso,matUniverso,[distancia*2,distancia*2,1]);
    mat4.translate(matUniverso,matUniverso,[-0.5,-0.5,0]);
    this.universo.draw(matUniverso);

    matUniverso = mat4.clone(modelMatrix);
    mat4.rotateX(matUniverso,matUniverso,Math.PI/2);
    mat4.translate(matUniverso,matUniverso,[0,0,-distancia]);
    mat4.scale(matUniverso,matUniverso,[distancia*2,distancia*2,1]);
    mat4.translate(matUniverso,matUniverso,[-0.5,-0.5,0]);
    this.universo.draw(matUniverso);
};
