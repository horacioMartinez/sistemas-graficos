function SpaceStationCargoBay() {				
	var profileBuffer = [];
	var curva = new CurvaBezierCubica();										
	var internalPoints = [ [0,-1,0], [-0.75,-1,0], [-0.75,1,0], [0,1,0],
										 [0,1,0], [0.5,1,0], [1,1,0],
										 [1,0.25,0], [1,-0.25,0], [1,-1,0],
										 [0.5,-1,0], [0.25,-1,0], [-0,-1,0] ];
									
	var externalPoints = [ [0,-1.75,0], [-1.5,-1.75,0], [-1.5,1.75,0], [0,1.75,0],
										[0,1.7,0], [0,1.6,0], [0,1.5,0],
										[0.25,1.5,0], [0.5,1.5,0], [1,1.5,0],
										[1,1.6,0], [1,1.7,0], [1,1.75,0],

										[2,1.75,0], [2,-1.75,0], [1,-1.75,0],
										[1,-1.7,0], [1,-1.6,0], [1,-1.5,0],
										[0.5,-1.5,0], [0.25,-1.5,0], [0,-1.5,0],
										[0,-1.6,0], [0,-1.7,0], [0,-1.75,0]];

	var internalBuffer = curva.getVertices(internalPoints,0.1);
	var externalBuffer = curva.getVertices(externalPoints,0.1);
	profileBuffer = internalBuffer.concat( externalBuffer );
	var curva = new CurvaBezierCubica();
	var puntosControl = [[4,-4,0] , [10,10,0],  [-10,10,0], [-4,-4,0] ];
	var trayectoryBuffer = curva.getVertices(puntosControl,0.1);
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
