// Blobby thingy

let points = [];
let pointNum = 3;
let speed = 0.005;
let speedChange = 0.005;
let randomness = 30;
let step;
let angle = 360;
let radius = 200;
let pointChange = 5;
let pointChangeFine = 1;
let radiusChange = 10;
let randomnessChange = 2;
let filled = false;

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
  createCanvas(windowWidth, windowHeight);

  step = TWO_PI / pointNum;
  
  for (let i = 0; i < pointNum; i++) {
    createPoint();
    reset(i);
  }

  noFill();
}  
  
function draw() {
  background(0, 10);
  translate(width / 2, height / 2);

  stroke(255, 255);
  strokeWeight(1);
  curveTightness(0);
  beginShape();
  
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
  if (keyIsDown(87)) {
    radius += radiusChange
    for (let i = 0; i < pointNum; i++) {
      reset(i);
    }  
  } else if (keyIsDown(83)) {
    radius -= radiusChange
    for (let i = 0; i < pointNum; i++) {
      reset(i);
    }  
  }
  
  if (keyIsDown(68)) {
    randomness += randomnessChange
    randomness = constrain(randomness, 0, 100);
  } else if (keyIsDown(65)) {
    randomness -= randomnessChange
    randomness = constrain(randomness, 0, 100);
  }

}    

function keyPressed() {
  if (keyCode == UP_ARROW) {
    if (keyIsDown(SHIFT)) pointNum += pointChangeFine;
    else pointNum += pointChange;
    
    for (let i = 0; i < pointNum; i++) {
      createPoint();
      reset(i);
    }  
  } else if (keyCode == DOWN_ARROW) {  
    if (pointNum > pointChange) {
      if (keyIsDown(SHIFT)) pointNum -= pointChangeFine;
      else pointNum -= pointChange;
  
      points.pop();
      for (let i = 0; i < pointNum; i++) {
        reset(i);
      }  
    }
  }

  if (keyCode == RIGHT_ARROW) speed += speedChange
  else if (keyCode == LEFT_ARROW) speed -= speedChange

  if (keyCode == 32) {
    filled = !filled;
    if (filled) fill(255);
    else noFill();
  }

}
