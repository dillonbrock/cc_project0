const width = 1000;
const height = 1000;
let peakHeights = [];
let indices = [];
let maxPeakHeight = random(0.95);
let vertices = floor(random(11));

function setup() {

  createCanvas(width, height)
  background(0);
  while (vertices % 2 == 0) {
    vertices = floor(random(11));
  }
  for (var i = 0; i < vertices; i++) {
    if (i == 0) {
      peakHeights[i] = maxPeakHeight;
    } else {
      peakHeights[i] = random(0.15, maxPeakHeight);
    }
  }

}



function draw() {

  for (var i = 0; i < height * maxPeakHeight; i++) {
    strokeWeight(1);
    stroke(i*(255/(height*maxPeakHeight)));
    line(0, 1000-i, 1000, 1000-i);
  }

  // for (var i = 0; i < lowerLines.length; i++) {
  //   lowerLines[i].display();
  // }
  // for (var i = 0; i < upperLines.length; i++) {
  //   upperLines[i].display();
  // }

  // fill(0);
  // noStroke();
  // beginShape();
  // vertex(0,0);
  // vertex(0, 0.7*height);
  // vertex(0.2*width, 0.3*height);
  // vertex(0.4*width, 0.5*height);
  // vertex(0.6*width, 0.2*height);
  // vertex(0.8*width, 0.6*height);
  // vertex(width, 0.25*height);
  // vertex(width, 0);
  // endShape();

  drawMountains(vertices, maxPeakHeight);

}

function drawMountains(numOfVertices, maxHeight) {

  let heightPicker = floor(random(numOfVertices))
  fill(0);
  noStroke();
  beginShape();
  vertex(0,0);
  for (var i = 0; i < numOfVertices; i++) {
    while (indices.contains(heightPicker)) {
      heightPicker = floor(random(numOfVertices));
    }
    vertex(i * (width/numOfVertices), (height-peakHeights[heightPicker]) * height);
  }
  vertex(width, 0);
  endShape();

}