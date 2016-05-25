function SpaceStationCargoBay() {
						
	var profileBuffer = [];
	
	// Definimos el techo (semi círculo)
	/*var stepsCircle = 20;
	var radio = 1;
	this.dibujarCirculoInterior(0.0, stepsCircle/2, stepsCircle, radio, profileBuffer);
	
	// Definimos las paredes y el piso
	profileBuffer.push(new Vertex([1,1,0],[] ,[],[-0.75,-1,0],[]));
	profileBuffer.push(new Vertex([1,-1,0],[] ,[],[-0.75,1,0],[]));
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[0,1,0],[]));
	
	// Definimos la capa de afuera de la estación
	this.dibujarCirculoExterior(0.0, stepsCircle*2, stepsCircle*2, radio = 1.25, profileBuffer);*/

	var curva = new CurvaBezierCubica();
	
	/*var internalPoints = [ [-1,0,0], [-1,0.75,0], [1,0.75,0], [1,0,0],
										 [1,-0.25,0], [1,-0.5,0], [1,-1,0],
										 [0.5,-1,0], [0,-1,0], [-1,-1,0],
										 [-1,-0.5,0], [-1,-0.25,0], [-1,0,0] ];*/	
										
	var internalPoints = [ [0,-1,0], [-0.75,-1,0], [-0.75,1,0], [0,1,0],
										 [0,1,0], [0.5,1,0], [1,1,0],
										 [1,0.25,0], [1,-0.25,0], [1,-1,0],
										 [0.5,-1,0], [0.25,-1,0], [-0,-1,0] ];
	
	/*var externalPoints = [ [-1.25,0,0], [-1.25,2.5,0], [1.25,2.5,0], [1.25,0,0],
										[1.25,-2.5,0], [-1.25,-2.5,0], [-1.25,0,0]];*/	
											
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
	//var puntosControl = [[2,0,1] , [1,0,-2],  [-1,0,-2], [-2,0,1] ];
	var puntosControl = [[4,-4,0] , [8,8,0],  [-8,8,0], [-4,-4,0] ];
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
