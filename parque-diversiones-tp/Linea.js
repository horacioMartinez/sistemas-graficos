function Linea(y0, y1, color, displ) {
	this.vertices = [ y0[0] + displ[0], y0[1] + displ[1], y0[2] + displ[2],
			y1[0] + displ[0], y1[1] + displ[1], y1[2] + displ[2] ];
	this.vBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices),
			gl.STATIC_DRAW);
	this.cArray = color.concat(color);
	this.iArray = [ 0, 1 ];
	this.cBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.cBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.cArray),
			gl.STATIC_DRAW);
	this.iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.iArray),
			gl.STATIC_DRAW);
}
Linea.prototype.dibujar = function(modelMatrix) {
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT,
			false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.cBuffer);
	/*
	 * gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4, gl.FLOAT,
	 * false, 0, 0);
	 */
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
	gl.uniformMatrix4fv(shaderProgram.ModelMatrixUniform, false, modelMatrix);
	gl.drawElements(gl.LINES, this.iArray.length, gl.UNSIGNED_SHORT, 0);
}