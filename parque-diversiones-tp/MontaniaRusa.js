function MontaniaRusa(){
	this.curva = new CurvaMontaniaRusa();
	this.poligonoRiel = [-0.1, -0.1, 0.0, -0.1, 0.1, 0.0, 0.1, 0.1, 0.0, 0.1, -0.1, 0.0, -0.1, -0.1, 0.0];
	this.nroSegmentos = 500;
	this.deltaT = 9.99/this.nroSegmentos;
    var seccionAlineada = [];
    this.bufferVertices = [];
    
    for (var i = 0; i < this.nroSegmentos; i++) {
        var u = this.deltaT * i;
        seccionAlineada = calcularPuntos(this.curva, this.poligonoRiel, u);
        this.bufferVertices = this.bufferVertices.concat(seccionAlineada);
    }

    seccionAlineada = calcularPuntos(this.curva, this.poligonoRiel, 0.0);
    this.bufferVertices = this.bufferVertices.concat(seccionAlineada);
    this.buffer1 = new Tube (this.nroSegmentos,this.bufferVertices,(this.poligonoRiel.length-1)/3);
    this.buffer1.initTexture("pink.jpg");
	this.carrito = new Carrito();
}

MontaniaRusa.prototype.dibujar = function (modelMatrix){
	this.buffer1.draw(modelMatrix);
	//this.buffer2.draw(modelMatrix);
	this.carrito.dibujar(modelMatrix);
}
