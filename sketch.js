let circles = [];

function setup() {
  createCanvas(800,800);
  for (let i = 0; i < 50; i++) {
  	circles.push(new Circle(i));
  }
}

function draw() {
  background(0);
  for (let i = 0; i < circles.length; i++) {
  	circles[i].move();
  	circles[i].display();
  }
  console.log(circles[0].getxPos);
}

class Circle {
  constructor(num) {
  	this.diameter = 40;
  	this.xPos = num * 40;
  	this.initialYPos = -num * 20;
    this.yPos = -num * 20;
  }
  move() {
  	if (this.yPos < height + 40) {
  	  this.yPos += 1;
    }
    else {
      this.yPos = this.initialYPos;
    }
  }
  get getxPos() {
    return this.xPos;
  }
  display() {
  	ellipse(this.xPos, this.yPos, this.diameter, this.diameter);
  }
}