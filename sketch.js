let particles = [];

let res = 11;

let capture;
function preload() {
  img = loadImage("2.jpeg");  
}

function setup() {
  createCanvas(210,380 );
  placeParticles();
  noStroke();
  capture = createCapture(VIDEO);
  capture.size(320, 160);
  capture.hide();

}

function draw() {
  background(255);
  
  for(let i = 0; i < particles.length; i ++) {
    particles[i].update();
    particles[i].draw();
  }
  
//mage(img, 0, 0, width, height);
}

function placeParticles() {
  for(let i = 0; i < width; i += res) {
    for(let j = 0; j < height; j += res) {
      let x = (i/width) * img.width;
      let y = (j/height) * img.height;
      let c = img.get(x, y);
      
      // if(c[3] != 0) {
      if(c[0] + c[1] + c[2] != 255 * 3) {
        particles.push(new Particle(i, j, c))
      }
      
    }
  }
}

class Particle {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    
    this.c = c;
    this.r = 255;
    this.g = 255;
    this.b = 255;
    
    this.homeX = x;
    this.homeY = y;
  }
  
  update() {
    
    
    capture.loadPixels();
    let ratioX = width/capture.width;
    let ratioY = height/capture.height;
    let x1 = parseInt(this.x/ratioX);
    let y1 = parseInt(this.y/ratioY);
    if (x1>=0 && x1<capture.width && y1>=0 && y1<capture.height) {
      let idx = x1 + y1*capture.width;
      this.r = capture.pixels[idx*4];
      this.g = capture.pixels[idx*4 + 1];
      this.b = capture.pixels[idx*4 + 2];
    }
    
    // mouse
    let mouseD = dist(this.x, this.y, mouseX, mouseY);
    let mouseA = atan2(this.y - mouseY, this.x - mouseX);
    
    // home
    let homeD = dist(this.x, this.y, this.homeX, this.homeY);
    let homeA = atan2(this.homeY - this.y, this.homeX - this.x);
    
    // forces
    let mouseF = constrain(map(mouseD, 0, 100, 10, 0), 0, 10);
    let homeF = map(homeD, 0, 100, 0, 10);
    
    let vx = cos(mouseA) * mouseF;
    vx += cos(homeA) * homeF;
    
    let vy = sin(mouseA) * mouseF;
    vy += sin(homeA) * homeF;
    
    
    this.x += vx;
    this.y += vy;
  }
  
  draw() {
    // fill(0, 40);
    // stroke(0, 40);
    // ellipse(this.homeX, this.homeY, 5, 5);
    // line(this.x, this.y, this.homeX, this.homeY);
    // noStroke();
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, res, res);
  }
}













