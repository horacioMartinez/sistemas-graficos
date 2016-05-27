function SpaceStationCargoBay(trayectoryBuffer, profileBuffer) {				
	SupBarrido.call(this, trayectoryBuffer, profileBuffer,"textures/container.png");
}

SpaceStationCargoBay.prototype = Object.create(SupBarrido.prototype);
SpaceStationCargoBay.prototype.constructor = SpaceStationCargoBay;

