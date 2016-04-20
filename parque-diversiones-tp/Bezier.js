function Shape(){
    this.beziers = [];
    this.bez1 = new BezierCubica([0.0,0.0,0.0],[1.0,1.0,0.0],[1.6,1.0,0.5],[2.1,1.3,0.6]);
    this.bez2 = new BezierCubica([2.1,1.3,0.6],[2.6,1.6,0.7],[2.7,2.0,0.8],[2.5,2.4,1.0]);
    this.bez3 = new BezierCubica([2.5,2.4,1.0],[2.3,2.8,1.2],[1.7,3.2,1.5],[0.8,3.5,1.6]);
    this.bez4 = new BezierCubica([0.8,3.5,1.6],[-0.1,3.8,1.7],[-1.6,3.1,1.3],[-2.4,2.1,1.2]);
    this.bez5 = new BezierCubica([-2.4,2.1,1.2],[-3.2,1.1,1.1],[-3.6,-0.1,0.6],[-3.4,-1.1,0.2]);
    this.bez6 = new BezierCubica([-3.4,-1.1,0.2],[-3.2,-2.1,-0.2],[-2.0,-3.0,0.0],[-1.4,-2.8,0.2]);
    this.bez7 = new BezierCubica([-1.4,-2.8,0.2],[-0.8,-2.6,0.4],[-1.0,-1.0,0.0],[0.0,0.0,0.0]);
    
    this.beziers.push(this.bez1);
    this.beziers.push(this.bez2);
    this.beziers.push(this.bez3);
    this.beziers.push(this.bez4);
	this.beziers.push(this.bez5);
	this.beziers.push(this.bez6);
	this.beziers.push(this.bez7);

   // var bez3 = new BezierCubica([],[],[],[]);
   // var bez4 = new BezierCubica([],[],[],[]);
}

function MonRusaConLoop(){
	this.beziers = [];
    this.bez1 = new Helix(2.0,0.0,0.0,1.0,3.0);
    var tt = 1.00;
	var p1 = this.bez1.p(tt);
	var p2 = [this.bez1.p(tt)[0] + this.bez1.t(tt)[0],this.bez1.p(tt)[1] + this.bez1.t(tt)[1],this.bez1.p(tt)[2] + this.bez1.t(tt)[2]];
	var p3 = [2.0,2.3,3.2];
	var p4 = [2.0,3.4,4.0];
	this.bez3 = new BezierCubica(p4,calcularPuntoSiguiente(p3,p4),[3.5,6.0,5.2],[6.0,6.0,6.0]);
	this.bez4 = new BezierCubica([6.0,6.0,6.0],[8.5,6.0,6.8],[10.0,5.0,5.0],[10.0,3.0,4.0]);
	this.bez5 = new BezierCubica([10.0,3.0,4.0],[10.0,1.0,3.0],[10.0,-1.7,0.0],[10.0,-4.0,0.5]);
	this.bez6 = new BezierCubica([10.0,-4.0,0.5],[10.0,-6.3,1.0],[10.0,-7.0,4.0],[10.0,-7.3,4.8]);
	this.bez7 = new BezierCubica([10.0,-7.3,4.8],[10.0,-7.6,5.6],[10.0,-9.0,6.0],[10.0,-10.0,5.5]);
	this.bez8 = new BezierCubica([10.0,-10.0,5.5],[10.0,-11.0,5.0],[9.0,-13.0,1.0],[8.0,-14.0,0.75]);
	this.bez9 = new BezierCubica([8.0,-14.0,0.75],[7.0,-15.0,0.5],[4.0,-15.0,0.5],[3.0,-14.0,0.5]);
	this.bez10 = new BezierCubica([3.0,-14.0,0.5],[2.0,-13.0,0.5],[2.0,-7.0,0.25],[2.0,0.0,0.0]);
	this.bez2 = new BezierCubica(p1,p2,p3,p4);
	this.beziers.push(this.bez1);
	this.beziers.push(this.bez2);
	this.beziers.push(this.bez3);
	this.beziers.push(this.bez4);
	this.beziers.push(this.bez5);
	this.beziers.push(this.bez6);
	this.beziers.push(this.bez7);
	this.beziers.push(this.bez8);
	this.beziers.push(this.bez9);
	this.beziers.push(this.bez10);
}
MonRusaConLoop.prototype.p = function (u){
	return this.beziers[Math.floor(u)].p(u - Math.floor(u));
}
MonRusaConLoop.prototype.t = function (u){
	//console.log("mi u",u);
	return this.beziers[Math.floor(u)].t(u - Math.floor(u));
}
Shape.prototype.p = function(u){
	return this.beziers[Math.floor(u)].p(u - Math.floor(u));
}
Shape.prototype.t = function(u){
	return this.beziers[Math.floor(u)].t(u - Math.floor(u));
}
Shape.prototype.n = function(u){
	return calcularNormal(this.t(u));
}

function calcularPuntoSiguiente(anteultimo,ultimo){
    var vec3ault = vec3.create(anteultimo);
    var vec3ult = vec3.create(ultimo);
    var aux = vec3.create();
    vec3.subtract(vec3ult,vec3ault,aux);
    vec3.add(vec3ult,aux,aux);
    var sig = [aux[0],aux[1],aux[2]];
    return sig;
}

function BezierCubica (v0,v1,v2,v3) {
    /* Devuelve el punto correspondiente para la curva de Bezier con los puntos de control
        recibidos para el t especificado.*/
    this.v0 = v0;
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
}
BezierCubica.prototype.p = function(u) {
    /* Devuelve el vector tangente a la curva en el punto.*/
    var pos = [];
    var b0 = base0(u);
    var b1 = base1(u);
    var b2 = base2(u);
    var b3 = base3(u);
    pos[0] = b0*this.v0[0] + b1*this.v1[0] + b2*this.v2[0] + b3*this.v3[0];
    pos[1] = b0*this.v0[1] + b1*this.v1[1] + b2*this.v2[1] + b3*this.v3[1];
    pos[2] = b0*this.v0[2] + b1*this.v1[2] + b2*this.v2[2] + b3*this.v3[2];
    return pos;
}

BezierCubica.prototype.t = function (u){
    /* Devuelve el vector tangente a la curva en el punto.*/
    var pos = [];
    var b0 = base0tan(u);
    var b1 = base1tan(u);
    var b2 = base2tan(u);
    var b3 = base3tan(u);
    pos[0] = b0*this.v0[0] + b1*this.v1[0] + b2*this.v2[0] + b3*this.v3[0];
    pos[1] = b0*this.v0[1] + b1*this.v1[1] + b2*this.v2[1] + b3*this.v3[1];
    pos[2] = b0*this.v0[2] + b1*this.v1[2] + b2*this.v2[2] + b3*this.v3[2];
    var aux = vec3.create(pos);
    vec3.normalize(aux,aux);
    return [aux[0],aux[1],aux[2]];
}

function base0(u){
    return (1-u)*(1-u)*(1-u);
}
function base1(u){
    return 3*(1-u)*(1-u)*u;
}
function base2(u){
    return 3*(1-u)*u*u;
}
function base3(u){
    return u*u*u;
}
function base0tan(u){
    return -3*(1-u)*(1-u);
}
function base1tan(u){
    return -6*(1-u)*u + 3*(1-u)*(1-u);
}
function base2tan(u){
    return -3*u*u + 6*(1-u)*u;
}
function base3tan(u){
    return 3*u*u;
}
