function SolarPanelWing() {

    this.CANTIDAD_BLOCKS = 4;
    this.LARGO_MAIN_PIPE = 7;
    this.mainPipe1 = new Cilindro(0.03, this.LARGO_MAIN_PIPE, 15, "textures/pink.jpg");
    this.mainPipe2 = new Cilindro(0.03, this.LARGO_MAIN_PIPE, 15, "textures/pink.jpg");
    this.blocks = [];
    this.block1 = new SolarPanelBlock();
    this.block2 = new SolarPanelBlock();
    this.block3 = new SolarPanelBlock();
    this.block4 = new SolarPanelBlock();
    this.blocks.push(this.block1);
    this.blocks.push(this.block2);
    this.blocks.push(this.block3);
    this.blocks.push(this.block4);

    this.initListeners();
    this.initNormalTexture();
}

SolarPanelWing.prototype.draw = function (modelMatrix) {


    var matPipe = mat4.clone(modelMatrix);
    var matPipe2 = mat4.clone(modelMatrix);

    mat4.rotateY(matPipe, matPipe, Math.PI);
    mat4.translate(matPipe, matPipe, [-this.mainPipe1.radio * 2, 0, 0]);
    mat4.translate(matPipe, matPipe, [0, this.mainPipe1.largo / 4, 0]);
    this.mainPipe1.draw(matPipe);

    mat4.translate(matPipe2, matPipe2, [-this.mainPipe1.radio * 2, 0, 0]);
    mat4.translate(matPipe2, matPipe2, [0, this.mainPipe1.largo / 4, 0]);
    this.mainPipe2.draw(matPipe2);

    this.setNormalTexture(); // pone la textura del normal map
    gl.uniform1i(shaderProgram.useNormalMap, true);
    gl.uniform1i(shaderProgram.useReflectionUniform, true);
    gl.uniform1f(shaderProgram.reflectFactorUniform, 0.4);
    for (var i = 0; i < this.CANTIDAD_BLOCKS; i++) {
        var matBlock = mat4.clone(modelMatrix);
        if (this.blocks[i].desplazado)
            mat4.translate(matBlock, matBlock, [0, (i / this.CANTIDAD_BLOCKS) * this.LARGO_MAIN_PIPE * 7 / 8, 0]);
        else
            mat4.translate(matBlock, matBlock, [0, (i / this.CANTIDAD_BLOCKS) * this.LARGO_MAIN_PIPE / 8, 0]);
        mat4.rotateZ(matBlock, matBlock, Math.PI / 2);
        if (!this.blocks[i].rotado)
            mat4.rotateY(matBlock, matBlock, Math.PI / 2);
        this.blocks[i].draw(matBlock);
    }
    gl.uniform1i(shaderProgram.useReflectionUniform, false);
    gl.uniform1i(shaderProgram.useNormalMap, false);

};

SolarPanelWing.prototype.setNormalTexture= function() {
    setNormalTexture(this.normal_texture);
};

SolarPanelWing.prototype.initNormalTexture = function(){
    this.normal_texture = gl.createTexture();
    this.normal_texture.image = new Image();
    var self = this;
    this.normal_texture.image.onload = function () {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.bindTexture(gl.TEXTURE_2D, self.normal_texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, self.normal_texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);

        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    this.normal_texture.image.src = 'textures/panelsolar-normalMap-2.png';
};

SolarPanelWing.prototype.initListeners = function () {
    var self = this;

    window.addEventListener("keydown", function (e) {
        var tecla = e.keyCode;

        if (tecla == 79) { // O

            if (!self.block4.desplazado) {
                self.block4.desplazado = true;
                return;
            }
            if (!self.block3.desplazado) {
                self.block3.desplazado = true;
                return;
            }
            if (!self.block2.desplazado) {
                self.block2.desplazado = true;
                return;
            }
            if (!self.block1.desplazado) {
                self.block1.desplazado = true;
                return;
            }
            if (!self.block4.rotado) {
                self.block4.rotado = true;
                return;
            }
            if (!self.block3.rotado) {
                self.block3.rotado = true;
                return;
            }
            if (!self.block2.rotado) {
                self.block2.rotado = true;
                return;
            }
            if (!self.block1.rotado) {
                self.block1.rotado = true;
                return;
            }
        }
        if (tecla == 80) { // P

            if (self.block4.rotado) {
                self.block4.rotado = false;
                return;
            }
            if (self.block3.rotado) {
                self.block3.rotado = false;
                return;
            }
            if (self.block2.rotado) {
                self.block2.rotado = false;
                return;
            }
            if (self.block1.rotado) {
                self.block1.rotado = false;
                return;
            }

            if (self.block1.desplazado) {
                self.block1.desplazado = false;
                return;
            }
            if (self.block2.desplazado) {
                self.block2.desplazado = false;
                return;
            }
            if (self.block3.desplazado) {
                self.block3.desplazado = false;
                return;
            }

            if (self.block4.desplazado) {
                self.block4.desplazado = false;
                return;
            }
        }
    }, true);
};