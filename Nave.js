function Nave() {
    this.casco = new NaveCasco();
    this.vidrio = new NaveVidrio();
    this.wing = new NaveCompleteWing();
    this.legs = new NaveLegs();
    this.movimiento = new MovimientoNave();
    this.initListeners(this.movimiento);
    this.posicion_inicial = [100, 20, -0];
    this.hideLegs = false;
}

Nave.prototype.draw = function (modelMatrix) {
    this.movimiento.step();

    var matNave = mat4.clone(modelMatrix);

    mat4.scale(matNave, matNave, [0.2, 0.2, 0.2]);
    mat4.translate(matNave, matNave, this.posicion_inicial);
    mat4.multiply(matNave,matNave,this.movimiento.getMatriz());

    this.position = vec3.transformMat4([],[0,0,0],matNave);

    // Dibujamos el Casco
    var matCasco = mat4.clone(matNave);
    mat4.translate(matCasco, matCasco, [-12, -3, -3]);

    var matAux = mat4.clone(matNave);
    mat4.translate(matAux, matAux, [12, 3, 0]);
    this.posicion_cola = vec3.transformMat4([],[0,0,0],matAux);

    this.arriba = vec3.transformMat4([],[0,0,1],matNave);

    this.vidrio.draw(matCasco);
    gl.uniform1i(shaderProgram.useReflectionUniform, true);
    gl.uniform1f(shaderProgram.reflectFactorUniform, 0.6);
    this.casco.draw(matCasco);
    gl.uniform1i(shaderProgram.useReflectionUniform, false);

    // Dibujamos las Alas
    mat4.translate(matNave, matNave, [0, 0, -3]);	// Alineamos la nave al centro
    var matWing = mat4.clone(matNave);
    mat4.translate(matWing, matWing, [0, -1.5, 0]);
    this.wing.draw(matWing,this.movimiento.getVelocidad());

    // Dibujamos las Patas
    this.legs.draw(matNave);

};

Nave.prototype.getPosicion = function(){
    return this.position;
};

Nave.prototype.getDireccion = function(){
    var v = vec3.subtract([],this.position,this.posicion_cola);
    vec3.normalize(v,v);
    return v;
};

Nave.prototype.getDireccionArriba = function(){
    return vec3.normalize([],this.arriba);
};

Nave.prototype.getDirVelocidad = function(){
  return vec3.normalize([],this.movimiento.getVelocidad());
};

Nave.prototype.setMovimientoActivado = function (activado){
    this.movimiento.movimientoActivado = activado;
};

Nave.prototype.initListeners = function (movimiento) {
    var movimientoNave = movimiento;

    $(document).keydown(function (event) {
        if (!movimientoNave.movimientoActivado)
            return;
        if (event.keyCode == 107 || event.keyCode == 189) movimientoNave.onTeclaDown(movimientoNave.TECLA_MAS);  // -
        if (event.keyCode == 109 || event.keyCode == 187) movimientoNave.onTeclaDown(movimientoNave.TECLA_MENOS);  // +
        if (event.keyCode == 87)  movimientoNave.onTeclaDown(movimientoNave.TECLA_ARRIBA);  // W
        if (event.keyCode == 83)  movimientoNave.onTeclaDown(movimientoNave.TECLA_ABAJO);	// S
        if (event.keyCode == 65)  movimientoNave.onTeclaDown(movimientoNave.TECLA_DERECHA);  // W
        if (event.keyCode == 68)  movimientoNave.onTeclaDown(movimientoNave.TECLA_IZQUIERDA);	// S
        if (event.keyCode == 69)  movimientoNave.onTeclaDown(movimientoNave.TECLA_GIRO_HORARIO);  // q
        if (event.keyCode == 81)  movimientoNave.onTeclaDown(movimientoNave.TECLA_GIRO_ANTIHORARIO);	// e
        
        if (event.keyCode == 112);
        if (event.keyCode == 80)  this.hideLegs = false;	// P
    });

    $(document).keyup(function (event) {
        if (!movimientoNave.movimientoActivado)
            return;

        if (event.keyCode == 107) movimientoNave.onTeclaUp(movimientoNave.TECLA_MAS);  // -
        if (event.keyCode == 109) movimientoNave.onTeclaUp(movimientoNave.TECLA_MENOS);  // +
        if (event.keyCode == 87)  movimientoNave.onTeclaUp(movimientoNave.TECLA_ARRIBA);		//W
        if (event.keyCode == 83)  movimientoNave.onTeclaUp(movimientoNave.TECLA_ABAJO);		//S
        if (event.keyCode == 65)  movimientoNave.onTeclaUp(movimientoNave.TECLA_DERECHA);  // A
        if (event.keyCode == 68)  movimientoNave.onTeclaUp(movimientoNave.TECLA_IZQUIERDA);	// D
        if (event.keyCode == 69)  movimientoNave.onTeclaUp(movimientoNave.TECLA_GIRO_HORARIO);  // q
        if (event.keyCode == 81)  movimientoNave.onTeclaUp(movimientoNave.TECLA_GIRO_ANTIHORARIO);	// e
        
        if (event.keyCode == 112)  this.hideLegs = false;	// p
        if (event.keyCode == 80)  this.hideLegs = false;	// P

    });
};

function MovimientoNave() {

    this.movimientoActivado = false;

    var posicion = vec3.fromValues(0, 0, 0);

    this.TECLA_ARRIBA = 0;
    this.TECLA_ABAJO = 1;
    this.TECLA_IZQUIERDA = 2;
    this.TECLA_DERECHA = 3;
    this.TECLA_MAS = 4;
    this.TECLA_MENOS = 5;
    this.TECLA_GIRO_HORARIO = 6;
    this.TECLA_GIRO_ANTIHORARIO = 7;

    var estadoTeclas = [false, false, false, false, false, false];
    var rotacion = mat4.create();
    mat4.identity(rotacion);

    /* 
        +X frente de la nave
        +Y techo de la nave
        +Z
     */

    var potenciaMotor = 0.01;

    var velocidad = 0;
    var angCabezeo = 0; // Z
    var angRolido = 0; // respecto del X de la Nave
    var angVirada = 0;

    var momento = vec3.fromValues(0, 0, 0);

    this.init = function () {

    }

    this.step = function () {

        angCabezeo = 0;
        angCabezeo = (estadoTeclas[this.TECLA_ARRIBA]) ? -0.005 : angCabezeo;
        angCabezeo = (estadoTeclas[this.TECLA_ABAJO]) ? 0.005 : angCabezeo;

        angRolido = 0;
        angRolido = (estadoTeclas[this.TECLA_GIRO_HORARIO]) ? -0.005 : angRolido;
        angRolido = (estadoTeclas[this.TECLA_GIRO_ANTIHORARIO]) ? 0.005 : angRolido;

        angVirada = 0;
        angVirada = (estadoTeclas[this.TECLA_IZQUIERDA]) ? -0.005 : angVirada;
        angVirada = (estadoTeclas[this.TECLA_DERECHA]) ? 0.005 : angVirada;

        angRolido = (estadoTeclas[this.TECLA_DERECHA]) ? -0.001 : angRolido;
        angRolido = (estadoTeclas[this.TECLA_IZQUIERDA]) ? 0.001 : angRolido;

        var impulso = 0;
        impulso = (estadoTeclas[this.TECLA_MAS]) ? 0.1 : impulso;
        impulso = (estadoTeclas[this.TECLA_MENOS]) ? -0.1 : impulso;

        velocidad += impulso;

        var ejeX = vec3.fromValues(1, 0, 0);
        mat4.rotate(rotacion, rotacion, angRolido, ejeX);

        var ejeZ = vec3.fromValues(0, 0, 1);
        mat4.rotate(rotacion, rotacion, angCabezeo, ejeZ);

        var ejeY = vec3.fromValues(0, 1, 0);
        mat4.rotate(rotacion, rotacion, angVirada, ejeY);

        var direccion = vec3.fromValues(Math.max(0, velocidad), 0, 0);
        vec3.transformMat4(direccion, direccion, rotacion);

        var inercia = 0.99;
        momento[0] = momento[0] * inercia + direccion[0] * 0.0001;
        momento[1] = momento[1] * inercia + direccion[1] * 0.0001;
        momento[2] = momento[2] * inercia + direccion[2] * 0.0001;

        vec3.subtract(posicion, posicion, momento);

    };

    this.onTeclaDown = function (tecla) {
        //console.log("onTeclaDown "+tecla);
        var n = parseInt(tecla);
        if (!isNaN(n)) estadoTeclas[n] = true;
    };

    this.onTeclaUp = function (tecla) {
        //console.log("onTeclaUp "+tecla);
        var n = parseInt(tecla);
        if (!isNaN(n)) estadoTeclas[n] = false;
    };

    this.getMatriz = function () {

        var m = mat4.create();
        mat4.translate(m, m, posicion);
        mat4.multiply(m, m, rotacion);

        return m;
    };

    this._getPos = function(){
        return posicion;
    };

    this.getVelocidad = function () {
        return velocidad;
    }
}
