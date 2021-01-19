const width = 1000;
const height = 1000;
let peakHeights = [];
let valleyHeights = [];
let indices = [];
let maxPeakHeight = 0.7;
let minPeakHeight = 0.5;
let vertices;

function setup() {

  createCanvas(width, height)
  noLoop();
  background(0);
  vertices = floor(random(5, 13));
  while (vertices % 2 == 0) {
    vertices = floor(random(5, 13));
  }
  for (var i = 0; i < vertices; i++) {
    peakHeights[i] = random(0.7, 0.95);
    valleyHeights[i] = random(0.2, 0.5);
  }
  for (var i = 0; i < peakHeights.length; i++) {
    if (peakHeights[i] <= maxPeakHeight) {

    } else {
      maxPeakHeight = peakHeights[i];
    }
    if (peakHeights[i] >= minPeakHeight) {

    } else {
      minPeakHeight = peakHeights[i];
    }
  }
  console.log(vertices);
}



function draw() {

  for (var i = 0; i < height * maxPeakHeight; i++) {
    strokeWeight(1);
    stroke(i*(255/(height*maxPeakHeight)));
    line(0, 1000-i, 1000, 1000-i);
  }

  drawBackground(vertices);

}

function drawBackground(numOfVertices) {

  //fill(0);
  noStroke();
  beginShape();
  vertex(0,0);
  for (var i = 0; i < peakHeights.length; i++) {
    if (i % 2 == 0) {
    vertex(i * (width/(numOfVertices)), (1-valleyHeights[i]) * height);
  } else {
    vertex(i * (width/(numOfVertices)), (1-peakHeights[i]) * height);
    }
  }
  vertex(width, 0);
  // for (var i = 0; i < height * (1-maxPeakHeight); i++)
  //   strokeWeight(1);
  //   stroke(255-(i*)
    line(0)
  endShape();

}