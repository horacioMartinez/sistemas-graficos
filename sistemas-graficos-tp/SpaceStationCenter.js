function SpaceStationCenter() {
    /*var profileBuffer = [new Vertex([0, 1, 0], [], [], [0, 4/4, 0], []),		//TODO: HAY QUE DEFINIR BIEN LAS NORMALES
        new Vertex([0, 1, 0], [], [], [0.5/3, 4/4, 0], []),
        new Vertex([1, 0, 0], [], [], [0.5/3, 3.5/4, 0], []),
        new Vertex([1, 0, 0], [], [], [1/3, 3/4, 0], []),
        new Vertex([1, 0, 0], [], [], [1/3, 2/4, 0], []),
        new Vertex([1, 0, 0], [], [], [2.5/3, 1.5/4, 0], []),
        new Vertex([1, 0, 0], [], [], [2.5/3, 0.5/4, 0], []),

        new Vertex([1, 0, 0], [], [], [3/3, 0, 0], []),	//punto extra. aca va el relieve ese

        new Vertex([1, 0, 0], [], [], [2.5/3, -0.5/4, 0], []),
        new Vertex([1, 0, 0], [], [], [2.5/3, -2/4, 0], []),

        new Vertex([1, 0, 0], [], [], [2.75/3, -2.25/4, 0], []),	//punto extra. aca va el otro relieve

        new Vertex([1, 0, 0], [], [], [2.5/3, -2.5/4, 0], []),
        new Vertex([1, 0, 0], [], [], [2.5/3, -3.5/4, 0], []),
        new Vertex([1, 0, 0], [], [], [1/3, -4/4, 0], []),
        new Vertex([1, 0, 0], [], [], [1/3, -5.5/4, 0], []),
        new Vertex([1, 0, 0], [], [], [0, -5.5/4, 0], []),
        new Vertex([0, 1, 0], [-1, 0, 0], [0, 0, 1], [0, 4/4, 0], [])];	// volvemos al punto inicial*/
        
    var curva = new CurvaBezierCubica();
	var puntosControl = [[0, 4, 0], [0.16, 4, 0], [0.32, 4, 0], [0.5, 4, 0],		// 0 < x < 3. -5.5 < y < 4
									[0.5, 3.95, 0],[0.5, 3.80, 0],[0.5, 3.65, 0],
									[0.9, 3.5, 0],[1, 3.4, 0],[1, 3, 0],
									[1, 2.75, 0],[1, 2.5, 0],[1, 2.25, 0],
									[1.5, 2, 0], [2.5, 1.8, 0],[2.5, 1.5, 0],
									
									[2.5, 1.17, 0], [2.5, 0.84, 0],[2.5, 0.5, 0],
									[3, 0.25, 0], [3, -0.25, 0], [2.5, -0.5, 0],
									[2.5, -1, 0], [2.5, -1.5, 0], [2.5, -2, 0],
									[2.75, -2, 0], [2.75, -2.5, 0], [2.5, -2.5, 0],
									[2.5, -2.88, 0],[2.5, -3.21, 0], [2.5, -3.5, 0],
									
									[2, -3.75, 0], [1.5, -3.9, 0], [1, -4, 0],
									[1, -4.5, 0], [1, -5, 0], [1, -5.5, 0],
									[0.66, -5.5, 0], [0.33, -5.5, 0], [0, -5.5, 0],
									
									[0, -2, 0], [0, 1, 0], [0, 4, 0]];
						
	var escalado = 1.5;			
	for (var i = 0; i < puntosControl.length; i++) {	// BIEN CABEZA
		(puntosControl[i])[0] /= escalado;
		(puntosControl[i])[1] /= escalado;

	} 
							
	var profileBuffer = curva.getVertices(puntosControl,0.1);

    this.centerPilar = new SupRevolucion(profileBuffer, 15);

    this.panels1 = new SolarPanelWing();
    this.panels2 = new SolarPanelWing();
}

SpaceStationCenter.prototype.draw = function (modelMatrix) {
    this.centerPilar.draw(modelMatrix);

    var matPanel1 = mat4.clone(modelMatrix);
    mat4.translate(matPanel1,matPanel1,[0,4,0]);
    this.panels1.draw(matPanel1);

    var matPanel2 = mat4.clone(modelMatrix);
    mat4.rotateX(matPanel2,matPanel2,Math.PI);
    mat4.translate(matPanel2,matPanel2,[0,5,0]);
    this.panels2.draw(matPanel2);
};
