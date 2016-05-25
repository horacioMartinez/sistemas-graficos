function SpaceStationCabin() {
	var profileBuffer = [];
	var stepsCabin = 20;
	var heigth = 5;
	var radio = 0.5;
	
	for (var j = 0.0; j < stepsCabin; j++) {
		var alfa = j * Math.PI * 2 / (stepsCabin - 1);
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
	};
	
	/*var profileBuffer = [new Vertex([0,1,0],[-1,0,0] ,[0,0,1],[0,1,0],[]),
						new Vertex([1,0,0] ,[0,1,0] ,[0,0,1],[1,0,0],[]),
						new Vertex([0,-1,0],[1,0,0],[0,0,1],[0,-1,0],[]),
						new Vertex([-1,0,0],[0,-1,0],[0,0,1],[-1,0,0],[]),
						new Vertex([0,1,0],[-1,0,0] ,[0,0,1],[0,1,0],[])];*/

	ClosedExtrusion.call(this, profileBuffer, heigth,"textures/metal.jpg");
}

SpaceStationCabin.prototype = Object.create(ClosedExtrusion.prototype);
SpaceStationCabin.prototype.constructor = SpaceStationCabin;
