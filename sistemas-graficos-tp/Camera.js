function Camera() {
    this.botonMouse = 1;
    this.teclaMas1 = 171;
    this.teclaMas2 = 107;
    this.teclaMenos1 = 109;
    this.teclaMenos2 = 173;

    this.clickeando = false;

    this.radio = 125;
    this.anguloPolar = Math.PI / 2.5;
    this.anguloAzimuth = Math.PI * 1.5;

    //eye_point, at_point, up_point
    this.eye_point = [0, 0, 0];
    this.at_point = [0, 0, 0];
    this.up_point = [0, 1, 0];

    this.posInicial = [0, 0];
    this.posFinal = [0, 0];

    this.canvas = document.getElementById("tp-canvas");
    this.initListeners();
}

Camera.prototype.update = function (cameraMatrix) {
    /*var matriz_camara = mat4.create();
     mat4.identity(matriz_camara);
     var eye_point = vec3.create();
     vec3.set(eye_point, 30, 65, -90);
     var at_point = vec3.create();
     vec3.set(at_point, 0, 0, 0);
     var up_point = vec3.create();
     vec3.set(up_point, 0, 1, 0);

     mat4.lookAt(cameraMatrix, eye_point, at_point, up_point);
     mat4.multiply(cameraMatrix, cameraMatrix, matriz_camara);*/

    mat4.identity(cameraMatrix);
    var x = this.radio * Math.sin(this.anguloPolar) * Math.cos(this.anguloAzimuth);
    var y = this.radio * Math.cos(this.anguloPolar);
    var z = this.radio * Math.sin(this.anguloPolar) * Math.sin(this.anguloAzimuth);

    return mat4.lookAt(cameraMatrix, [x, y, z], this.at_point, this.up_point);
};

Camera.prototype.initListeners = function () {
    var self = this;
    this.canvas.onmousedown = function (e) {
        self.click(e);
    };

    this.canvas.onmousewheel = function (e) {
        console.log("HOLA");
        var cant = event.wheelDelta / 120;
        self.zoom(cant);
        return false;
    };

    window.addEventListener("keydown", function (e) {
        var tecla = e.keyCode;
        if (tecla == self.teclaMas1 || tecla == self.teclaMas2) {
            self.zoom(-10);
        }
        if (tecla == self.teclaMenos1 || tecla == self.teclaMenos2) {
            self.zoom(10);
        }
    }, true);

    this.canvas.onmouseup = function (e) {
        self.soltarClick(e);
    };
    this.canvas.onmousemove = function (e) {
        self.mover(e);
    };
};

Camera.prototype.click = function (event) {
    if (event.which == this.botonMouse)
        this.clickeando = true;

    this.posInicial = {x: event.clientX, y: event.clientY};
};

Camera.prototype.mover = function (event) {
    if (!this.clickeando)
        return;

    var x = event.clientX;
    var y = event.clientY;
    this.posFinal = {x: x, y: y};

    this.anguloAzimuth += ((this.posFinal.x - this.posInicial.x) / 300);
    this.anguloPolar += (this.posFinal.y - this.posInicial.y) / 300;

    if (this.anguloPolar < 0) this.anguloPolar = 0.001;
    if (this.anguloPolar > Math.PI) this.anguloPolar = Math.PI;

    this.posInicial = this.posFinal;

};

Camera.prototype.zoom = function (cant) {
    this.radio += (cant);
    return false;
};

Camera.prototype.soltarClick = function (event) {
    if (event.which == this.botonMouse)
        this.clickeando = false;
};