function NaveVidrio() {
  	VertexGrid.call(this, 2, 2, 'textures/d.jpg');
}

NaveVidrio.prototype = Object.create(VertexGrid.prototype);
NaveVidrio.prototype.constructor = NaveVidrio;

NaveVidrio.prototype.initBuffers = function() {
	var profileBuffer = [];
	
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[5.5,3.5,1.25],[]));	//ñ
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[5.5,3.5,4.75],[]));	//o
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[8,5,0.5],[]));		//p
	profileBuffer.push(new Vertex([0,1,0],[] ,[],[8,5,5.5],[]));		//q

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
		
		this.texture_coord_buffer.push(i / (profileBuffer.length - 1));
		this.texture_coord_buffer.push(i / (profileBuffer.length - 1));
	}
}
