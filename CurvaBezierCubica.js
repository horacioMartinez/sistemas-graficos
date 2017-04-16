function CurvaBezierCubica() {
}


CurvaBezierCubica.prototype.getVertices = function (puntosControl, delta){
    if (puntosControl.length < 4 ){
        throw new Error("Deben pasarse al menos 4 puntos de control a curvaBezierCubica");
    }
    if (delta > 1 ){
        throw new Error("el delta tiene que estar entre 0 y 1");
    }
    var vertices = [];
    for (var i = 0; i < puntosControl.length - 3; i=i+3) {
        var p0 = puntosControl[i];
        var p1 = puntosControl[i+1];
        var p2 = puntosControl[i+2];
        var p3 = puntosControl[i+3];
        for (var t = 0; t <= 1; t = delta + t) {
            if (t == 0 && i > 0) continue;

            var pos = this.getPosition(p0,p1,p2,p3,t);
            var tan = this.getTangente(p0,p1,p2,p3,t);
            var normal = this.getNormal(p0,p1,p2,p3,t);
            var binormal = this.getBinormal(p0,p1,p2,p3,t);

            var vertice = new Vertex(normal,tan,binormal,pos,null);
            vertices.push(vertice);
        }
    }
    return vertices;
};


CurvaBezierCubica.prototype.getPosition = function (p0, p1, p2, p3, t) {

    var x, y,z;
    x = p0[0]*this.base0(t) + p1[0]*this.base1(t) + p2[0]*this.base2(t) + p3[0]*this.base3(t);
    y = p0[1]*this.base0(t) + p1[1]*this.base1(t) + p2[1]*this.base2(t) + p3[1]*this.base3(t);
    z = p0[2]*this.base0(t) + p1[2]*this.base1(t) + p2[2]*this.base2(t) + p3[2]*this.base3(t);
    return [x,y,z];
};

CurvaBezierCubica.prototype.getDerivada = function (p0,p1,p2,p3,t) {
    var x, y,z;
    x = p0[0]*this.base0der(t) + p1[0]*this.base1der(t) + p2[0]*this.base2der(t) + p3[0]*this.base3der(t);
    y = p0[1]*this.base0der(t) + p1[1]*this.base1der(t) + p2[1]*this.base2der(t) + p3[1]*this.base3der(t);
    z = p0[2]*this.base0der(t) + p1[2]*this.base1der(t) + p2[2]*this.base2der(t) + p3[2]*this.base3der(t);
    return [x,y,z];
};

CurvaBezierCubica.prototype.getTangente = function (p0,p1,p2,p3,t) {
    var res = [];
    vec3.normalize(res,this.getDerivada(p0,p1,p2,p3,t));
    return res;
};

CurvaBezierCubica.prototype.getBinormal = function (p0,p1,p2,p3,t) {
    return [0,0,1];
};

CurvaBezierCubica.prototype.getNormal = function (p0,p1,p2,p3,t) {
    var tan = this.getTangente(p0,p1,p2,p3,t);
    var biNormal = this.getBinormal(p0,p1,p2,p3,t);
    var res = [];
    vec3.cross(res,biNormal,tan);
    vec3.normalize(res,res);
    return res;
};

CurvaBezierCubica.prototype.base0 = function (t) {
    return (1-t)*(1-t)*(1-t)
};

CurvaBezierCubica.prototype.base1 = function(t){
    return 3*(1-t)*(1-t)*t;
};

CurvaBezierCubica.prototype.base2 = function(t){
    return 3*(1-t)*t*t;
};

CurvaBezierCubica.prototype.base3 = function(t){
    return t*t*t;
};

CurvaBezierCubica.prototype.base0der = function (t) {
    return -3*t*t+6*t-3;
};

CurvaBezierCubica.prototype.base1der = function(t){
    return 9*t*t-12*t+3;
};

CurvaBezierCubica.prototype.base2der = function(t){
    return -9*t*t+6*t;
};

CurvaBezierCubica.prototype.base3der = function(t){
    return 3*t*t;
};