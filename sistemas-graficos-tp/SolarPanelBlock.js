function SolarPanelBlock() {

    this.semiblock1 = new SolarPanelSemiBlock();
    this.semiblock2 = new SolarPanelSemiBlock();
    this.centerDisk = new Cilindro(0.15,0.05,15,"textures/metal.jpg");
}


SolarPanelBlock.prototype.draw = function (modelMatrix) {
    this.semiblock1.draw(modelMatrix);

    var matSemiBlock2 = mat4.create();
    mat4.rotateX(matSemiBlock2,modelMatrix,Math.PI);
    this.semiblock1.draw(matSemiBlock2);

    var matDisk = mat4.create();
    mat4.rotateZ(matDisk,modelMatrix,Math.PI/2);
    this.centerDisk.draw(matDisk);
};

function SolarPanelSemiBlock() {
    this.pipe = new Cilindro(0.02,1.5,15,"textures/pink.jpg");
    this.edgePipe = new Cilindro(0.02,0.4,15,"textures/pink.jpg");

    this.panel1 = new Plane(0.5,2,'textures/panel_solar.jpg');
    this.panel1_back = new Plane(0.5,2,'textures/panel_solar.jpg');
    this.panel2 = new Plane(0.5,2,'textures/panel_solar.jpg');
    this.panel2_back = new Plane(0.5,2,'textures/panel_solar.jpg');
}


SolarPanelSemiBlock.prototype.draw = function (modelMatrix) {

    var matPipe = mat4.create();
    mat4.translate(matPipe,modelMatrix,[0,this.pipe.largo/2,0]);

    var matEdgePipe = mat4.create();
    mat4.translate(matEdgePipe, matPipe, [0, this.pipe.largo/2, 0]);
    mat4.rotateZ(matEdgePipe,matEdgePipe,Math.PI/2);

    var matPanel1 = mat4.create();
    mat4.translate(matPanel1, matPipe, [0, this.pipe.largo/2 - this.panel1.alto/2, 0]);
    mat4.translate(matPanel1, matPanel1, [this.edgePipe.largo/2,0, 0]);

    var matPanel1Back = mat4.clone(matPanel1);
    mat4.rotateY(matPanel1Back,matPanel1Back,Math.PI);
    mat4.translate(matPanel1Back,matPanel1Back,[-0.5,-0,-0.05]);

    var matPanel2 = mat4.create();
    mat4.translate(matPanel2, matPipe, [0, this.pipe.largo/2 - this.panel2.alto/2, 0]);
    mat4.translate(matPanel2, matPanel2, [-this.panel2.ancho -this.edgePipe.largo/2,0, 0]);

    var matPanel2Back = mat4.clone(matPanel2);
    mat4.rotateY(matPanel2Back,matPanel2Back,Math.PI);
    mat4.translate(matPanel2Back,matPanel2Back,[-0.5,-0,-0.05]);

    this.panel1.draw(matPanel1);
    this.panel1_back.draw(matPanel1Back);

    this.panel2.draw(matPanel2);
    this.panel2_back.draw(matPanel2Back);

    this.edgePipe.draw(matEdgePipe);
    this.pipe.draw(matPipe);
};
