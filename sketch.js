// Blobby thingy

// Variable ranges
let pointNumRange = { min: 3, max: 100 }
let speedRange = { min: 0.005, max: 0.02 }
let randomnessRange = { min: 5, max: 180 }
let radiusRange = { min: 50, max: 250 }
let backgroundAlphaRange = { min: 10, max: 100 }
let lineThicknessRange = { min: 0.05, max: 5 }
let tightnessRange = { min: -1, max: 1 }

// Changeable variables
let pointNum = 3;
let speed = 0.005;
let randomness = 30;
let radius = 200;
let filled = false;
let contrast = false;
let backgroundAlpha = 10;
let lineThickness = 1;
let tightness = 0;
let type = 0;

// Private variables
let types = [0, 5, 1, "quad_strip", "tess"];
let points = [];
let angle = 360;
let step;

// Variables for changing stuff manually
let speedChange = 0.005;
let pointChangeFine = 1;
let radiusChange = 10;
let pointChange = 5;
let randomnessChange = 2;

function randomize() {
  background(contrast ? 255 : 0);

  pointNum = random(pointNumRange.min, pointNumRange.max);
  speed = random(speedRange.min, speedRange.max);
  randomness = random(randomnessRange.min, randomnessRange.max);
  radius = random(radiusRange.min, radiusRange.max);
  backgroundAlpha = random(backgroundAlphaRange.min, backgroundAlphaRange.max);
  lineThickness = random(lineThicknessRange.min, lineThicknessRange.max);
  tightness = random(tightnessRange.min, tightnessRange.max);
  filled = Math.floor(random(0, 5)) ? false : true;
  contrast = Math.floor(random(0, 2)) ? true : false;
  type = types[Math.floor(random(0, types.length))];

  step = TWO_PI / pointNum;
  
  for (let i = 0; i < pointNum; i++) {
    createPoint();
    reset(i);
  }
}

function reset(point) {
  step = TWO_PI / pointNum;
  
  points[point].x = radius * sin(angle);
  points[point].y = radius * cos(angle);
  
  points[point].startX = points[point].x;
  points[point].startY = points[point].y;
  
  angle += step;
}

function createPoint() {
  points.push({
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
    xOffset: random(100),
    yOffset: random(100)
  });  
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  randomize();
}  
  
function draw() {
  background(contrast ? 255 : 0, backgroundAlpha);
  translate(width / 2, height / 2);

  if (filled) fill(contrast ? 0 : 255);
  else noFill();

  if (contrast) stroke(0, 255);
  else stroke(255, 255);

  strokeWeight(lineThickness);
  curveTightness(tightness);
  beginShape(type);
  console.log(type);
  
  for (let i = 0; i < pointNum; i++) {
    points[i].xOffset += speed;
    points[i].yOffset += speed;
    
    const minX = points[i].startX - randomness;
    const maxX = points[i].startX + randomness;
    points[i].x = noise(points[i].xOffset) * (maxX - minX) + minX;

    const minY = points[i].startY - randomness;
    const maxY = points[i].startY + randomness;
    points[i].y = noise(points[i].yOffset) * (maxY - minY) + minY;    
    
    curveVertex(points[i].x, points[i].y);
  }    
  
  for (let k = 0; k < 3; k++) {
    curveVertex(points[k].x, points[k].y);
  }
  
  endShape();
  
  // Holding down keys
  // if (keyIsDown(87)) {
  //   radius += radiusChange
  //   for (let i = 0; i < pointNum; i++) {
  //     reset(i);
  //   }  
  // } else if (keyIsDown(83)) {
  //   radius -= radiusChange
  //   for (let i = 0; i < pointNum; i++) {
  //     reset(i);
  //   }  
  // }
  
  // if (keyIsDown(68)) {
  //   randomness += randomnessChange
  //   randomness = constrain(randomness, 0, 200);
  // } else if (keyIsDown(65)) {
  //   randomness -= randomnessChange
  //   randomness = constrain(randomness, 0, 200);
  // }

}

function keyPressed() {
  // if (keyCode == UP_ARROW) {
  //   if (keyIsDown(SHIFT)) pointNum += pointChangeFine;
  //   else pointNum += pointChange;
    
  //   for (let i = 0; i < pointNum; i++) {
  //     createPoint();
  //     reset(i);
  //   }  
  // } else if (keyCode == DOWN_ARROW) {  
  //   if (pointNum > pointChange) {
  //     if (keyIsDown(SHIFT)) pointNum -= pointChangeFine;
  //     else pointNum -= pointChange;
  
  //     points.pop();
  //     for (let i = 0; i < pointNum; i++) {
  //       reset(i);
  //     }  
  //   }
  // }

  // if (keyCode == RIGHT_ARROW) speed += speedChange
  // else if (keyCode == LEFT_ARROW) speed -= speedChange

  // if (keyCode == 32) filled = !filled;

  if (keyCode == 32) randomize();
}
