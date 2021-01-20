const width = 1000;
const height = 1000;
let peakHeights = [];
let valleyHeights = [];
let maxPeakHeight = 0.7;
let minPeakHeight = 0.95;
let minValleyHeight = 0.5;
let allHeights = [];
let vertices;
let orderedPeakHeights = [];
let orderedValleyHeights = [];

function setup() {

  createCanvas(width, height)
  noLoop();
  background(0);
  vertices = floor(random(5, 10));
  while (vertices % 2 == 0) {
    vertices = floor(random(5, 10));
  }
  for (var i = 0; i < (vertices-1)/2; i++) {
    peakHeights[i] = random(0.7, 0.95);
  }
  for (var i = 0; i < (vertices+1)/2; i++) {
    valleyHeights[i] = random(0.2, 0.5);
  }
  for (var i = 0; i < peakHeights.length; i++) {
    if (peakHeights[i] <= maxPeakHeight) {

    } else {
      maxPeakHeight = peakHeights[i];
    }
    if (peakHeights[i] >= minValleyHeight) {

    } else {
      minValleyHeight = peakHeights[i];
    }
    if (peakHeights[i] >= minPeakHeight) {

    } else {
      minPeakHeight = peakHeights[i];
    }
  }
  for (var i = 0; i < vertices; i++) {
    if (i % 2 == 0) {
      allHeights.push(valleyHeights[i/2]);
    }
    else {
      allHeights.push(peakHeights[(i-1)/2])
    }
  }
  for (var i = 0; i < peakHeights.length; i++) {
    let maxVal = 0;
    for (var j = 0; j < peakHeights.length; j++) {
        if (peakHeights[j] > maxVal && !orderedPeakHeights.includes(peakHeights[j])) {
          maxVal = peakHeights[j];
        }
      }
      orderedPeakHeights.push(maxVal);
    }
  //console.log(orderedPeakHeights[1]);
  for (var i = 0; i < valleyHeights.length; i++) {
    let minVal = 0;
    for (var j = 0; j < valleyHeights.length; j++) {
        if (valleyHeights[j] < minVal && !orderedValleyHeights.includes(valleyHeights[j])) {
          minVal = valleyHeights[j];
        }
      }
      orderedValleyHeights.push(minVal);
    }
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

  fill(0);
  noStroke();
  beginShape();
  vertex(0,0);
  for (var i = 0; i < vertices; i++) {
    if (i % 2 == 0) {
    vertex(i * (width/(numOfVertices-1)), (1-valleyHeights[i/2]) * height);
  } else {
    vertex(i * (width/(numOfVertices-1)), (1-peakHeights[(i-1)/2]) * height);
    }
  }
  vertex(width, 0);
  endShape();


  for (var i = 0; i < height * (1-minValleyHeight); i++) {
    strokeWeight(1);
    stroke(255-(i*255/(height*(1-minValleyHeight))));
    if (i < height * (1-maxPeakHeight)) {
      line(0, i, 1000, i);
    }
    else if (i >= height*(1-maxPeakHeight) && i < height * (1-orderedPeakHeights[1])) {
      line(0, i, findxOffset(maxPeakHeight, -1, i), i);
      line(findxOffset(maxPeakHeight, 1, i), i, width, i);
    }
    else if (i >= height * (1-orderedPeakHeights[1]) && (peakHeights.length == 2 || (i < height * (1-orderedPeakHeights[2])))) {
      if (allHeights.indexOf(orderedPeakHeights[1]) < allHeights.indexOf(orderedPeakHeights[0])) {    //if second tallest peak comes first
        line(0, i, findxOffset(orderedPeakHeights[1], -1, i), i);
        line(findxOffset(orderedPeakHeights[1], 1, i), i, findxOffset(orderedPeakHeights[0], -1, i), i);
        line(findxOffset(orderedPeakHeights[0], 1, i), i, width, i);
        if (peakHeights.length == 2) {
          //shallowest valley to deepest and shortest peak to tallest
          if(valleyHeights.indexOf(orderedValleyHeights[2]) < valleyHeights.indexOf(orderedValleyHeights[1]) && valleyHeights.indexOf(orderedValleyHeights[1]) < valleyHeights.indexOf(orderedValleyHeights[0])) {
            // hasn't reached shallowest valley yet
            if (i < height*(1-orderedValleyHeights[2])) {
              line(0, i, findxOffset(orderedPeakHeights[1], -1, i), i);
              line(findxOffset(orderedPeakHeights[1], 1, i), i, findxOffset(orderedPeakHeights[0], -1, i), i);
              line(findxOffset(orderedPeakHeights[0], 1, i), i, width, i);
            } else if (i < height*(1-orderedValleyHeights[1])) {
                line(findxOffset(orderedPeakHeights[1], 1, i), i, findxOffset(orderedPeakHeights[0], -1, i), i);
                line(findxOffset(orderedPeakHeights[0], 1, i), i, width, i);
            } else {
              line(findxOffset(orderedPeakHeights[0], 1, i), i, width, i);
            }
          } else if {

          }
        }
      } else {    // tallest peak comes first
        line(0, i, findxOffset(orderedPeakHeights[0], -1, i), i);
        line(findxOffset(orderedPeakHeights[0], 1, i), i, findxOffset(orderedPeakHeights[1], -1, i), i);
        line(findxOffset(orderedPeakHeights[1], 1, i), i, width, i);
      }
    }
  }
}


function findxOffset(peakHeight, side, num) {     //side is -1 (left) or +1 (right)
  if (side == -1) {
    return (allHeights.indexOf(peakHeight))*(width/(vertices-1))-((num-height*(1-peakHeight))*((width/(vertices-1))/((peakHeight-allHeights[allHeights.indexOf(peakHeight)-1])*height)));
  } else if (side == 1) {
    return (allHeights.indexOf(peakHeight))*(width/(vertices-1))+((num-height*(1-peakHeight))*((width/(vertices-1))/((peakHeight-allHeights[allHeights.indexOf(peakHeight)+1])*height)));
  }
}

function drawUpperGradient(numOfPeaks) {
  for (var i = 0; i < height * (1-minValleyHeight); i++) {
    strokeWeight(1);
    stroke(255-(i*255/(height*(1-minValleyHeight))));
    if (i < height * (1-maxPeakHeight)) {
      line(0, i, 1000, i);
    }
  }
}






