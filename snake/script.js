
var example;
var ctx;
var isStart = true;
var snakes = [];

var x = 10;
var y = 10;
var dx = 0;
var dy = 0;

var up = false, 
down = true, 
left = false, 
right = false;

window.onload = function() {
	example = document.getElementById("example");

	ctx = example.getContext('2d');
    example.width  = 500;
    example.height = 500;
	setTimeout(animateRect, 20);
}

var snake = [0, 10];




function animateRect() {

	ctx.clearRect(0, 0, example.width, example.height);
	
	for (var i=0; i < snake.length; i++) {
    var s = snake[i];
	ctx.beginPath();
	
	ctx.rect(x-s, y-s, 10, 10);
	ctx.lineStyle = "#109bfc";
	ctx.lineWidth = 1;
	ctx.stroke();
	}
	
	
	y += dy;
	x += dx;
	
	if (y > example.height - 10) {
		y = 10;
	}
	
	if (isStart == true) {
	setTimeout(animateRect, 20);
	}
	
}

function pause() {
	isStart = false;
}

function start() {
	isStart = true;
	setTimeout(animateRect, 20);
}

document.onkeydown = function(e) {
	if (e.keyCode == 40) {
	   dy = 10;
	   dx = 0;
	}
	
	if (e.keyCode == 38) {
	   dy = -10;
	   dx = 0;
	}
	
	if (e.keyCode == 39) {
	   dy = 0;
	   dx = 10;
	}
	
	if (e.keyCode == 37) {
	   dy = 0;
	   dx = -10;
	}
}

