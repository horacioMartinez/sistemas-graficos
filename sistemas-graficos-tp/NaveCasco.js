function NaveCasco() {
  	VertexGrid.call(this, 11, 9, 'textures/plata.jpg');
}

NaveCasco.prototype = Object.create(VertexGrid.prototype);
NaveCasco.prototype.constructor = NaveCasco;

NaveCasco.prototype.initBuffers = function() {
	
	var profileBuffer = [];
	
	// Primera Tapa
	var centerFirstCover = new Vertex([-1,0,0],[] ,[],[1,2,3],[]);
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[1,1,2],[]));		//1
	profileBuffer.push(centerFirstCover);
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[1,1,4],[]));		//1'
	profileBuffer.push(centerFirstCover);
	profileBuffer.push(new Vertex([-1,0,0],[] ,[],[1,2,4],[]));		//b
	profileBuffer.push(centerFirstCover);
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[0.5,3,3.5],[]));	//n
	profileBuffer.push(centerFirstCover);
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[0.5,3,3.5],[]));	//n
	profileBuffer.push(centerFirstCover);
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[0.5,3,2.5],[]));	//m
	profileBuffer.push(centerFirstCover);
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[0.5,3,2.5],[]));	//m
	profileBuffer.push(centerFirstCover);
	profileBuffer.push(new Vertex([-1,0,0],[] ,[],[1,2,2],[]));		//a
	profileBuffer.push(centerFirstCover);
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[1,1,2],[]));		//1
	profileBuffer.push(centerFirstCover);
	
	// Cuerpo
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[1,1,2],[]));		//1
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[1,1,4],[]));		//1'
	profileBuffer.push(new Vertex([-1,0,0],[] ,[],[1,2,4],[]));		//b
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[0.5,3,3.5],[]));	//n
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[0.5,3,3.5],[]));	//n
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[0.5,3,2.5],[]));	//m
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[0.5,3,2.5],[]));	//m
	profileBuffer.push(new Vertex([-1,0,0],[] ,[],[1,2,2],[]));		//a
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[1,1,2],[]));		//1
	
	
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[1,1,2],[]));		//1
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[1,1,4],[]));		//1'
	profileBuffer.push(new Vertex([-1,0,0],[] ,[],[1,2,4],[]));		//b
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[0.5,3,3.5],[]));	//n
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[0.5,3,3.5],[]));	//n
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[0.5,3,2.5],[]));	//m
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[0.5,3,2.5],[]));	//m
	profileBuffer.push(new Vertex([-1,0,0],[] ,[],[1,2,2],[]));		//a
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[1,1,2],[]));		//1
	

	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[5,0.5,1.25],[]));//2
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[5,0.5,4.75],[]));//2'
	profileBuffer.push(new Vertex([0,0,1],[] ,[],[5,2,5],[]));		//d
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[5.5,3.5,4.75],[]));	//o
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[5.5,3.5,4.75],[]));	//o
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[5.5,3.5,1.25],[]));	//ñ
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[5.5,3.5,1.25],[]));	//ñ
	profileBuffer.push(new Vertex([0,0,-1],[] ,[],[5,2,1],[]));		//c
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[5,0.5,1.25],[]));//2
	
	
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[8,0,0.75],[]));//3
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[8,0,5.25],[]));//3'
	profileBuffer.push(new Vertex([0,0,1],[] ,[],[8,2,5.5],[]));//f
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[8,5,5.5],[]));//q
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[8,5,5.5],[]));//q
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[8,5,0.5],[]));//p
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[8,5,0.5],[]));//p
	profileBuffer.push(new Vertex([0,0,-1],[] ,[],[8,2,0.5],[]));//e
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[8,0,0.75],[]));//3


	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[14,0,0.25],[]));//4
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[14,0,5.75],[]));//4'
	profileBuffer.push(new Vertex([0,0,1],[] ,[],[14,2,6],[]));//h
	profileBuffer.push(new Vertex([0,0,1],[] ,[],[14,4,6],[]));//alfa
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[14,6,5],[]));//u
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[14,6,1],[]));//t
	profileBuffer.push(new Vertex([0,0,-1],[] ,[],[14,4,0],[]));//z
	profileBuffer.push(new Vertex([0,0,-1],[] ,[],[14,2,0],[]));//g
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[14,0,0.25],[]));//4
	
	
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[18,1,1.5],[]));//5
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[18,1,4.5],[]));//5'
	profileBuffer.push(new Vertex([0,0,1],[] ,[],[18,2,5.5],[]));//j
	profileBuffer.push(new Vertex([0,0,1],[] ,[],[17.5,3,4.5],[]));//gama
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[18,5,4.5],[]));//w
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[18,5,1.5],[]));//v
	profileBuffer.push(new Vertex([0,0,-1],[] ,[],[17.5,3,1.5],[]));//beta
	profileBuffer.push(new Vertex([0,0,-1],[] ,[],[18,2,0.5],[]));//i
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[18,1,1.5],[]));//5


	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[20.5,1,1.5],[]));//6
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[20.5,1,4.5],[]));//6'
	profileBuffer.push(new Vertex([1,0,0],[] ,[],[21,2,5],[]));//l
	profileBuffer.push(new Vertex([1,0,0],[] ,[],[21,3,4.5],[]));//otra
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[20,5,4.5],[]));//y
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[20,5,1.5],[]));//x
	profileBuffer.push(new Vertex([1,0,0],[] ,[],[21,3,1.5],[]));//:=)
	profileBuffer.push(new Vertex([1,0,0],[] ,[],[21,2,1],[]));//k
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[20.5,1,1.5],[]));//6

	//profileBuffer.push(new Vertex([0,1,0],[] ,[],[10.6,4.5],[]));//s
	//profileBuffer.push(new Vertex([0,1,0],[] ,[],[10,6,1.5],[]));//r
	
	// Ultima Tapa
	var centerLastCover = new Vertex([1,0,0],[] ,[],[21,3,3],[]);
	profileBuffer.push(centerLastCover);
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[20.5,1,1.5],[]));//6
	profileBuffer.push(centerLastCover);
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[20.5,1,4.5],[]));//6'
	profileBuffer.push(centerLastCover);
	profileBuffer.push(new Vertex([1,0,0],[] ,[],[21,2,5],[]));//l
	profileBuffer.push(centerLastCover);
	profileBuffer.push(new Vertex([1,0,0],[] ,[],[21,3,4.5],[]));//otra
	profileBuffer.push(centerLastCover);
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[20,5,4.5],[]));//y
	profileBuffer.push(centerLastCover);
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[20,5,1.5],[]));//x
	profileBuffer.push(centerLastCover);
	profileBuffer.push(new Vertex([1,0,0],[] ,[],[21,3,1.5],[]));//:=)
	profileBuffer.push(centerLastCover);
	profileBuffer.push(new Vertex([1,0,0],[] ,[],[21,2,1],[]));//k
	profileBuffer.push(centerLastCover);
	profileBuffer.push(new Vertex([0,-1,0],[] ,[],[20.5,1,1.5],[]));//6
	profileBuffer.push(centerLastCover);

	var escalado_y = 1 * 2;
	var escalado_x = 1;
	var escalado_z = 1;		
		
	for (var i = 0; i < profileBuffer.length; i++) {	// ESCALAMOS ACÁ PARA NO TENER QUE ESCALAR LUEGO => EFICIENCIA!
		profileBuffer[i].position[0] /= escalado_x;		
		profileBuffer[i].position[1] /= escalado_y;
		profileBuffer[i].position[2] /= escalado_z;
	} 

	for (var i = 0; i < profileBuffer.length; ++i) {
		var vertex = profileBuffer[i];
		
		this.position_buffer.push(vertex.position[0], vertex.position[1], vertex.position[2]);
		
		this.normal_buffer.push(vertex.normal[0], vertex.normal[1], vertex.normal[2]);
		
		var u = i / (profileBuffer.length - 1);
		var v = i / (profileBuffer.length - 1);
		this.texture_coord_buffer.push(u);
		this.texture_coord_buffer.push(v);
	}
}
