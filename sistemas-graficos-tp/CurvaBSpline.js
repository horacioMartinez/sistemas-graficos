
function CurvaBSpline() {
}


CurvaBSpline.prototype.getVertices = function (puntosControl, delta){
    if (puntosControl.length < 3 ){
        throw new Error("Deben pasarse al menos 3 puntos de control a CurvaBSpline");
    }
    if (delta > 1 ){
        throw new Error("el delta tiene que estar entre 0 y 1");
    }
    var vertices = [];

    for(var i = 0; i < puntosControl.length - 2; ++i) {
        var p0 = puntosControl[i];
        var p1 = puntosControl[i+1];
        var p2 = puntosControl[i+2];
        for (var t = 0; t <= 1; t = delta + t) {
            var pos = this.getPosition(p0,p1,p2,t);
            var tan = this.getTangente(p0,p1,p2,t);
            var normal = this.getNormal(p0,p1,p2,t);
            var binormal = this.getBinormal(p0,p1,p2,t);

            var vertice = new Vertex(normal,tan,binormal,pos,null);
            vertices.push(vertice);
        }
    }
    return vertices;
};

CurvaBSpline.prototype.getPosition = function (p0, p1, p2,t) {
    var x, y,z;
    x = p0[0]*this.base0(t) + p1[0]*this.base1(t) + p2[0]*this.base2(t);
    y = p0[1]*this.base0(t) + p1[1]*this.base1(t) + p2[1]*this.base2(t);
    z = p0[2]*this.base0(t) + p1[2]*this.base1(t) + p2[2]*this.base2(t);
    return [x,y,z];
};


CurvaBSpline.prototype.getDerivada = function (p0,p1,p2,t) {
    var x, y,z;
    x = p0[0]*this.base0der(t) + p1[0]*this.base1der(t) + p2[0]*this.base2der(t);
    y = p0[1]*this.base0der(t) + p1[1]*this.base1der(t) + p2[1]*this.base2der(t);
    z = p0[2]*this.base0der(t) + p1[2]*this.base1der(t) + p2[2]*this.base2der(t);
    return [x,y,z];
};

CurvaBSpline.prototype.getTangente = function (p0,p1,p2,t) {
    var res = [];
    vec3.normalize(res,this.getDerivada(p0,p1,p2,t));
    return res;
};

CurvaBSpline.prototype.getBinormal = function (p0,p1,p2,t) {
    return [0,0,1];
};

CurvaBSpline.prototype.getNormal = function (p0,p1,p2,t) {
    var tan = this.getTangente(p0,p1,p2,t);
    var biNormal = this.getBinormal(p0,p1,p2,t);
    var res = [];
    vec3.cross(res,biNormal,tan);
    vec3.normalize(res,res);
    return res;
};

CurvaBSpline.prototype.base0 = function (t) {
    return (1-t)*(1-t)/2;
};

CurvaBSpline.prototype.base1 = function(t){
    return - Math.pow(t, 2) + t + 1/2;
};

CurvaBSpline.prototype.base2 = function(t){
    return t*t/2;
};

CurvaBSpline.prototype.base0der = function (t) {
    return t - 1;
};

CurvaBSpline.prototype.base1der = function(t){
    return -2 * t + 1;
};

CurvaBSpline.prototype.base2der = function(t){
    return t;
};

