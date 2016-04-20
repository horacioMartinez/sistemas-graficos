/**
 * Created by chris on 07/10/15.
 */
function Helix (radius,x0,y0,c,v) {
    this.radius = radius;
    this.x0 = x0;
    this.y0 = y0;
    this.c = c;
    this.vueltas = v;
}
Helix.prototype.p = function (t) {
    var u = t*this.vueltas;
    return [this.radius*Math.cos(2*Math.PI*u) + this.x0,this.radius*Math.sin(2*Math.PI*u) + this.y0,this.c*u];
}

// El punto es 2*cos(6pi) , 2*sin(6pi), 3 => 2,0,3

Helix.prototype.t = function (t) {
    var u = t*this.vueltas;
    var nt = [-2*Math.PI*this.radius*Math.sin(2*Math.PI*u),2*Math.PI*this.radius*Math.cos(2*Math.PI*u),this.c];
    var vect = vec3.create(nt);
    vec3.normalize(vect,vect);
    return [vect[0],vect[1],vect[2]];
}
