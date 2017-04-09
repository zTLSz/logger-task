var example;
var ctx;
var isStart = true;
var isEaten = false;
var c, d;
var x = 100;
var y = 100;
var dx = 0;
var dy = 0;



window.onload = function() {
	example = document.getElementById("example");

	ctx = example.getContext('2d');
    example.width  = 500;
    example.height = 500;
	setTimeout(animateRect, 200);
}

var snake = [{
  c:0,
  d:0
}, {
  c:10,
  d:0
}, {
  c:20,
  d:0
}];




function animateRect() {

	ctx.clearRect(0, 0, example.width, example.height);
	
	for (var i=0; i < snake.length; i++) {
  var s = snake[i];
	ctx.beginPath();
	
	ctx.rect(x-s.c, y-s.d, 10, 10);
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
	setTimeout(animateRect, 200);
	}
	
  if (isEaten == false) {
    setTimeout(getFood, 200);
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
	if (e.keyCode == 40) {  //down
     dy = 10;
	   dx = 0; 
   for (var j=1; j < snake.length; j++) {
      snake[j].c = 0;
      snake[j].d = j*10;
    }
	}
	
	if (e.keyCode == 38) { //up
	   dy = -10;
	   dx = 0;
    for (var j=1; j < snake.length; j++) {
      snake[j].c = 0;
      snake[j].d = j*10;
    }
	}
	
	if (e.keyCode == 39) {
	   dy = 0;
	   dx = 10;
     for (var j=1; j < snake.length; j++) {
      snake[j].c = j*10;
      snake[j].d = 0;
    }
	}
	
	if (e.keyCode == 37) {
	   dy = 0;
	   dx = -10;
    for (var j=1; j < snake.length; j++) {
      snake[j].c = j*10;
      snake[j].d = 0;
    }
	}
}

function getFood() {
  var xfood = 50;
  var yfood = 50;
  ctx.beginPath();
  ctx.rect(xfood, yfood, 10, 10);
  ctx.lineStyle = "#109bfc";
	ctx.lineWidth = 1;
	ctx.stroke();
  
  if (x == xfood && y == yfood) {
    ctx.clearRect(xfood, yfood, 10, 10);
    isEaten = true;
    var s3 = {
      c: 30,
      d: 0
    }
    snake.push(s3);
  }
}
