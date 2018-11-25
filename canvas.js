var caa = document.getElementById("ca");
var ca = caa.getContext('2d');
ca.lineWidth = 3;

//监听是否用户切换窗口大小
movescreen();
window.onresize = function () {
    movescreen();
}
//切换窗口的大小
function movescreen() {
    var pageHeight = document.documentElement.clientHeight;
    var pageWidth = document.documentElement.clientWidth;
    caa.height = pageHeight;
    caa.width = pageWidth;
}
//清空画板
delect.onclick=function(){
ca.clearRect(0,0,caa.width,caa.height);
}
//保存画板的内容
download.onclick=function(){
    var url=caa.toDataURL("image/png")
    var a=document.createElement("a");
    document.body.appendChild(a);
    a.href=url;
    a.download="你的作品";
    a.click();
}
//设置画笔的颜色
red.onclick=function(){
    ca.strokeStyle="red";
    ca.fillStyle="red";
}
blue.onclick=function(){
    ca.strokeStyle="blue";
    ca.fillStyle="blue";
}
pink.onclick=function(){
    ca.strokeStyle="pink";
    ca.fillStyle="pink";
}

//监听用户的动作
if (document.body.ontouchstart !== undefined) { //判断用户是否使用pc端
    caa.ontouchstart = function (a) {
        var x = a.touches[0].clientX;
        var y = a.touches[0].clientY;
        if (easer) {
            draw = true;
            ca.clearRect(x, y, 20, 20);
        }
        else {
            draw = true;
            lastpoint = { 'x': x, 'y': y };
        }

    }
    caa.ontouchmove = function (a) {
        var x = a.touches[0].clientX;
        var y = a.touches[0].clientY;
        if (easer) {
            if (draw) {
                ca.clearRect(x, y, 10, 10);
            }
        } else {
            if (draw) {
                var newpoint = { 'x': x, 'y': y };
                drawline(lastpoint.x, lastpoint.y, newpoint.x, newpoint.y);
                lastpoint = newpoint;
            }
        }
    }
    caa.ontouchend = function () {
        using = false;
    }
} else {
    //鼠标点下时的
    var draw = false;
    var lastpoint = { x: undefined, y: undefined }
    caa.onmousedown = function (a) {
        var x = a.clientX;
        var y = a.clientY;

        if (easer) {
            draw = true;
            ca.clearRect(x, y, 20, 20);
        }
        else {
            draw = true;
            lastpoint = { 'x': x, 'y': y };
        }

    }
    caa.onmousemove = function (a) {
        var x = a.clientX;
        var y = a.clientY;
        if (easer) {
            if (draw) {
                ca.clearRect(x, y, 10, 10);
            }
        } else {
            if (draw) {
                var newpoint = { 'x': x, 'y': y };
                drawline(lastpoint.x, lastpoint.y, newpoint.x, newpoint.y);
                lastpoint = newpoint;
            }
        }
    }

    caa.onmouseup = function () {
        draw = false;
    }
}

//设置画笔的粗细
thin.onclick=function(){
    ca.lineWidth=5;
}
heavy.onclick=function(){
    ca.lineWidth=7;
}
//设置画笔成线
function drawline(x1, y1, x2, y2) {
    ca.beginPath();
    ca.moveTo(x1, y1);
    // ca.lineWidth = 3;
    ca.lineTo(x2, y2);
    ca.stroke();
    ca.closePath();
    //这个函数模拟的绘制三角形，但是最后一步没有ca.fill();,
    //而是用ca.closePath();没有让他自动闭合
}

//获取用户是否在使用橡皮檫
var easer = false;
var clear = document.getElementById('clear');
clear.onmouseup = function () {
    easer = !easer;
}
function drawcirl(x, y, radius) {
    ca.beginPath();
    ca.arc(x, y, radius, 0, 360);
    ca.fill();
}
//为按钮添加动作
earser=false;
var drawing = document.getElementById('drawing');
var clear = document.getElementById('clear');
drawing.onclick = function () {
    easer = false;
    drawing.classList.add('active');
    clear.classList.remove('active');

    // drawing.style.display = "none"
    // clear.style.display = "inline-block"
}
clear.onclick = function () {
    easer = true;
    clear.classList.add('active');
    drawing.classList.remove('active');
    // clear.style.display = "none";
    // drawing.style.display = "inline-block"
}