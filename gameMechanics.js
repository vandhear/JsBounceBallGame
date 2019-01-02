var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

var radiusOfTheBall = 10;

var paddleHeight = 15;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/3;
var pressRight = false;
var pressLeft = false;

var colour = randomColorFromBouncingTheWalls();

var brickRowsCnt = 4;
var brickColumnsCnt = 6;
var brickHeight = 20;
var brickWidth = 75;
var brickOffsetTop = 20;
var brickOffsetLeft = 20;
var brickPadding = 10;

//var gameOverNotify = document.querySelector('.game-over-notify');
//var interval;

var bricks = [];
  for (var columns = 0; columns < brickColumnsCnt; columns++) {
      bricks[columns] = [];
        for (var rows = 0; rows < brickRowsCnt; rows++) {
            bricks[columns][rows] = {x: 0, y: 0, status: 1};
        }
  }

  var score = 0;

  var lives = 3;






document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);
/*gameOverNotify.addEventListener('click', function() {
document.location.reload();
})*/

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (x + dx < radiusOfTheBall || x + dx > canvas.width - radiusOfTheBall) {
    dx = -dx;
    colour = randomColorFromBouncingTheWalls();
    
} 

  if (y + dy < radiusOfTheBall ) {
    dy = -dy;
  }

 else if (y + dy > canvas.height - radiusOfTheBall) {
     if (x > paddleX && x < paddleX + paddleWidth) {
         dy = -dy * 1.1;
     } else {
         lives--;
         if (!lives) {
            alert('GAME OVER! YOUR SCORE IS: ' + score);
            document.location.reload();
            
         } else {
             x = canvas.width / 2;
             y = canvas.height - 30;
             dx = 3;
             dy = -3;
             paddleX = (canvas.width - paddleWidth);
         }
       
     }    
}  

if(pressRight && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
}
else if(pressLeft && paddleX > 0) {
    paddleX -= 7;
    
}

  x += dx;
  y +=dy;



  requestAnimationFrame(draw);
}



function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, radiusOfTheBall, 0, Math.PI * 2);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (var columns = 0; columns < brickColumnsCnt; columns++) {
        for (var rows = 0; rows < brickRowsCnt; rows++) {

            if (bricks[columns][rows].status == 1){
            
            var brickX = (columns * (brickWidth + brickPadding)) + brickOffsetLeft;
            var brickY = (rows * (brickHeight + brickPadding)) + brickOffsetTop;

            bricks[columns][rows].x = brickX;
            bricks[columns][rows].y = brickY;

            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = 'blue';
            ctx.fill();
            ctx.closePath();

            }
        }
    }

}





function randomColorFromBouncingTheWalls() {
    var hexa = '0123456789ABCDEF'.split('');
    var colour = '#';

    for (var i = 0; i < 6; i++) {
        colour += hexa[Math.floor(Math.random() * 16)];
    }
    return colour;
}

function keyDownHandler(event) {
    if(event.keyCode == 39) {
        pressRight = true;
    }
    else if(event.keyCode == 37) {
        pressLeft = true;
    }
}
function keyUpHandler(event) {
    if(event.keyCode == 39) {
        pressRight = false;
    }
    else if(event.keyCode == 37) {
        pressLeft = false;
    }
}

function mouseMoveHandler(event) {
    var relativeX = event.clientX - canvas.offsetLeft;
      if (relativeX > 0 && relativeX < canvas.width) {
          paddleX = relativeX - paddleWidth / 2;
      }
}


 function collisionDetection() {
    for (var columns = 0; columns < brickColumnsCnt; columns++) {
        for (var rows = 0; rows < brickRowsCnt; rows++) {
            var storedBrickObj = bricks[columns][rows];

            if (storedBrickObj.status == 1) {

            if (x > storedBrickObj.x && x < storedBrickObj.x + brickWidth && y > storedBrickObj.y && y < storedBrickObj.y + brickHeight) {
                dy = -dy;
                colour = randomColorFromBouncingTheWalls();
                storedBrickObj.status = 0;
                score++;

                if (score == brickRowsCnt * brickColumnsCnt) {
                    alert('YOU WON! HOOREY!');
                    document.location.reload();
                    
                 }

                }
            }
        }
    }
}


 function drawScore()  {
     ctx.font = '15px Arial';
     ctx.font = 'green';
     ctx.fillText('Your score is: ' + score, 8, 20);
 }

 function drawLives() {
     ctx.font = '15px Arial';
     ctx.fillStyle = 'purple';
     ctx.fillText(`You have: ${lives} lives left`, canvas.width - 145, 20)
 }



draw();