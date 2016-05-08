function SpaceStationCenter() {
    /*var profileBuffer = [new Vertex([0,1,0],[-1,0,0] ,[0,0,1],[0,1,0],[]),
     new Vertex([1,0,0] ,[0,1,0] ,[0,0,1],[1,0,0],[]),
     new Vertex([0,-1,0],[1,0,0],[0,0,1],[0,-1,0],[]),
     new Vertex([0,1,0],[-1,0,0] ,[0,0,1],[0,1,0],[])];*/

    var profileBuffer = [new Vertex([0, 1, 0], [-1, 0, 0], [0, 0, 1], [0, 4, 0], []),		//TODO: HAY QUE DEFINIR BIEN LAS NORMALES
        new Vertex([0, 1, 0], [], [], [0.5, 4, 0], []),
        new Vertex([1, 0, 0], [], [], [0.5, 3.5, 0], []),
        new Vertex([1, 0, 0], [], [], [1, 3, 0], []),
        new Vertex([1, 0, 0], [], [], [1, 2, 0], []),
        new Vertex([1, 0, 0], [], [], [2.5, 1.5, 0], []),
        new Vertex([1, 0, 0], [], [], [2.5, 0.5, 0], []),

        new Vertex([1, 0, 0], [], [], [3, 0, 0], []),	//punto extra. aca va el relieve ese

        new Vertex([1, 0, 0], [], [], [2.5, -0.5, 0], []),
        new Vertex([1, 0, 0], [], [], [2.5, -2, 0], []),

        new Vertex([1, 0, 0], [], [], [2.75, -2.25, 0], []),	//punto extra. aca va el otro relieve

        new Vertex([1, 0, 0], [], [], [2.5, -2.5, 0], []),
        new Vertex([1, 0, 0], [], [], [2.5, -3.5, 0], []),
        new Vertex([1, 0, 0], [], [], [1, -4, 0], []),
        new Vertex([1, 0, 0], [], [], [1, -5.5, 0], []),
        new Vertex([1, 0, 0], [], [], [0, -5.5, 0], []),
        new Vertex([0, 1, 0], [-1, 0, 0], [0, 0, 1], [0, 4, 0], [])];	// volvemos al punto inicial

    this.centerPilar = new SupRevolucion(profileBuffer, 15);

    this.panels1 = new SolarPanelWing();
    this.panels2 = new SolarPanelWing();
}

SpaceStationCenter.prototype.draw = function (modelMatrix) {
    this.centerPilar.draw(modelMatrix);

    var matPanel1 = mat4.clone(modelMatrix);
    mat4.translate(matPanel1,matPanel1,[0,5,0]);
    this.panels1.draw(matPanel1);

    var matPanel2 = mat4.clone(modelMatrix);
    mat4.rotateX(matPanel2,matPanel2,Math.PI);
    mat4.translate(matPanel2,matPanel2,[0,7,0]);
    this.panels2.draw(matPanel2);
};