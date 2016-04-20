	var lastpos;
	lastroty = 0.0;
	lastrotx = 0.0;
	var apretado = false;
	function myfuncion(event){
		var mx = event.clientX;
		var my = event.clientY;

		var tex = "El mouse está ahora en la posición: " + mx + "," + my;
		var pos = document.getElementById("posicion");
		pos.innerHTML = tex;
		if(apretado){
			roty = lastroty  + lastpos[0]-mx;
			rotx = lastrotx + lastpos[1]-my;		
		}
	}
	function movido(event){
		apretado = true;
		var mx = event.clientX;
		var my = event.clientY;
		lastpos = [mx,my];
		//console.log(lastpos);
		var tex = "El mouse está ahora en la posición: " + mx + "," + my;
		var pos = document.getElementById("posicion");
		pos.innerHTML = tex;
	}
	function suelto(event){
		apretado = false;	
		lastroty = roty;
		lastrotx = rotx; 
	}