
var example = document.getElementById("example");
var ctx = example.getContext('2d');
var previousColor = "";
var previousWidth = "";
var isDraw = false;
var isRect = false;
var isCircle = false;
var xcircle = 100;
var ycircle = 100;
var x1;
var y1;
var circles = [];



example.width  = 500;
example.height = 500;
example.onmousedown = startDraw;
example.onmouseup = stopDraw;
example.onmouseout = stopDraw;
example.onmousemove = draw;


function changeColor(color, elem) { //смена цвета

	ctx.strokeStyle = color;
    elem.classList.add("selected");
	 if (previousColor !== "") {
		 previousColor.classList.remove("selected");
	 }
	
	previousColor = elem;
}

function changeWidth(width, elem) { //смена толщины

	ctx.lineWidth = width;
    elem.classList.add("selected");
	 if (previousWidth !== "") {
		 previousWidth.classList.remove("selected");
	 }
	
	previousWidth = elem;
}


function startDraw(e) {
	if (isRect == false && isCircle == false) { //обычное рисование
	isDraw = true;
	
	ctx.beginPath();
	
	ctx.moveTo(e.pageX - example.offsetLeft, e.pageY - example.offsetTop);
	} else if (isRect == true) { //обрисовка прямугольника заливки 
	
	    x1 = e.pageX - example.offsetLeft;
		y1 = e.pageY - example.offsetTop;
		
		ctx.fillRect(x1, y1, 2, 2);	
	} else if (isCircle == true) { //обрисовка круга
		xcircle = e.pageX - example.offsetLeft;
		ycircle = e.pageY - example.offsetTop;
		
		addCircle();
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

function stopDraw(e) {  //сброс-остановка рисования
	isDraw = false;
	
	if (isRect == true) {
		var x2 = e.pageX - example.offsetLeft;
		var y2 = e.pageY - example.offsetTop;
		var rectx = Math.abs(x2-x1);
		var recty = Math.abs(y2-y1);
		
	    if (x1 > x2 && y1 > y2) {  //4 вида прямоугольника в зависимости от координат мышки
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
	isCircle = false;
}


function clear() {
	ctx.clearRect(1, 1, example.width, example.height);
}

function userColor() { //пользовательский цвет
	var r = document.getElementById("R").value;
	var g = document.getElementById("G").value;
	var b = document.getElementById("B").value;
	var div = document.getElementById("usercolor");

	if (isNaN(r) || isNaN(g) || isNaN(b) || r > 255
	|| r < 0 || g > 255 || g < 0 || b > 255 || b < 0) {
	alert("Ошибка!");
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

function Circle(x, y, radius, color) { //конструктор круга
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.isSelected = false;
}

function setCircle() { //нажатие на кнопку Круг
	isCircle = true;
} 

function addCircle() { //после нажатия добавляем в массив новый круг
	 var radius = 50;
	 var circlecolor = ctx.strokeStyle;
	 var circle = new Circle(xcircle, ycircle, radius, circlecolor);
	
	 
	 circles.push(circle);
	
	 drawCircles();
}



function drawCircles() { //отрисовываем последний элемент массива
	
	 var circle = circles[circles.length - 1];
     ctx.beginPath();
     ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2);
     ctx.fillStyle = circle.color;

	 
	  if (circle.isSelected) {
            ctx.lineWidth = 5;
        }
        else {
            ctx.lineWidth = 1;
        }
        ctx.fill();
        ctx.stroke(); 

}



function changeAlpha() { //смена прозрачности
	var alpha = document.getElementById("globalalpha").value;
	ctx.globalAlpha = alpha;
	
}