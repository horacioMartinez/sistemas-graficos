/**
 * 
 */

function Pentagono(){
	var vertex = [];
	var phi;
	var counter;
	var numberOfEdgesOfBase = 5;
	for(counter=0; counter <= numberOfEdgesOfBase; ++counter){
		phi = counter*(2.0*Math.PI/numberOfEdgesOfBase);
		vertex.push(Math.cos(phi));
		vertex.push(Math.sin(phi));
	}
	ExtrusionClosed.call(this, 1.0, vertex);
	
	this.initTexture("earth.jpg");
}

inheritPrototype(Pentagono, ExtrusionClosed);