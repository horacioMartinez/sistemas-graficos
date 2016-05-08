function SolarPanelWing() {
    this.mainPipe = new Cilindro(0.1, 5);
    this.block1 = new SolarPanelBlock();

}

SolarPanelWing.prototype.draw = function (modelMatrix) {
    //this.mainPipe.draw(modelMatrix);
    this.block1.draw(modelMatrix);
};

