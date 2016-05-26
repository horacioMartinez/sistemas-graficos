function SpaceStationCargoBay(trayectoryBuffer, profileBuffer) {				
	SupBarrido.call(this, trayectoryBuffer, profileBuffer,"textures/container.png");
}


SpaceStationCargoBay.prototype = Object.create(SupBarrido.prototype);
SpaceStationCargoBay.prototype.constructor = SpaceStationCargoBay;

SpaceStationCargoBay.prototype.dibujarCirculoExterior = function(inicio, fin, totalPuntos, radio, profileBuffer) {
	for (var j = inicio; j < fin; j++) {
		var alfa = j * Math.PI * 2 / (totalPuntos - 1);
		var x = Math.sin(alfa);
		var y = Math.cos(alfa);
		var z = 0;

		// Para cada vértice definimos su posición como coordenada (x, y, z)
		var position = [];
		position.push(radio * x);
		position.push(radio * y);
		position.push(radio * z);
		
		// Definimos la normal
		var normal = [];
		normal.push(Math.cos(alfa));
		normal.push(Math.sin(alfa));
		normal.push(0);

		// Definimos la tangente
		var tangente = [];
		
		// Definimos la binormal
		var binormal = [];
		
		// Definimos el color (ESTO PODRIA COMO NO IR ACA)
		var coord = [];
		
		profileBuffer.push(new Vertex(normal, tangente, binormal, position, coord));
	}
}

SpaceStationCargoBay.prototype.dibujarCirculoInterior = function(inicio, fin, totalPuntos, radio, profileBuffer) {
	for (var j = inicio; j < fin; j++) {
		var alfa = j * Math.PI * 2 / (totalPuntos - 1);
		var x = Math.sin(alfa);
		var y = Math.cos(alfa);
		var z = 0;

		// Para cada vértice definimos su posición como coordenada (x, y, z)
		var position = [];
		position.push(radio * x);
		position.push(radio * y);
		position.push(radio * z);
		
		// Definimos la normal
		var normal = [];
		normal.push(-Math.cos(alfa));
		normal.push(-Math.sin(alfa));
		normal.push(0);

		// Definimos la tangente
		var tangente = [];
		
		// Definimos la binormal
		var binormal = [];
		
		// Definimos el color (ESTO PODRIA COMO NO IR ACA)
		var coord = [];
		
		profileBuffer.push(new Vertex(normal, tangente, binormal, position, coord));
	}
}
