let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

let radiusOfTheBall = 10;

let paddleHeight = 12;
let paddleWigth = 80;
let paddleXAxis = (canvas.width - paddleWigth) / 2;

let pressRight = false;
let pressLeft = false;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  x += dx;
  y += dy;
  drawBall();
  drawPaddle();

  if (pressRight && paddleXAxis < canvas.width - paddleWigth) {
      paddleXAxis += 5;
  }
  else if (pressLeft && paddleXAxis > 0) {
      paddleXAxis -= 5;
  }
  
}



function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, radiusOfTheBall, 0, Math.PI * 2);


    if (y + dy < radiusOfTheBall || y + dy > canvas.height - radiusOfTheBall) {
        dy = -dy;
        ctx.fillStyle = randomColorFromBouncingTheWalls();
    } else if (x + dx < radiusOfTheBall || x + dx > canvas.width - radiusOfTheBall) {
        dx = -dx;
        ctx.fillStyle = randomColorFromBouncingTheWalls();
    }


    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleXAxis, canvas.height - paddleHeight, paddleWigth, paddleHeight);
  ctx.fillStyle = 'black';
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

function keyDownHandler(event) {
    if (event.key == 'Right' || event.key == 'ArrowRight') {
        pressRight = true;
    }
    else if (event.key == 'Left' || event.key == 'ArrowLeft') {
        pressLeft = true;
    }
}

function keyUpHandler(event) {
    if (event.key == 'Right' || event.key == 'ArrowRight') {
        pressRight = true;
    }
    else if (event.key == 'Left' || event.key == 'ArrowLeft') {
        pressLeft = true;
    }
}



document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyUp', keyUpHandler, false);


setInterval(draw, 10);