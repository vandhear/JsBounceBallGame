let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

let radiusOfTheBall = 10;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;
let pressRight = false;
let pressLeft = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  drawBall();
  drawPaddle();

  if (y + dy < radiusOfTheBall || y + dy > canvas.height - radiusOfTheBall) {
    dy = -dy;
    ctx.fillStyle = randomColorFromBouncingTheWalls();
} else if (x + dx < radiusOfTheBall || x + dx > canvas.width - radiusOfTheBall) {
    dx = -dx;
    
}

if(pressRight && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
}
else if(pressLeft && paddleX > 0) {
    paddleX -= 7;
    
}

  x += dx;
  y +=dy;
  
}



function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, radiusOfTheBall, 0, Math.PI * 2);
    //ctx.fillStyle = randomColorFromBouncingTheWalls();
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}



function randomColorFromBouncingTheWalls() {
    let hexa = '0123456789ABCDEF'.split('');
    let stepByStep = '#';

    for (let i = 0; i < 6; i++) {
        stepByStep += hexa[Math.floor(Math.random() * 16)];
    }
    return stepByStep;
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        pressRight = true;
    }
    else if(e.keyCode == 37) {
        pressLeft = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        pressRight = false;
    }
    else if(e.keyCode == 37) {
        pressLeft = false;
    }
}






setInterval(draw, 10);