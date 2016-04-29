function SpaceStationCenter() {
	var profileBuffer = [new Vertex([0,1,0],[-1,0,0] ,[0,0,1],[0,1,0],[]),
						new Vertex([1,0,0] ,[0,1,0] ,[0,0,1],[1,0,0],[]),
						new Vertex([0,-1,0],[1,0,0],[0,0,1],[0,-1,0],[]),
						new Vertex([0,1,0],[-1,0,0] ,[0,0,1],[0,1,0],[])];
						
	SupRevolucion.call(this, profileBuffer, 40);
}

SpaceStationCenter.prototype = Object.create(SupRevolucion.prototype);
SpaceStationCenter.prototype.constructor = SpaceStationCenter;
