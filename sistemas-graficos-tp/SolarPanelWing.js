function SolarPanelWing() {
    this.CANTIDAD_BLOCKS = 4;
    this.LARGO_MAIN_PIPE = 7;
    this.mainPipe1 = new Cilindro(0.03, this.LARGO_MAIN_PIPE,15,"textures/pink.jpg");
    this.mainPipe2 = new Cilindro(0.03, this.LARGO_MAIN_PIPE,15,"textures/pink.jpg");
    this.blocks = [];

    for ( var i = 0; i < this.CANTIDAD_BLOCKS ; i++) {
        this.blocks.push(new SolarPanelBlock());
    }

}

SolarPanelWing.prototype.draw = function (modelMatrix) {
    var matPipe = mat4.clone(modelMatrix);
    var matPipe2 = mat4.clone(modelMatrix);

    mat4.rotateY(matPipe,matPipe,Math.PI);
    mat4.translate(matPipe,matPipe,[-this.mainPipe1.radio*2,0,0]);
    mat4.translate(matPipe,matPipe,[0,this.mainPipe1.largo/4,0]);
    this.mainPipe1.draw(matPipe);

    mat4.translate(matPipe2,matPipe2,[-this.mainPipe1.radio*2,0,0]);
    mat4.translate(matPipe2,matPipe2,[0,this.mainPipe1.largo/4,0]);
    this.mainPipe2.draw(matPipe2);

    for ( var i = 0; i < this.CANTIDAD_BLOCKS ; i++) {
        var matBlock = mat4.clone(modelMatrix);
        mat4.translate(matBlock , matBlock , [0,(i/this.CANTIDAD_BLOCKS) * this.LARGO_MAIN_PIPE*7/8 , 0]);
        mat4.rotateZ(matBlock,matBlock,Math.PI/2);
        this.blocks[i].draw(matBlock);
    }
};

