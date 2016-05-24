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

    this.posInicialMouse = {x: 0, y: 0};
    this.posFinalMouse = {x: 0, y: 0};

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
            //console.log(this.at_point);
            var x = 150 * Math.sin(this.anguloPolar) * Math.cos(this.anguloAzimuth);
            var y = 150 * Math.cos(this.anguloPolar);
            var z = 150 * Math.sin(this.anguloPolar) * Math.sin(this.anguloAzimuth);
            this.at_point = [x, y, z];
            /*
             console.log("---------------------------------");
             console.log(this.eye_point);
             console.log(this.at_point);*/
            var pos = vec3.clone(this.eye_point);
            var target = vec3.clone(this.at_point);

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
            self.moverAdelante();
        }
        if (tecla == 83) { // S
            self.moverAtras();
        }
        if (tecla == 65) { // A
            self.moverIzquierda();
        }
        if (tecla == 68) { // D
            self.moverDerecha();
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
        self.mover_con_mouse(e);
    };
};

Camera.prototype.click = function (event) {
    if (event.which == this.botonMouse)
        this.clickeando = true;

    this.posInicialMouse = {x: event.clientX, y: event.clientY};
};

Camera.prototype.mover_con_mouse = function (event) {
    if (!this.clickeando)
        return;

    var x = event.clientX;
    var y = event.clientY;
    this.posFinalMouse = {x: x, y: y};

    this.anguloAzimuth += ((this.posFinalMouse.x - this.posInicialMouse.x) / 300);
    this.anguloPolar += (this.posFinalMouse.y - this.posInicialMouse.y) / 300;

    if (this.anguloPolar < 0) this.anguloPolar = 0.001;
    if (this.anguloPolar > Math.PI) this.anguloPolar = Math.PI;

    this.posInicialMouse = this.posFinalMouse;

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
    this.eye_point = [0, 0, 0];
    this.at_point = [0, 0, 0];
    this.camara_seleccionada = this.TIPOS_DE_CAMARAS.orbital;
};

Camera.prototype.seleccionarPrimerPersona = function () {
    this.eye_point = [4, 0, 3];
    this.anguloPolar= Math.PI/2;
    //this.anguloAzimuth = Math.PI/8;
    this.camara_seleccionada = this.TIPOS_DE_CAMARAS.primer_persona;
};

Camera.prototype.seleccionarCabina = function () {
    this.eye_point = [0, 0, 0];
    console.log("TODO");
    this.camara_seleccionada = this.TIPOS_DE_CAMARAS.cabina_nave;
};

Camera.prototype.seleccionarPersecucion = function () {
    this.eye_point = [0, 0, 0];

    console.log("TODO");
    this.camara_seleccionada = this.TIPOS_DE_CAMARAS.persecucion_nave;
};

Camera.prototype.moverAdelante = function () {
    if (this.camara_seleccionada !== this.TIPOS_DE_CAMARAS.primer_persona)
        return;
    var dir = [];
    vec3.normalize(dir, this.at_point);
    vec3.scale(dir, dir, 0.3);
    vec3.add(this.eye_point, this.eye_point, dir);
};

Camera.prototype.moverAtras = function () {
    if (this.camara_seleccionada != this.TIPOS_DE_CAMARAS.primer_persona)
        return;
    console.log("TODO");
    var dir = [];
    vec3.normalize(dir, this.at_point);
    vec3.scale(dir, dir, -0.3);
    vec3.add(this.eye_point, this.eye_point, dir);
};

Camera.prototype.moverIzquierda = function () {
    if (this.camara_seleccionada != this.TIPOS_DE_CAMARAS.primer_persona)
        return;
    var dir = [];
    vec3.normalize(dir, this.at_point);
    vec3.cross(dir,this.up_point,dir);
    vec3.scale(dir, dir, 0.3);
    vec3.add(this.eye_point, this.eye_point, dir);
};

Camera.prototype.moverDerecha = function () {
    if (this.camara_seleccionada != this.TIPOS_DE_CAMARAS.primer_persona)
        return;
    var dir = [];
    vec3.normalize(dir, this.at_point);
    vec3.cross(dir,dir,this.up_point);
    vec3.scale(dir, dir, 0.3);
    vec3.add(this.eye_point, this.eye_point, dir);
};