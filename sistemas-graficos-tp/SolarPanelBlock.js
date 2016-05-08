function SolarPanelBlock() {
    this.LARGO_TUBO = 2;
    this.pipe = new Cilindro(0.02,this.LARGO_TUBO);
    this.edgePipe = new Cilindro(0.02,0.4);

    this.panel1 = new Plane(0.5,2);
    this.panel2 = new Plane(0.5,2);
}


SolarPanelBlock.prototype.draw = function (modelMatrix) {
    var matEdgePipe = mat4.create();
    mat4.translate(matEdgePipe, modelMatrix, [0, this.LARGO_TUBO/2, 0]);
    mat4.rotateX(matEdgePipe,matEdgePipe,Math.PI/2);

    var matPanel1 = mat4.create();
    mat4.translate(matPanel1, modelMatrix, [0, this.LARGO_TUBO/2 - this.panel1.alto/2, 0]);
    mat4.rotateY(matPanel1,matPanel1,Math.PI/2);
    mat4.translate(matPanel1, matPanel1, [this.edgePipe.largo/2,0, 0]);
    
    var matPanel2 = mat4.create();
    mat4.translate(matPanel2, modelMatrix, [0, this.LARGO_TUBO/2 - this.panel2.alto/2, 0]);
    mat4.rotateY(matPanel2,matPanel2,-Math.PI/2);
    mat4.translate(matPanel2, matPanel2, [this.edgePipe.largo/2,0, 0]);
    
    this.panel1.draw(matPanel1);
    this.panel2.draw(matPanel2);
    this.edgePipe.draw(matEdgePipe);
    this.pipe.draw(modelMatrix);
};