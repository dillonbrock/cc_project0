
const width = 900;
const height = 900;
let peakHeights = [];
let valleyHeights = [];
let maxPeakHeight = 0.7;
let minPeakHeight = 0.95;
let minValleyHeight = 0.5;
let allHeights = [];
let vertices;
let orderedPeakHeights = [];
let orderedValleyHeights = [];
var gradientLines = [];
var snowCaps = [];

function setup() {

  createCanvas(width, height)
  noLoop();
  background(0);
  vertices = floor(random(5,10));
  while (vertices % 2 == 0) {
    vertices = floor(random(5,10));
  }
  for (var i = 0; i < (vertices-1)/2; i++) {
    peakHeights[i] = random(0.7, 0.9);
  }
  for (var i = 0; i < (vertices+1)/2; i++) {
    valleyHeights[i] = random(0.3, 0.5);
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
    gradientLines.push(new SunsetGradient(i));
  }

  for (var i = 0; i < peakHeights.length; i++) {
    snowCaps.push(new SnowCap(i));
  }

}



function draw() {

  for (var i = 0; i < height * maxPeakHeight; i++) {
    strokeWeight(1);
    stroke(i*(255/(height*maxPeakHeight)));
    line(0, height-i, width, height-i);
  }

  for (var i = 0; i < gradientLines.length; i++) {
    gradientLines[i].display();
  }

  for (var i = 0; i < snowCaps.length; i++) {
    snowCaps[i].display();
  }

}

class SunsetGradient {

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
            collisionPoints[i+1] = width;
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

  get collisionPoints() {
    return this.findCollisionPoints();
  }

  display() {

    strokeWeight(1);
    stroke(this.lineHeight*207/(height*(1-minValleyHeight)),49,67+this.lineHeight*25/(height*(1-minValleyHeight)));
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

class mountainGradient {

  constructor(whichLine, peak) {
    this.whichLine = whichLine;
    this.peak = peak;
  }

  findxOffset() {
    
  }

  display() {

  }
}

class SnowCap {

  constructor(peak) {
    this.peak = peak;

  }

  rightSideofSlope(peakHeight) {
    return (allHeights.indexOf(peakHeight))*(width/(vertices-1))+((height*(1-peakHeights[this.peak]) + 100-height*(1-peakHeight))*((width/(vertices-1))/((peakHeight-allHeights[allHeights.indexOf(peakHeight)+1])*height)));
  }

  leftSideofSlope(peakHeight) {
    return (allHeights.indexOf(peakHeight))*(width/(vertices-1))-((height*(1-peakHeights[this.peak]) + 100-height*(1-peakHeight))*((width/(vertices-1))/((peakHeight-allHeights[allHeights.indexOf(peakHeight)-1])*height)));
  }
  

  display() {

    var snowDipWidth = (this.rightSideofSlope(peakHeights[this.peak]) - this.leftSideofSlope(peakHeights[this.peak]))/4;
    var snowDipHeight = 20;
    stroke(180);
    fill(255);
    beginShape();
    vertex(allHeights.indexOf(peakHeights[this.peak])*width/(vertices - 1), height * (1 - peakHeights[this.peak]));
    for (var i = 0; i < 5; i++) {
      if (i % 2 == 0) {
        vertex(this.leftSideofSlope(peakHeights[this.peak]) + i * snowDipWidth, height * (1-peakHeights[this.peak]) + 100);
      }
      else {
        vertex(this.leftSideofSlope(peakHeights[this.peak]) + i * snowDipWidth, height*(1-peakHeights[this.peak]) + 100 + snowDipHeight);
      }
    endShape();

    }
  }
}

