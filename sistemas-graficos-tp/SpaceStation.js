function SpaceStation() {
	this.cargo_bay = new SpaceStationCargoBay();
	this.center = new SpaceStationCenter();
	this.cabin1 = new SpaceStationCabin();
	this.cabin2 = new SpaceStationCabin();
	this.cabin3 = new SpaceStationCabin();
	//this.pipe1 = new SpaceStationPipe();
	//this.pipe2 = new SpaceStationPipe();
	//this.pipe3 = new SpaceStationPipe();
	//this.pipe4 = new SpaceStationPipe();
	//this.pipe5 = new SpaceStationPipe();
	//this.pipe6 = new SpaceStationPipe();
	//this.up_panel = new Panel();
	//this.down_panel = new Panel();
}

SpaceStation.prototype.draw = function(modelMatrix) {
	//this.cargo_bay.draw(modelMatrix);
	this.center.draw(modelMatrix);
}
