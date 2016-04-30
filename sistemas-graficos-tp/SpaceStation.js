function SpaceStation() {
	var profileBuffer = [new Vertex([0,1,0],[-1,0,0] ,[0,0,1],[0,1,0],[]),
						new Vertex([1,0,0] ,[0,1,0] ,[0,0,1],[1,0,0],[]),
						new Vertex([0,-1,0],[1,0,0],[0,0,1],[0,-1,0],[]),
						new Vertex([-1,0,0],[0,-1,0],[0,0,1],[-1,0,0],[]),
						new Vertex([0,1,0],[-1,0,0] ,[0,0,1],[0,1,0],[])];
						
	/*var trayectoryBuffer = [new Vertex([0,1,0],[0,0,1],[1,0,0],[0,0,0],[]),
							new Vertex([0,1,0],[0,0,1],[1,0,0],[1,0,1],[]),
							new Vertex([0,1,0],[0,0,1],[1,0,0],[0,0,2],[])];*/

	var curva = new CurvaBezierCubica();
	var puntosControl = [[2,0,1] , [1,0,-2],  [-1,0,-2], [-2,0,1] ];
	var trayectoryBuffer = curva.getVertices(puntosControl,0.1);
	SupBarrido.call(this, trayectoryBuffer, profileBuffer);
}

SpaceStation.prototype = Object.create(SupBarrido.prototype);
SpaceStation.prototype.constructor = SpaceStation;
