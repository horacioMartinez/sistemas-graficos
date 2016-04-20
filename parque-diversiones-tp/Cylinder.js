function Cylinder(){
	var vertex = [];
	var phi;
	var counter;
	var numberOfEdgesOfBase = 64;
	for(counter=0; counter <= numberOfEdgesOfBase; ++counter){
		phi = counter*(2.0*Math.PI/numberOfEdgesOfBase);
		vertex.push(Math.cos(phi));
		vertex.push(Math.sin(phi));
	}
	ExtrusionClosed.call(this, 1.0, vertex);
}

inheritPrototype(Cylinder, ExtrusionClosed);