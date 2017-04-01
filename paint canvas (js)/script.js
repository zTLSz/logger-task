
var example = document.getElementById("example");
var ctx = example.getContext('2d');
var previousColor = "";
var previousWidth;
var isDraw = false;
var isRect = false;
var x1;
var y1;

example.width  = 500;
example.height = 500;
example.onmousedown = startDraw;
example.onmouseup = stopDraw;
example.onmouseout = stopDraw;
example.onmousemove = draw;


function changeColor(color, elem) {

	ctx.strokeStyle = color;
    elem.classList.add("selected");
	 if (previousColor !== "") {
		 previousColor.classList.remove("selected");
	 }
	
	previousColor = elem;
}

function changeWidth(width, elem) {

	ctx.lineWidth = width;
    elem.classList.add("selected");
	 if (previousWidth !== "") {
		 previousWidth.classList.remove("selected");
	 }
	
	previousWidth = elem;
}


function startDraw(e) {
	if (isRect == false) {
	isDraw = true;
	
	ctx.beginPath();
	
	ctx.moveTo(e.pageX - example.offsetLeft, e.pageY - example.offsetTop);
	} else {
	
	    x1 = e.pageX - example.offsetLeft;
		y1 = e.pageY - example.offsetTop;
		
		ctx.fillRect(x1, y1, 2, 2);	
	}
	
}

function draw(e) {
	if (isDraw == true) {
				
		var x = e.pageX - example.offsetLeft;
		var y = e.pageY - example.offsetTop;
		
		ctx.lineTo(x, y);
		ctx.stroke();
	}
	
}

function stopDraw(e) {
	isDraw = false;
	
	if (isRect == true) {
		var x2 = e.pageX - example.offsetLeft;
		var y2 = e.pageY - example.offsetTop;
		var rectx = Math.abs(x2-x1);
		var recty = Math.abs(y2-y1);
		
	    if (x1 > x2 && y1 > y2) {
			ctx.fillRect(x2, y2, rectx, recty);
		} else if (x1 > x2 && y1 < y2) {
			ctx.fillRect(x2, y1, rectx, recty);
		} else if(x1 < x2 && y1 > y2) {
			ctx.fillRect(x1, y2, rectx, recty);
		} else {
			ctx.fillRect(x1, y1, rectx, recty);	
		}
	}
	isRect = false;
}


function clear() {
	ctx.clearRect(1, 1, example.width, example.height);
}

function userColor() {
	var r = document.getElementById("R").value;
	var g = document.getElementById("G").value;
	var b = document.getElementById("B").value;
	var div = document.getElementById("usercolor");

	if (isNaN(r) || isNaN(g) || isNaN(b) || r > 255
	|| r < 0 || g > 255 || g < 0 || b > 255 || b < 0) {
	alert("Введите число!");
	} else { 
    var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
	div.style.cssText="color:" + rgb + ";";
	changeColor(rgb, div);
	}
	
}

function rectDraw() {
	ctx.fillStyle = ctx.strokeStyle;
	isRect = true;
}