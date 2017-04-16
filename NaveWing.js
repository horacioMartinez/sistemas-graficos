function NaveWing() {
	var profileBuffer = [];
	profileBuffer.push(new Vertex([-0.7,-0.7,0],[] ,[],[0,0,0],[])); // 0.7 = 1/raiz de dos
	profileBuffer.push(new Vertex([-0.7,0.7,0],[] ,[],[0,1,0],[]));
	profileBuffer.push(new Vertex([0.7,0.7,0],[] ,[],[1,1,0],[]));
	profileBuffer.push(new Vertex([0.7,-0.7,0],[] ,[],[1,0,0],[]));
	profileBuffer.push(new Vertex([-0.7,-0.7,0],[] ,[],[0,0,0],[]));


	var curva = new CurvaBezierCubica();
	var puntosControl = [[6,1,0] , [4,0,0], [2,-1,0], [0,-1,0],  
									[-2,-1,0], [-4,0,0], [-6,1,0] ];
	var trayectoryBuffer = curva.getVertices(puntosControl,0.5);
	SupBarrido.call(this, trayectoryBuffer, profileBuffer,'textures/marron.jpg');
}

NaveWing.prototype = Object.create(SupBarrido.prototype);
NaveWing.prototype.constructor = NaveWing;
