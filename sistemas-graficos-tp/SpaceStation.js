function SpaceStation() {
	var profileBuffer = [new Vertex([0,1,0],[-1,0,0] ,[0,0,1],[0,1,0],[]),
						new Vertex([1,0,0] ,[0,1,0] ,[0,0,1],[1,0,0],[]),
						new Vertex([0,-1,0],[1,0,0],[0,0,1],[0,-1,0],[]),
						new Vertex([-1,0,0],[0,-1,0],[0,0,1],[-1,0,0],[]),
						new Vertex([0,1,0],[-1,0,0] ,[0,0,1],[0,1,0],[])];
						
	var trayectoryBuffer = [new Vertex([0,1,0],[0,0,1],[1,0,0],[0,0,0],[]),
							new Vertex([0,1,0],[0,0,1],[1,0,0],[1,0,1],[]),
							new Vertex([0,1,0],[0,0,1],[1,0,0],[0,0,2],[])];
	
	SupBarrido.call(this, trayectoryBuffer, profileBuffer);
}

SpaceStation.prototype = Object.create(SupBarrido.prototype);
SpaceStation.prototype.constructor = SpaceStation;
