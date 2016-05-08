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
}

SpaceStationCenter.prototype.draw = function (modelMatrix) {
    //this.centerPilar.draw(modelMatrix);
    this.panels1.draw(modelMatrix);
};