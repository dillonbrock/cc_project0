const width = 1000;
const height = 1000;

function setup() {

  createCanvas(width, height)
  background(0);
}



function draw() {

  // noStroke();
  // fill(255);
  // beginShape();
  // vertex(0, height*0.1);
  // vertex(width, );
  // vertex(width, height);
  // vertex(width, height/2);
  // endShape();

  
}

class LowerGradient {

  constructor(num) {

    this.x1 = num;
    this.x2 = num;
    this.y1 = 1000 - ((1000 - num) * tan(PI/4));
    this.y2 = height;
    this.lineColor = num * (255/1000);

  }

  display() {
    strokeWeight(1);
    stroke(this.lineColor);
    line(this.x1, this.x2, this.y1, this.y2);
  }
}

class UpperGradient {

  constructor(num) {


  }
}