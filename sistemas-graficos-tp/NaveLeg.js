function NaveLeg() {
	var profileBuffer = [new Vertex([0,1,0],[] ,[],[-1,2,0],[]),
						new Vertex([0,1,0] ,[] ,[],[1,2,0],[]),
						new Vertex([1,0,0],[],[],[1.5,1,0],[]),
						new Vertex([1,0,0],[],[],[1.5,0,0],[]),
						new Vertex([0,-1,0],[] ,[],[1,-1,0],[]),
						new Vertex([0,-1,0],[] ,[],[-1,-1,0],[]),
						new Vertex([-1,0,0],[] ,[],[-1.5,0,0],[]),
						new Vertex([-1,0,0],[] ,[],[-1.5,1,0],[]),
						new Vertex([0,1,0],[] ,[],[-1,2,0],[])];
	
	this.soporte = new ClosedExtrusion(profileBuffer, 2, "textures/plata.jpg");
	
	
	var profileBufferFierro = [new Vertex([0,1/4,0],[] ,[],[-1/4,2/4,0],[]),
							   new Vertex([0,1/4,0] ,[] ,[],[1/4,2/4,0],[]),
							   new Vertex([0,1/4,0],[] ,[],[1/4,-1/4,0],[]),
							   new Vertex([0,1/4,0],[] ,[],[-1/4,-1/4,0],[]),
							   new Vertex([0,1/4,0],[] ,[],[-1/4,2/4,0],[])];
							   						   
	var curva = new CurvaBezierCubica();
	var puntosControl = [[0,0,0.5] , [0,1,1],  [0,2,2], [0,3,3] ];
	var trayectoryBuffer = curva.getVertices(puntosControl,0.1);
	
	this.fierro = new SupBarrido(trayectoryBuffer, profileBufferFierro, "textures/plata.jpg");
}

NaveLeg.prototype.draw = function(modelMatrix) {
	this.soporte.draw(modelMatrix);
	
	var matFierro = mat4.clone(modelMatrix);
	mat4.translate(matFierro,matFierro,[0,0.5,0]);
	this.fierro.draw(matFierro);
	
	var matFierro = mat4.clone(modelMatrix);
	mat4.translate(matFierro,matFierro,[0,-0.9,0]);
	this.fierro.draw(matFierro);

}
