var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var blockRowCount = 3;
var blockColumnCount = 5;
var blockWidth = 75;
var blockHeight = 20;
var blockPadding = 10;
var blockOffsetTop = 30;
var blockOffsetLeft = 30;
var score = 0;
var lives = 3;

var blocks = [];
for(var c=0; c<blockColumnCount; c++) {
	blocks[c] = [];
	for(var r=0; r<blockRowCount; r++) {
		blocks[c][r] = { x: 0, y: 0, status: 1 };
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}

function collisionDetection() {
	for(var c=0; c<blockColumnCount; c++) {
		for(var r=0; r<blockRowCount; r++) {
			var b = blocks[c][r];
			if(b.status == 1) {
				if(x > b.x && x < b.x+blockWidth && y > b.y && y < b.y+blockHeight) {
					dy = -dy;
					b.status = 0;
					score++;
					if(score == blockRowCount*blockColumnCount) {
						alert("YOU WIN, CONGRATULATIONS!");
						document.location.reload();
					}
				}
			}
		}
	}
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8, 20);
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
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

function drawBlocks() {
	for(var c=0; c<blockColumnCount; c++) {
		for(var r=0; r<blockRowCount; r++) {
			if(blocks[c][r].status == 1) {
				var blockX = (c*(blockWidth+blockPadding))+blockOffsetLeft;
				var blockY = (r*(blockHeight+blockPadding))+blockOffsetTop;
				blocks[c][r].x = blockX;
				blocks[c][r].y = blockY;
				ctx.beginPath();
				ctx.rect(blockX, blockY, blockWidth, blockHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	drawScore();
	drawBlocks();
	collisionDetection();
	drawLives();
	if(x + dy > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}
	if(y + dy < ballRadius) {
		dy = -dy;
	} else if(y + dy > canvas.height-ballRadius) {
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		}
		else {
			lives--;
			if(!lives) {
				alert("GAME OVER");
				document.location.reload();
			}
			else {
				x = canvas.width / 2;
				y = canvas.height - 30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width-paddleWidth) / 2;
			}
		}
	}
	if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 7;
	}
	else if(leftPressed && paddleX > 0) {
		paddleX -= 7;
	}
	x += dx;
	y += dy;
	requestAnimationFrame(draw);
}

draw();
