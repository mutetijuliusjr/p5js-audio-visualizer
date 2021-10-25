class Wave{
	constructor(w,f){
		this.factor = f;
		this.top;
		this.btm;
		this.width = w;
	}
	
	display(t,b){
		this.top = t;
		this.btm = b;
		
		stroke(250);
		strokeWeight(3);
		noFill();

		var wave = fft.waveform();

		for(var t = -1; t <= 1; t += 2){
			beginShape();
			for(var i = 0; i <= 180; i += 0.5){
				var index = floor(map(i, 0, 180, 0, wave.length - 1));
				
				var r = map(wave[index]/this.factor, this.top, this.btm, this.width, 350);
				
				var x = r * sin(i) * t;
				var y = r * cos(i);
				vertex(x, y);
			}
			endShape();
		}
	}
}