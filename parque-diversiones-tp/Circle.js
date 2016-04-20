/**
 * Created by chris on 07/10/15.
 */
function Circle(radius, x0, y0, z) {
	this.radius = radius;
	this.x0 = x0;
	this.y0 = y0;
	this.z = z;
}
Circle.prototype.p = function(u) {
	return [ this.radius * Math.cos(2 * Math.PI * u) + this.x0,
			this.radius * Math.sin(2 * Math.PI * u) + this.y0, this.z ];
}
Circle.prototype.t = function(u) {
	var nt = [ -2 * Math.PI * this.radius * Math.sin(2 * Math.PI * u),
			2 * Math.PI * this.radius * Math.cos(2 * Math.PI * u), this.z ];
	var vect = vec3.create(nt);
	vec3.normalize(vect, vect);
	return [ vect[0], vect[1], vect[2] ];
}
Circle.prototype.n = function(u) {
	var tan = this.t(u);
	return [ tan[1], -tan[0], tan[2] ];
}