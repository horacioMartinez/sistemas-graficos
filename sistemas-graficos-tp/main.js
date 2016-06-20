var gl;

function initGL(canvas) {
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

var shaderProgram;

function initShaders() {
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

    shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    shaderProgram.vertexTangentAttribute = gl.getAttribLocation(shaderProgram, "aVertexTangent");
    gl.enableVertexAttribArray(shaderProgram.vertexTangentAttribute);

    shaderProgram.vertexBinormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexBinormal");
    gl.enableVertexAttribArray(shaderProgram.vertexBinormalAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.ViewMatrixUniform = gl.getUniformLocation(shaderProgram, "uViewMatrix");
    shaderProgram.ModelMatrixUniform = gl.getUniformLocation(shaderProgram, "uModelMatrix");
    shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
    shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
    shaderProgram.lightingPrincipalDirectionUniform = gl.getUniformLocation(shaderProgram, "uPrincipalLightPosition");
    shaderProgram.directionalPrincipalColorUniform = gl.getUniformLocation(shaderProgram, "uPrincipalDirectionalColor");
    shaderProgram.specularPrincipalColorUniform = gl.getUniformLocation(shaderProgram, "uPrincipalSpecularColor");
    shaderProgram.lightPrincipalIntensity = gl.getUniformLocation(shaderProgram, "uPrincipalLightIntensity");
    shaderProgram.lightingSecondaryDirectionUniform = gl.getUniformLocation(shaderProgram, "uSecondaryLightPosition");
    shaderProgram.directionalSecondaryColorUniform = gl.getUniformLocation(shaderProgram, "uSecondaryDirectionalColor");
    shaderProgram.specularSecondaryColorUniform = gl.getUniformLocation(shaderProgram, "uSecondarySpecularColor");
    shaderProgram.lightSecondaryIntensity = gl.getUniformLocation(shaderProgram, "uSecondaryLightIntensity");
    
    shaderProgram.cameraPositionUniform = gl.getUniformLocation(shaderProgram, "uCameraPos");

    //refleccion luz:
    shaderProgram.useReflectionUniform = gl.getUniformLocation(shaderProgram, "uUseReflection");
    shaderProgram.reflectFactorUniform = gl.getUniformLocation(shaderProgram, "uReflectFactor");

    shaderProgram.reflectionSample = gl.getUniformLocation(shaderProgram, "uReflectionSampler");

    // mapa normales:
    shaderProgram.useNormalMap = gl.getUniformLocation(shaderProgram, "uUseNormalMap");
    shaderProgram.samplerNormal = gl.getUniformLocation(shaderProgram, "uNormalSampler");

}

var CameraMatrix = mat4.create();
var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();

var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;

var deimos = null;
var tierra = null;
var phobos = null;

var enviromentReflectionTexture = null;

var deimosRotationMatrix = mat4.create();
mat4.identity(deimosRotationMatrix);

var deimosRotationAngletierra = 0.0;
var phobosRotationAngledeimos = 0.0;

function mvPushMatrix() {
    var copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
}

function mvPopMatrix() {
    if (mvMatrixStack.length == 0) {
        throw "Invalid popMatrix!";
    }
    mvMatrix = mvMatrixStack.pop();
}

function initEnvioromentalEarthReflectionTexture() {
    var aux_texture = gl.createTexture();
    this.texture = aux_texture;
    this.texture.image = new Image();
    var self = this;
    this.texture.image.onload = function () {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.bindTexture(gl.TEXTURE_2D, self.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, self.texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);

        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    this.texture.image.src = 'textures/refMap.jpg';

    enviromentReflectionTexture = this.texture;
    setReflectionTextureUniform(enviromentReflectionTexture);
}

function setReflectionTextureUniform() {
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, enviromentReflectionTexture);
    gl.uniform1i(shaderProgram.reflectionSample, 1);
}

function setNormalTexture(texture) {
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(shaderProgram.samplerNormal, 2);
}

function setViewProjectionMatrix(CameraMatrix, pMatrix) {
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.ViewMatrixUniform, false, CameraMatrix);
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

var DISTANCIA_ESTACION_TIERRA = [0, -120, 0];
var DISTANCIA_ESTACION_SOL = [300, 0, 0];
    
function drawScene() {
    
    setReflectionTextureUniform();

    // Se configura el vierport dentro de área ¨canvas¨. en este caso se utiliza toda
    // el área disponible
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    // Se habilita el color de borrado para la pantalla (Color Buffer) y otros buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Se configura la matriz de proyección
    mat4.perspective(pMatrix, 3.14 / 12.0, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0);

    // Configuración de la luz
    // Se inicializan las variables asociadas con la Iluminación
    var lighting;
    lighting = true;
    gl.uniform1i(shaderProgram.useLightingUniform, lighting);

    // Configuramos la iluminación general
    // Principal
    var sunPosition = [300.0*Math.cos(deimosRotationAngletierra), 0.0, -300.0*Math.sin(deimosRotationAngletierra)];
    //vec3.transformMat4(lightPosition, lightPosition, CameraMatrix);
    gl.uniform3fv(shaderProgram.lightingPrincipalDirectionUniform, sunPosition);
    gl.uniform1f(shaderProgram.lightPrincipalIntensity, 3.0);						//Intensidad general
    gl.uniform3f(shaderProgram.ambientColorUniform, 0.2, 0.2, 0.2);					//Ambiente
    gl.uniform3f(shaderProgram.directionalPrincipalColorUniform, 1.0, 1.0, 1.0);	//Direccional
    gl.uniform3f(shaderProgram.specularPrincipalColorUniform, 0.5, 0.5, 0.5);		//Especular
    
    // Secundaria
    var earthPosition = DISTANCIA_ESTACION_TIERRA;
    gl.uniform3fv(shaderProgram.lightingSecondaryDirectionUniform, earthPosition);
    gl.uniform1f(shaderProgram.lightSecondaryIntensity, 0.5);						//Intensidad general
    gl.uniform3f(shaderProgram.directionalSecondaryColorUniform, 0.0, 0.0, 1.0);	//Direccional
    gl.uniform3f(shaderProgram.specularSecondaryColorUniform, 0.0, 0.0, 0.0);		//Especular		//POR AHORA SETEADA A 0

    // Matriz de modelado del tierra
    var model_matrix_tierra = mat4.create();
    mat4.identity(model_matrix_tierra);
    mat4.translate(model_matrix_tierra, model_matrix_tierra, DISTANCIA_ESTACION_TIERRA);
    mat4.scale(model_matrix_tierra, model_matrix_tierra, [100.0, 100.0, 100.0]);
    tierra.draw(model_matrix_tierra);

    // Matriz de modelado del sol
    var model_matrix_sol = mat4.create();
    mat4.identity(model_matrix_sol);
    mat4.rotate(model_matrix_sol, model_matrix_sol, deimosRotationAngletierra, [0, 1, 0]);
    mat4.translate(model_matrix_sol, model_matrix_sol, DISTANCIA_ESTACION_SOL);
    mat4.scale(model_matrix_sol, model_matrix_sol, [5.0, 5.0, 5.0]);
    sun.draw(model_matrix_sol);

    // Definimos las matrices de modelado de la estación
    var model_space_station_matrix = mat4.create();
    mat4.identity(model_space_station_matrix);
    //mat4.rotate(model_space_station_matrix, model_space_station_matrix, deimosRotationAngletierra, [0, 1, 0]);

    var cilindro_matrix = mat4.create();
    mat4.identity(cilindro_matrix);
    mat4.rotate(cilindro_matrix, cilindro_matrix, deimosRotationAngletierra, [0, 1, 0]);

    // Dibujamos la Nave, la Estación y el Universo
    estacion.draw(model_space_station_matrix);
    nave.draw(mat4.create());
    universo.draw(mat4.create());

    // Actualizamos la ubicación de la camara
    camera.update(CameraMatrix, deimosRotationAngletierra);
    setViewProjectionMatrix(CameraMatrix, pMatrix);
    
    // Obtenemos la ubicación de la camara y se la pasamos al fshader
    var camera_position = camera.getPosition();
    gl.uniform3f(shaderProgram.cameraPositionUniform, camera_position[0], camera_position[1], camera_position[2]);
}

function tick() {
    requestAnimFrame(tick);
    var newRotationMatrix = mat4.create();
    mat4.identity(newRotationMatrix);
    mat4.rotate(newRotationMatrix, newRotationMatrix, 0.025, [0, 1, 0]);
    mat4.multiply(newRotationMatrix, deimosRotationMatrix, deimosRotationMatrix);

    deimosRotationAngletierra += 0.0045;
    phobosRotationAngledeimos += 0.0005;
    drawScene();
}

function webGLStart() {
    var canvas = document.getElementById("tp-canvas");
    initGL(canvas);
    initShaders();

    initEnvioromentalEarthReflectionTexture();
    
    sun = new TexturedSphere(32, 32);
    sun.initBuffers();
    sun.initTexture("textures/sun.jpg");

    tierra = new TexturedSphere(64, 64);
    tierra.initBuffers();
    tierra.initTexture("textures/earth.jpg");

    universo = new Background();
    estacion = new SpaceStation();
    nave = new Nave();

    camera = new Camera(nave);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    tick();
}
