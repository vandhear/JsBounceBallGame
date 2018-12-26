let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

let radiusOfTheBall = 10;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  x += dx;
  y += dy;
  drawBall();

  if (y + dy < radiusOfTheBall || y + dy > canvas.height - radiusOfTheBall) {
      dy = -dy;
  } else if (x + dx < radiusOfTheBall || x + dx > canvas.width - radiusOfTheBall) {
      dx = -dx;
  }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, radiusOfTheBall, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
}

setInterval(draw, 10);