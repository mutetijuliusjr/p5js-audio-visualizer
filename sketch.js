var song;
var img;
var fft;
var particles = [];
var q = new Wave(146,0.9);
var r = new Wave(147,0.8);
var s = new Wave(148,0.7);
var u = new Wave(149,0.6);
var v = new Wave(150,0.5);

function preload(){
	song = loadSound('margarita.mp3');
	img = loadImage('bg.jpg');
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	imageMode(CENTER);
	rectMode(CENTER);
	fft = new p5.FFT(0.0001);
	
	img.filter(BLUR, 12);
}

function draw(){
	background(0);
	
	translate(width / 2, height / 2);
	
	fft.analyze();
	amp = fft.getEnergy(20, 200);
	
	push();
	if (amp > 210) {
		rotate(random(-0.9, 0.9));
	}
	image(img, 0, 0, width + 100, height + 100);
	pop();
	
	var alpha = map(amp, 0, 255, 180, 150);
	fill(0, alpha);
	noStroke();
	rect(0, 0, width, height);
	
	q.display(1,-1);
	r.display(-1,1);
	s.display(1,-1);
	u.display(-1,1);
	v.display(1,-1);
	
	var p = new Particles();
	particles.push(p);
	
	for(var i = particles.length - 1; i >= 0; i--){
		if (!particles[i].edges()){
			particles[i].update(amp > 210);
			particles[i].show();
		} else {
			particles.splice(i, 1);
		}
		
	}
}

function mouseClicked(){
	if (song.isPlaying()){
		song.pause();
		noLoop();
	}else{
		song.play();
		loop();
	}
}

