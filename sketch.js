
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
let numberedValleys = [];
let valleyNumber;
let numberedPeaks = [];
var gradientLines = [];

function setup() {

  createCanvas(width, height)
  noLoop();
  background(0);
  console.log(Number('012'));
  vertices = floor(random(5,6));
  while (vertices % 2 == 0) {
    vertices = floor(random(5,6));
  }
  for (var i = 0; i < (vertices-1)/2; i++) {
    peakHeights[i] = random(0.7, 0.95);
  }
  for (var i = 0; i < (vertices+1)/2; i++) {
    valleyHeights[i] = random(0.2, 0.5);
  }
  for (var i = 0; i < peakHeights.length; i++) {
    if (peakHeights[i] > maxPeakHeight) {
      maxPeakHeight = peakHeights[i];
    }
    if (peakHeights[i] < minPeakHeight) {
      minPeakHeight = peakHeights[i];
    }
  }
  for (var i = 0; i < valleyHeights.length; i++) {
    if (valleyHeights[i] < minValleyHeight) {
      minValleyHeight = valleyHeights[i];
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
    let minVal = 0.5;
    for (var j = 0; j < valleyHeights.length; j++) {
      if (valleyHeights[j] < minVal && !orderedValleyHeights.includes(valleyHeights[j])) {
          minVal = valleyHeights[j];
      }
    }
      orderedValleyHeights.push(minVal);
  }

  for (var i = 0; i < height * (1-minValleyHeight); i++) {
    gradientLines.push(new GradientLine(i));
  }

}



function draw() {

  for (var i = 0; i < height * maxPeakHeight; i++) {
    strokeWeight(1);
    stroke(i*(255/(height*maxPeakHeight)));
    line(0, 1000-i, 1000, 1000-i);
  }

  for (var i = 0; i < gradientLines.length; i++) {
    gradientLines[i].display();
  }


}








class GradientLine {

  constructor(lineHeight) {
    this.lineHeight = lineHeight;
  }

  findxOffset(peakHeight, side) {

    if (side == -1 && this.lineHeight >= height * (1-peakHeight)) {
      return (allHeights.indexOf(peakHeight))*(width/(vertices-1))-((this.lineHeight-height*(1-peakHeight))*((width/(vertices-1))/((peakHeight-allHeights[allHeights.indexOf(peakHeight)-1])*height)));
    } 
    else if (side == -1 && this.lineHeight < height * (1-peakHeight)) {
      return -1;
    }
    else if (side == 1 && this.lineHeight >= height * (1-peakHeight)) {
        return (allHeights.indexOf(peakHeight))*(width/(vertices-1))+((this.lineHeight-height*(1-peakHeight))*((width/(vertices-1))/((peakHeight-allHeights[allHeights.indexOf(peakHeight)+1])*height)));
    }
    else if (side == 1 && this.lineHeight < height * (1 - peakHeight)) {
      return -1;
    }
  }

  findCollisionPoints() {

    var collisionPoints = [];

    if (this.lineHeight < height * (1 - orderedPeakHeights[0])) {
      collisionPoints[0] = 0;
      collisionPoints[1] = width;
    }
    else if (this.lineHeight < height * (1-orderedPeakHeights[orderedPeakHeights.length - 1])) {
      for (var i = 0; i/2 < valleyHeights.length; i += 2) {
        if (i == 0) {
          collisionPoints[0] = 0;
          collisionPoints[1] = this.findxOffset(peakHeights[0], -1, this.lineHeight);
        }
        else if (i/2 < valleyHeights.length - 1) {
          collisionPoints[i] = this.findxOffset(peakHeights[i/2 - 1], 1, this.lineHeight);
          collisionPoints[i+1] = this.findxOffset(peakHeights[i/2], -1, this.lineHeight);
        }
        else if (i/2 == valleyHeights.length - 1) {
          collisionPoints[i] = this.findxOffset(peakHeights[i/2 - 1], 1, this.lineHeight);
          collisionPoints[i+1] = width;
        }
      }
    }
    else { 
      for (var i = 0; i/2 < valleyHeights.length; i += 2) { // fix conditions here!
        if (i == 0) {
          if (this.lineHeight < height * (1-valleyHeights[i])) {
            collisionPoints[0] = 0;
            collisionPoints[1] = this.findxOffset(peakHeights[0], -1, this.lineHeight);
          }
          else {
            collisionPoints[0] = -1;
            collisionPoints[1] = -1;
          }
        }
        else if (i/2 < valleyHeights.length - 1) {
          if (this.lineHeight < height * (1 - valleyHeights[i/2])) {
            collisionPoints[i] = this.findxOffset(peakHeights[i/2 - 1], 1, this.lineHeight);
            collisionPoints[i+1] = this.findxOffset(peakHeights[i/2], -1, this.lineHeight);
          }
          else {
            collisionPoints[i] = -1;
            collisionPoints[i+1] = -1;
          }
        }
        else if (i/2 == valleyHeights.length - 1) {
          if (this.lineHeight < height * (1 - valleyHeights[valleyHeights.length - 1])) {
            collisionPoints[i] = this.findxOffset(peakHeights[i/2 - 1], 1, this.lineHeight);
            collisionPoints[i+1] = this.findxOffset(width);
          }
          else {
            collisionPoints[i] = -1;
            collisionPoints[i+1] = -1;
          }
        }
      }
    }
      return collisionPoints;
  }

  display() {

    strokeWeight(1);
    stroke(255-(this.lineHeight*255/(height*(1-minValleyHeight))));
    if (this.lineHeight < height * (1 - maxPeakHeight)) {
      line(0, this.lineHeight, width, this.lineHeight);
    }
    else {
      var filteredCollisionPoints = this.findCollisionPoints(this.lineHeight).filter(val => val != -1);
      for (var i = 0; i < filteredCollisionPoints.length; i += 2) {
        line(filteredCollisionPoints[i], this.lineHeight, filteredCollisionPoints[i+1], this.lineHeight);
      }
    }
  }
}


















































