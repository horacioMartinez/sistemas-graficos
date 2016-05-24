function Camera() {
    this.TIPOS_DE_CAMARAS = {orbital: 1, primer_persona: 2, cabina_nave: 3, persecucion_nave: 4};

    this.camara_seleccionada = this.TIPOS_DE_CAMARAS.orbital;

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

    this.posInicial = {x: 0, y: 0};
    this.posFinal = {x: 0, y: 0};

    this.canvas = document.getElementById("tp-canvas");
    this.initListeners();
}

Camera.prototype.setTarget = function (target) {
    this.at_point = target;
};

Camera.prototype.update = function (cameraMatrix, rotacionEstacion) {

    switch (this.camara_seleccionada) {
        case this.TIPOS_DE_CAMARAS.orbital:
            mat4.identity(cameraMatrix);
            var x = this.radio * Math.sin(this.anguloPolar) * Math.cos(this.anguloAzimuth);
            var y = this.radio * Math.cos(this.anguloPolar);
            var z = this.radio * Math.sin(this.anguloPolar) * Math.sin(this.anguloAzimuth);
            mat4.lookAt(cameraMatrix, [x, y, z], this.at_point, this.up_point);
            break;

        case this.TIPOS_DE_CAMARAS.primer_persona:
            mat4.identity(cameraMatrix);
            var x = 3 * Math.sin(this.anguloPolar) * Math.cos(this.anguloAzimuth);
            var y = 3 * Math.cos(this.anguloPolar);
            var z = 35 * Math.sin(this.anguloPolar) * Math.sin(this.anguloAzimuth);
            //console.log(this.at_point);
            var pos = [4, 0, 3];
            var target = [x, y, z];
            vec3.rotateY(pos, pos, [0, 0, 0], rotacionEstacion);
            vec3.rotateY(target, target, [0, 0, 0], rotacionEstacion);
            //console.log(pos);
            //console.log([x,y,z]);
            mat4.lookAt(cameraMatrix, pos, target, this.up_point);
            break;

        default:
            throw new Error("tipo de camara invalido");
    }
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
        if (tecla == 87) { // W
            console.log("W!")
        }
        if (tecla == 83) { // S
            console.log("S!")
        }
        if (tecla == 65) { // A
            console.log("A!")
        }
        if (tecla == 68) { // D
            console.log("D!")
        }
        if (tecla === 49) { //1
            self.seleccionarOrbital();
        }
        if (tecla === 50) { //2
            self.seleccionarPrimerPersona();
        }
        if (tecla === 51) { //3
            self.seleccionarCabina();
        }
        if (tecla === 52) { //4
            self.seleccionarPersecucion();
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

Camera.prototype.seleccionarOrbital = function () {
    this.camara_seleccionada = this.TIPOS_DE_CAMARAS.orbital;
};

Camera.prototype.seleccionarPrimerPersona = function () {
    this.camara_seleccionada = this.TIPOS_DE_CAMARAS.primer_persona;

};

Camera.prototype.seleccionarCabina = function () {
    console.log("TODO");
};
Camera.prototype.seleccionarPersecucion = function () {
    console.log("TODO");
};