const width = 1000;
const height = 1000;


function setup() {

  createCanvas(width, height)
  background(0);

}



function draw() {

  for (var i = 0; i < 800; i++) {
    strokeWeight(1);
    stroke(i*(255/800));
    line(0, 1000-i, 1000, 1000-i);
  }

  // for (var i = 0; i < lowerLines.length; i++) {
  //   lowerLines[i].display();
  // }
  // for (var i = 0; i < upperLines.length; i++) {
  //   upperLines[i].display();
  // }

  fill(0);
  noStroke();
  beginShape();
  vertex(0,0);
  vertex(0, 0.7*height);
  vertex(0.2*width, 0.3*height);
  vertex(0.4*width, 0.5*height);
  vertex(0.6*width, 0.2*height);
  vertex(0.8*width, 0.6*height);
  vertex(width, 0.25*height);
  vertex(width, 0);
  endShape();

}