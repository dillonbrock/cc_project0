



// function draw() {

//   for (var i = 0; i < height * maxPeakHeight; i++) {
//     strokeWeight(1);
//     stroke(i*(255/(height*maxPeakHeight)));
//     line(0, 1000-i, 1000, 1000-i);
//   }

//   drawBackground(vertices);

//   // console.log(orderedValleyHeights[1]);
//   // console.log(minValleyHeight);
// }



// function drawBackground(numOfVertices) {

//   fill(0);
//   noStroke();
//   beginShape();
//   vertex(0,0);
//   for (var i = 0; i < vertices; i++) {
//     if (i % 2 == 0) {
//     vertex(i * (width/(numOfVertices-1)), (1-valleyHeights[i/2]) * height);
//   } else {
//     vertex(i * (width/(numOfVertices-1)), (1-peakHeights[(i-1)/2]) * height);
//     }
//   }
//   vertex(width, 0);
//   endShape();


//   for (var i = 0; i < height * (1-minValleyHeight); i++) {
//     strokeWeight(1);
//     stroke(255-(i*255/(height*(1-minValleyHeight))));
//     if (i < height * (1-maxPeakHeight)) {
//       line(0, i, 1000, i);
//     }
//     else if (i >= height*(1-maxPeakHeight) && i < height * (1-orderedPeakHeights[1])) {
//       line(0, i, findxOffset(maxPeakHeight, -1, i), i);
//       line(findxOffset(maxPeakHeight, 1, i), i, width, i);
//     }
//     else if (i >= height * (1-orderedPeakHeights[1]) && (peakHeights.length == 2 || (i < height * (1-orderedPeakHeights[2])))) {
//       if (allHeights.indexOf(orderedPeakHeights[1]) < allHeights.indexOf(orderedPeakHeights[0])) {    //if second tallest peak comes first
//         line(0, i, findxOffset(orderedPeakHeights[1], -1, i), i);
//         line(findxOffset(orderedPeakHeights[1], 1, i), i, findxOffset(orderedPeakHeights[0], -1, i), i);
//         line(findxOffset(orderedPeakHeights[0], 1, i), i, width, i);
//         if (peakHeights.length == 2) {
//           twoPeakSwitchCase(valleyNumber, i);
//         }
//       } else {    // tallest peak comes first
//         line(0, i, findxOffset(orderedPeakHeights[0], -1, i), i);
//         line(findxOffset(orderedPeakHeights[0], 1, i), i, findxOffset(orderedPeakHeights[1], -1, i), i);
//         line(findxOffset(orderedPeakHeights[1], 1, i), i, width, i);
//         if (peakHeights.length == 2) {
//           twoPeakSwitchCase(valleyNumber, i);
//         }
//       }
//     }
//   }
// }




// function findxOffset(peakHeight, side, num) {     //side is -1 (left) or +1 (right)
//   if (side == -1) {
//     return (allHeights.indexOf(peakHeight))*(width/(vertices-1))-((num-height*(1-peakHeight))*((width/(vertices-1))/((peakHeight-allHeights[allHeights.indexOf(peakHeight)-1])*height)));
//   } else if (side == 1) {
//     return (allHeights.indexOf(peakHeight))*(width/(vertices-1))+((num-height*(1-peakHeight))*((width/(vertices-1))/((peakHeight-allHeights[allHeights.indexOf(peakHeight)+1])*height)));
//   }
// }

// function twoPeakSwitchCase(valleyNum, itr) {

//   if (itr < height*(1-orderedValleyHeights[2]) && itr > height*(1-orderedValleyHeights[1])) {
//     line(0, itr, findxOffset(orderedPeakHeights[numberedPeaks[0]], -1, itr), itr);
//     line(findxOffset(orderedPeakHeights[numberedPeaks[0]], 1, itr), itr, findxOffset(orderedPeakHeights[numberedPeaks[1]], -1, itr), itr);
//     line(findxOffset(orderedPeakHeights[numberedPeaks[1]], 1, itr), itr, width, itr);
//   }
//   else { 
//     switch (valleyNum) {
//   // shallowest to deepest valley
//       case 210:  
//         if (itr < height*(1-orderedValleyHeights[1])) {
//           line(findxOffset(orderedPeakHeights[numberedPeaks[0]], 1, itr), itr, findxOffset(orderedPeakHeights[numberedPeaks[1]], -1, itr), itr);
//           line(findxOffset(orderedPeakHeights[numberedPeaks[1]], 1, itr), itr, width, itr);
//           // console.log('doing it right');
//         } 
//         else {
//           line(findxOffset(orderedPeakHeights[numberedPeaks[1]], 1, itr), itr, width, itr);
//         }
//       break;
//       //deepest to shallowest valley
//       case 12:
//         if(itr < height*(1-orderedValleyHeights[1])) {
//           line(0, itr, findxOffset(orderedPeakHeights[numberedPeaks[0]], -1, itr), itr);
//           line(findxOffset(orderedPeakHeights[numberedPeaks[0]], 1, itr), itr, findxOffset(orderedPeakHeights[numberedPeaks[1]], -1, itr), itr);
//           // console.log('doing it right');
//         }
//         else{
//           line(0, itr, findxOffset(orderedPeakHeights[numberedPeaks[0]], -1, itr), itr);
//         }
//       break;
//       //deepest, shallowest, medium
//       case 21:
//         if (itr < height*(1-orderedValleyHeights[1])) {
//           line(0, itr, findxOffset(orderedPeakHeights[numberedPeaks[0]], -1, itr), itr);
//           line(findxOffset(orderedPeakHeights[numberedPeaks[1]], 1, itr), itr, width, itr);
//           // console.log('doing it right');
//         }
//         else {
//           line(0, itr, findxOffset(orderedPeakHeights[numberedPeaks[0]], -1, itr), itr);
//         }
//       break;
//       //shallowest, deepest, medium
//       case 201:
//         if (itr < height*(1-orderedValleyHeights[1])) {
//           line(findxOffset(orderedPeakHeights[numberedPeaks[0]], 1, itr), itr, findxOffset(orderedPeakHeights[numberedPeaks[1]], -1, itr), itr);
//           line(findxOffset(orderedPeakHeights[numberedPeaks[1]], 1, itr), itr, width, itr);
//           // console.log('doing it right');
//         }
//         else {
//           line(findxOffset(orderedPeakHeights[numberedPeaks[0]], 1, itr), itr, findxOffset(orderedPeakHeights[numberedPeaks[1]], -1, itr), itr);
//         }
//       break;
//       //medium, deepest, shallowest
//       case 102:
//         if (itr < height*(1-orderedValleyHeights[1])) {
//           line(0, itr, findxOffset(orderedPeakHeights[numberedPeaks[0]], -1, itr), itr);
//           line(findxOffset(orderedPeakHeights[numberedPeaks[0]], 1, itr), itr, findxOffset(orderedPeakHeights[numberedPeaks[1]], -1, itr), itr);
//           // console.log('doing it right');
//         }
//         else {
//           line(findxOffset(orderedPeakHeights[numberedPeaks[0]], 1, itr), itr, findxOffset(orderedPeakHeights[numberedPeaks[1]], -1, itr), itr);
//         }
//       break;
//       //medium, shallowest, deepest
//       case 120:
//         if (itr < height*(1-orderedValleyHeights[1])) {
//           line(0, itr, findxOffset(orderedPeakHeights[numberedPeaks[0]], -1, itr), itr);
//           line(findxOffset(orderedPeakHeights[numberedPeaks[1]], 1, itr), itr, width, itr);
//           // console.log('doing it right');
//         }
//         else {
//           line(findxOffset(orderedPeakHeights[numberedPeaks[1]], 1, itr), itr, width, itr);
//         }
//     }        
//   }
// }

// function threePeakSwitchCase(valleyNum, itr) {

//   if (itr < height*(1-orderedValleyHeights[3])) {
//     line(0, itr, findxOffset(orderedPeakHeights[numberedPeaks[0]], -1, itr), itr);
//     line(findxOffset(orderedPeakHeights[numberedPeaks[0]], 1, itr), itr, findxOffset(orderedPeakHeights[numberedPeaks[1]], -1, itr), itr);
//     line(findxOffset(orderedPeakHeights[numberedPeaks[1]], 1, itr), itr, findxOffset(orderedPeakHeights[numberedPeaks[2]], -1, itr), itr);
//     line(findxOffset(orderedPeakHeights[numberedPeaks[2]], 1, itr), itr, width, itr);
//   } 
//   else {
//     switch(valleyNum) {
//       case 123:    // deepest to shallowest
//         if (itr < height * (1-orderedValleyHeights[2])) {

//         }
//     }
//   }
// }














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


}



function draw() {




}








class GradientLine {

  constructor(num) {


  }

  findxOffset(peakHeight, side, lineHeight) {

    if (side == -1 && lineHeight < height * (1-allHeights[allHeights.indexOf(peakHeight) - 1])) {
      return (allHeights.indexOf(peakHeight))*(width/(vertices-1))-((lineHeight-height*(1-peakHeight))*((width/(vertices-1))/((peakHeight-allHeights[allHeights.indexOf(peakHeight)-1])*height)));
    } 
    else if (side == -1 && lineHeight >= height * (1-allHeights[allHeights.indexOf(peakHeight) - 1])) {
      return -1;
    } else if (side == 1 && lineHeight < height * (1-allHeights)) {
      return (allHeights.indexOf(peakHeight))*(width/(vertices-1))+((lineHeight-height*(1-peakHeight))*((width/(vertices-1))/((peakHeight-allHeights[allHeights.indexOf(peakHeight)+1])*height)));
    }
  }

  findCollisionPoints(lineHeight) {

    var collisionPoints = [];

    if (lineHeight < height * (1 - maxPeakHeight)) {
      collisionPoints[0] = 0;
      collisionPoints[1] = width;
    }
    else if ()

    for (var i = 0; i/2 < valleyHeights.length; i += 2) { // fix conditions here!
      if (i == 0) {
        if (lineHeight < height * (1-valleyHeights[i])) {
          collisionPoints[0] = 0;
          collisionPoints[1] = this.findxOffset(peakHeights[0], -1, lineHeight);
        }
        else {
          collisionPoints[0] = -1;
          collisionPoints[1] = -1;
        }
      }
      else if (i/2 < valleyHeights.length - 1) {
        if (lineHeight < height * (1 - valleyHeights[i/2])) {
          collisionPoints[i] = this.findxOffset(peakHeights[i/2 - 1], 1, lineHeight);
          collisionPoints[i+1] = this.findxOffset(peakHeights[i/2], -1, lineHeight);
        }
        else {
          collisionPoints[i] = -1;
          collisionPoints[i+1] = -1;
        }
      } else if (i/2 == valleyHeights.length - 1) {
        if (lineHeight < height * (1 - valleyHeights[valleyHeights.length - 1])) {
          collisionPoints[i] = this.findxOffset(peakHeights[i/2 - 1], 1, lineHeight);
          collisionPoints[i+1] = this.findxOffset(width);
        }
        else {
          collisionPoints[i] = -1;
          collisionPoints[i+1] = -1;
        }
      }
    }
    return collisionPoints;
  }

  display(lineHeight) {

    strokeWeight(1);
    stroke(255-(lineHeight*255/(height*(1-minValleyHeight))))
    for (var i = 0; i < this.findCollisionPoints(lineHeight).length; i += 2) {
      if (this.findCollisionPoints(lineHeight)[i] != -1) {
        line(this.findCollisionPoints(lineHeight)[i], lineHeight, this.findCollisionPoints(lineHeight)[i+1], lineHeight);
      }
    }
  }
}


















































