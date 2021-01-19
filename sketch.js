const width = 1000;
const height = 1000;
let peakHeights = [];
let indices = [];
let peakHeights = [];
let maxPeakHeight = 0.3;
let vertices;

function setup() {

  createCanvas(width, height)
  background(0);
  vertices = floor(random(5, 13));
  while (vertices % 2 == 0) {
    vertices = floor(random(5, 13));
  }
  for (var i = 0; i < vertices; i++) {
    peakHeights[i] = random(0.3, 0.95);
  }
  for (var i = 0; i < peakHeights.length; i++) {
    if (peakHeights[i] <= maxPeakHeight) {

    } else {
      maxPeakHeight = peakHeights[i];
    }
  }
}



function draw() {

  for (var i = 0; i < height * maxPeakHeight; i++) {
    strokeWeight(1);
    stroke(i*(255/(height*maxPeakHeight)));
    line(0, 1000-i, 1000, 1000-i);
  }

  // // for (var i = 0; i < lowerLines.length; i++) {
  // //   lowerLines[i].display();
  // // }
  // // for (var i = 0; i < upperLines.length; i++) {
  // //   upperLines[i].display();
  // // }

  // // fill(0);
  // // noStroke();
  // // beginShape();
  // // vertex(0,0);
  // // vertex(0, 0.7*height);
  // // vertex(0.2*width, 0.3*height);
  // // vertex(0.4*width, 0.5*height);
  // // vertex(0.6*width, 0.2*height);
  // // vertex(0.8*width, 0.6*height);
  // // vertex(width, 0.25*height);
  // // vertex(width, 0);
  // // endShape();

  // drawMountains(vertices, maxPeakHeight);

}

function drawMountains(numOfVertices) {

  fill(0);
  noStroke();
  beginShape();
  vertex(0,0);

  vertex(width, 0);
  endShape();

}