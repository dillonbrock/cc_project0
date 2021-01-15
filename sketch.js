const width = 1000;
const height = 1000;

let lowerLines = [];
let upperLines = [];

function setup() {

  createCanvas(width, height)
  background(0);

  for (var i = 0; i < 1000; i++) {
    lowerLines[i] = new LowerGradient(i);
    upperLines[i] = new UpperGradient(i);
  } 
}



function draw() {

  for (var i = 0; i < 1000; i++) {
    strokeWeight(1);
    stroke((1000-i)*(255/1000));
    line(0, i, 1000, i);
  }

  // for (var i = 0; i < lowerLines.length; i++) {
  //   lowerLines[i].display();
  // }
  // for (var i = 0; i < upperLines.length; i++) {
  //   upperLines[i].display();
  // }

  
}

class generalGradient {

  constructor() {


  }
}

class LowerGradient {

  constructor(num) {

    this.x1 = num;
    this.x2 = num;
    this.y1 = num;
    this.y2 = height;
    this.lineColor = num * (255/1000);

  }

  display() {
    strokeWeight(1);
    stroke(this.lineColor);
    line(this.x1, this.y1, this.x2, this.y2);
  }
}

class UpperGradient {

  constructor(num) {

    this.x1 = num;
    this.x2 = num;
    this.y1 = 0;
    this.y2 = num ;
    this.lineColor = (1000 - num) * (255/1000);

  }

  display() {

    strokeWeight(1);
    stroke(this.lineColor);
    line(this.x1, this.y1, this.x2, this.y2);
  }
}