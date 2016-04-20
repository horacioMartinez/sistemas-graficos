function calcularNormal(tan) {
	/* Recibe el vector tangente y devuelve el normal. */
	var vec3tan = vec3.create(tan);
	var vec3up = vec3.create([ 0.0, 0.0, 1.0 ]);
	var vec3nor = vec3.create();
	vec3.cross(vec3tan, vec3up, vec3nor);
	vec3.normalize(vec3nor, vec3nor);
	var nor = [ vec3nor[0], vec3nor[1], vec3nor[2] ];
	return nor;
}

function calcularBinormal(tan, nor) {
	/* Recibe el vector tangente y el normal, y devuelve el binormal. */
	var vec3tan = vec3.create(tan);
	var vec3nor = vec3.create(nor);
	var vec3bin = vec3.create();
	vec3.cross(vec3nor, vec3tan, vec3bin);
	vec3.normalize(vec3bin, vec3bin);
	var bin = [ vec3bin[0], vec3bin[1], vec3bin[2] ];
	return bin;
}

function subdividirCurva(curva, t0, tf, nseg, nrodet) {
	/*
	 * nseg = cantidad de segmentos del mismo largo que quiero. nrodet =
	 * cantidad de valores del parámetro tomados para aproximar la longitud de
	 * la curva. t0 = valor inicial del parámetro de la curva. tf = valof final
	 * del parámetro de la curva.
	 */

	//console.log("nseg:", nseg);
	//console.log("nrodet:", nrodet);
	var deltaT = (tf - t0) / nrodet;
	var tActual = t0;
	var tAnterior = t0;
	var distdet = new Array();
	var vActual = [ 0.0, 0.0, 0.0 ];
	var vAnterior = [ 0.0, 0.0, 0.0 ];
	var longTotal = 0.0;
	for (var i = 0; i < nrodet; i++) {
		tActual = deltaT * i;
		vActual = curva.p(tActual);
		longTotal += distancia(vActual, vAnterior);
		distdet[tActual] = longTotal;
		vAnterior = vActual.slice(0);
		tAnterior = tActual;
	}

	var longSeg = longTotal / nseg;
	//console.log("longTotal=", longTotal);
	//console.log("longSeg=", longSeg);
	var longSegActual = 0.0;
	var tes = [];
	var tAnt = 0.0;
	var segmentos = [];
	tes.push(t0);
	for ( var t in distdet) {
		if (longSegActual < longSeg) {
			longSegActual += distdet[t] - distdet[tAnt];
			tAnt = t;
			tSegActual = t;
			continue;
		}
		tAnt = t;
		tes.push(t);
		segmentos.push(longSegActual);
		//console.log(longSegActual);
		longSegActual = 0.0;
	}
	//console.log("tes:", tes.length);
	return tes;
}

function matrizCambioBase(tan, nor, bin, pos) {
	var vec3pos = vec3.create(pos);
	var matriz = mat4.create();
	mat4.identity(matriz);
	mat4.translate(matriz, vec3pos, matriz);
	matriz[0] = nor[0];
	matriz[1] = nor[1];
	matriz[2] = nor[2];
	matriz[4] = bin[0];
	matriz[5] = bin[1];
	matriz[6] = bin[2];
	matriz[8] = tan[0];
	matriz[9] = tan[1];
	matriz[10] = tan[2];
	return matriz;
}

function distancia(v1, v2) {
	return Math.sqrt((v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1])
			* (v1[1] - v2[1]) + (v1[2] - v2[2]) * (v1[2] - v2[2]));
}
