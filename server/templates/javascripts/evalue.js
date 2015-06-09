var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
/*var TRIW = 10;
var TRIH = 10;*/
var TOTALMARGIN = 30;
var EPSILON = 0.001;

var MAXCAPITAL = 4;

var points = [];
var MAXABSX = 100;
var MAXABSY = 100;

var tree = [];
var scale = 1;
var toDraw = [];
var stack = [];

function buildTree() {
    tree.push({child:-1, x:-WINDOW_WIDTH / 2, y:-WINDOW_HEIGHT / 2, level:0, max:-1});
    for (var i = 0; i < points.length; i++) {
        insert(i);
    };
}

function insert(i) {
    var selInd = 0;
    while(true) {
        //node的几种状态：  无点占据则一定是叶节点一定没展开，即max=-1，可以直接占据
                            //有点占据但没展开则一定是叶节点只有一个点即max!=-1，child=-1
                            //有点占据也已经展开则一定是内部节点，下辖不止一个点，沿着这条路接着走。
        if (tree[selInd].max == -1) {
            tree[selInd].max = i;
            break;
        }
        var selNod = tree[selInd];
        var newWidth = WINDOW_WIDTH / Math.pow(2, selNod.level + 1);
        var newHeight = WINDOW_HEIGHT / Math.pow(2, selNod.level + 1);
        if (selNod.child == -1) {
            //判重
            if (Math.abs(points[selNod.max].x - points[i].x) < EPSILON && Math.abs(points[selNod.max].y - points[i].y) < EPSILON) {
                if (points[i].capital > points[selNod.max].capital) {
                    tree[selInd].max = i;
                }
                break;
            }
            tree[selInd].child = tree.length;
            tree.push({child:-1, x:selNod.x, y:selNod.y, level:selNod.level + 1, max:-1});
            tree.push({child:-1, x:selNod.x + newWidth, y:selNod.y, level:selNod.level + 1, max:-1});
            tree.push({child:-1, x:selNod.x, y:selNod.y + newHeight, level:selNod.level + 1, max:-1});
            tree.push({child:-1, x:selNod.x + newWidth, y:selNod.y + newHeight, level:selNod.level + 1, max:-1});
            var ind = 0;
            if (points[selNod.max].x < selNod.x + newWidth) {
                ind++;
            }
            if (points[selNod.max].y < selNod.y + newHeight) {
                ind += 2;
            }
            tree[tree.length - ind - 1].max = selNod.max;
            if (points[i].capital > points[selNod.max].capital) {
                tree[selInd].max = i;
            }
            ind = 0;
            if (points[i].x < selNod.x + newWidth) {
                ind++;
            }
            if (points[i].y < selNod.y + newHeight) {
                ind += 2;
            }
            selInd = tree.length - 1 - ind;
        } else {
            //先找到应该去哪个点，然后看max是否需要更新
            if (points[i].capital > points[selNod.max].capital) {
                tree[selInd].max = i;
            }
            var ind = 0;
            if (points[i].x >= selNod.x + newWidth) {
                ind++;
            }
            if (points[i].y >= selNod.y + newHeight) {
                ind += 2;
            }
            selInd = selNod.child + ind;
        }
    }
}

var pic;

function findPoints(){
    var sx = -(WINDOW_WIDTH - TOTALMARGIN) / 2 / scale;
    var sy = -(WINDOW_HEIGHT - TOTALMARGIN) / 2 / scale;
    var ex = -sx;
    var ey = -sy;
    var endLevel = 5 + Math.log(scale) / Math.log(2);
    while (toDraw.length > 0)
    	toDraw.pop();
    while (stack.length > 0)
    	stack.pop();

    stack.push(0);
    while (stack.length > 0) {
        var temp = stack[stack.length - 1];
        if (tree[temp].max == -1) {
            stack.pop();
            continue;
        }
        var ind = tree[temp].max;
        if (tree[temp].child == -1) {
            if (points[ind].x >= sx && points[ind].x <= ex && points[ind].y >= sy && points[ind].y <= ey)
                toDraw.push(ind);
            stack.pop();
            continue;
        }
        if (tree[temp].level == endLevel) {
            if (points[ind].x >= sx && points[ind].x <= ex && points[ind].y >= sy && points[ind].y <= ey)
                toDraw.push(ind);
        }
        stack.pop();
        if (tree[temp].level < endLevel) {
            stack.push(tree[temp].child);
            stack.push(tree[temp].child + 1);
            stack.push(tree[temp].child + 2);
            stack.push(tree[temp].child + 3);
        }
    }
}

window.onload = function(){
	console.log('wb_evalue');
    var canvas = document.getElementById('wb_evalue');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    context.translate( WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2 );

    var evaluate = document.getElementById('evaluat').innerHTML;
    evaluate = evaluate.replace(/'/g, '"');
    var oripoints = $.parseJSON(evaluate);

    for (var i = 0; i < oripoints.length; ++i)
        addPoint(oripoints[i].uid, oripoints[i].pos_x, oripoints[i].pos_y, oripoints[i].social_value);

    // addPoint(234,-20,30,0);
    // addPoint(345,20,30,1);
    // addPoint(456,100,30,2);
    // addPoint(567,20,100,3);
    // addPoint(678,40,30,4);
    // addPoint(1233, 39, 30, 3);

    buildTree();

    pic = new Image();
    pic.src ="http://images.enet.com.cn/2013/0111/49/8697606.jpg";

    // render(context);
    setInterval(
        function(){
            render( context );
        },
        30
    );

    // canvas.onmouseclick = MouseDown;
    canvas.onmousewheel = MouseWheel;
}

/*function MouseDown(e) {
    e = MousePos(e);
    var dx, dy;
    for (var i = 0; i < points.length; i++) {
        dx = points[i].x - e.x;
        dy = points[i].y - e.y;
        if ((dx * dx) + (dy * dy) < RADIUS * RADIUS) {
            //请求新页面
        }
    }
}

function handle(para){

}*/

function MouseWheel(event) {
    var delta = 0;

    if (!event)
        event = window.event;
    if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
    } else if (event.detail) {
        delta = -event.detail / 3;
    }

    if (delta == 1)
        scale *= 2;
        //发送请求
    if (delta == -1)
        scale /= 2;

    if (event.preventDefault)
        event.preventDefault();
    event.returnValue = false;
}

/*function MousePos(event) {
    event = (event ? event : window.event);
    return {
        x: event.pageX - canvas.offsetLeft - WINDOW_WIDTH / 2,
        y: event.pageY - canvas.offsetTop - WINDOW_HEIGHT / 2
    }
}*/

function getTemp(capital){
    var temp = Math.round(capital / MAXCAPITAL * 390);
    return sewen[temp][1];
}

function addPoint(pid, px, py, pcapital){
    var col = getTemp(pcapital);
    var dx = px / MAXABSX * (WINDOW_WIDTH - TOTALMARGIN) / 2;
    var dy = py / MAXABSY * (WINDOW_HEIGHT - TOTALMARGIN) / 2;
    var an;
    if (dx == 0) {
        an = dy > 0 ? 0 : 180;
    }
    else if (dx > 0) {
        an = 90 + Math.atan(dy / dx) / Math.PI * 180;
    }
    else {
        an = 270 + Math.atan(dy / dx) / Math.PI * 180;
    }
    var add = {id:pid, x:dx, y:dy, capital:pcapital, color:col, spread:0, ang:an, bigger:true}
    points.push(add);
}

function drawPoint(cxt, i, x, y){
    var gra = cxt.createRadialGradient(x, y, 0, x, y, RADIUS);
    gra.addColorStop(0, "rgba(255, 0, 0, " + String(1 - points[i].spread / 30) + " )");
    gra.addColorStop(0.7, "rgba(255, 0, 0, " + String(1 - points[i].spread / 30) + " )");
    gra.addColorStop(1, "hsla(120, 50%, 0%, 0)");
    cxt.fillStyle = gra;
    cxt.beginPath();
    cxt.arc( x, y, RADIUS, 0, 2*Math.PI );
    cxt.closePath();
    cxt.fill();
}

function drawPulse(cxt, i, x, y) {
    var gra = cxt.createRadialGradient(x, y, RADIUS, x, y, RADIUS + points[i].spread * 2);
    gra.addColorStop(0, "hsla(120, 50%, 0%, 0)");
    gra.addColorStop(0.4, "hsla(120, 70%, 50%, " + String(1 - points[i].spread / 30) + " )");
    gra.addColorStop(0.6, "hsla(120, 70%, 50%, " + String(1 - points[i].spread / 30) + " )");
    gra.addColorStop(1, "hsla(120, 50%, 0%, 0)");
    cxt.fillStyle = gra;
    cxt.beginPath();
    cxt.arc( x, y, RADIUS + points[i].spread * 2, 0, 2*Math.PI );
    cxt.closePath();
    cxt.fill();
}

function drawPulses(cxt) {
    for (var i = 0; i < toDraw.length; ++i) {
        drawPulse(cxt, toDraw[i], points[toDraw[i]].x * scale, points[toDraw[i]].y * scale);
    }
}

function updatePulses() {
    for (var i = 0; i < toDraw.length; ++i) {
        if (points[toDraw[i]].bigger && points[toDraw[i]].ang < circlerotation)
            points[toDraw[i]].spread = 0;
        if (points[toDraw[i]].spread < 30)
            points[toDraw[i]].spread++;
        points[toDraw[i]].bigger = (points[toDraw[i]].ang > circlerotation);
    }
}

/*function drawTri(cxt, i, x, y){
    cxt.fillStyle = points[i].color + String(1 - spreadtime / 30) + " )";
    cxt.beginPath();
    cxt.moveTo(x - TRIW, y - TRIH / 2);
    cxt.lineTo(x + TRIW, y - TRIH / 2);
    cxt.lineTo(x, y + TRIH);
    cxt.closePath();
    cxt.fill();
}*/



function render(cxt){

    findPoints();

    cxt.clearRect( -WINDOW_WIDTH / 2, -WINDOW_HEIGHT / 2, WINDOW_WIDTH, WINDOW_HEIGHT );
    cxt.fillStyle = 'rgb(0, 0, 0)';
    cxt.fillRect( -WINDOW_WIDTH / 2, -WINDOW_HEIGHT / 2, WINDOW_WIDTH, WINDOW_HEIGHT );

    if (pic.complete) {
        cxt.drawImage(pic, -138, -144);
    }

    cxt.save();
    cxt.shadowBlur = circleblur;
    cxt.shadowColor = 'hsla('+circlehue+', 90%, 70%, 1)';
    cxt.lineCap = 'round';

    updateCircle();
    renderCircle(cxt, 90);
    renderCircleBorder(cxt, 90);
    renderCircle(cxt, 180);
    renderCircleBorder(cxt, 180);
    renderCircle(cxt, 270);
    renderCircleBorder(cxt, 270);
    renderCircle(cxt, 360);
    renderCircleBorder(cxt, 360);
/*    renderCircleFlare(cxt);
    renderCircleFlare2(cxt);
    createParticles(cxt);
    updateParticles(cxt);
    renderParticles(cxt);*/

    cxt.restore();

    updatePulses();
    drawPulses(cxt);

    for (var i = 0; i < toDraw.length; i++) {
        drawPoint(cxt, toDraw[i], points[toDraw[i]].x * scale, points[toDraw[i]].y * scale);

/*    for (var i = 0; i < points.length; i++) {
        var temp = (1.0 - spreadtime * spreadtime / 900);
        dx = temp * points[i].x;
        dy = temp * points[i].y;

        drawPoint(cxt, i, dx, dy);*/
/*        if (points[i].fri == 0 ) {
            drawPoint(cxt, i, dx, dy);
        } else {
            drawTri(cxt, i, dx, dy);
        };*/
    }
    cxt.restore();
}

function rand(a,b){
    return ~~((Math.random()*(b-a+1))+a);
}

function dToR(degrees){
    return degrees * (Math.PI / 180);
}


var circlerotation = 0;
var circlehue = 120;
var circlespeed = 2;
var circlethickness = 18;
var circleblur = 25;

/*var particles = [];
var particleMax = 100;*/

function updateCircle() {
    if(circlerotation < 360){
        circlerotation += circlespeed;
    } else {
        circlerotation = 0;
    }
}

function renderCircle(cxt, r) {
    cxt.save();
    cxt.translate(0, 0);
    cxt.rotate(dToR(circlerotation));
    cxt.beginPath();
    cxt.arc(0, 0, r, dToR(270), dToR(90), true);
    cxt.lineWidth = circlethickness;
    var gradient1 = cxt.createLinearGradient(0, -r, 0, r);
    gradient1.addColorStop(0, 'hsla('+circlehue+', 800%, 50%, 1)');
    gradient1.addColorStop(1, 'hsla('+circlehue+', 60%, 50%, 0)');
    cxt.strokeStyle = gradient1;
    cxt.stroke();
    cxt.restore();
}

function renderCircleBorder(cxt, r) {
    cxt.save();
    cxt.translate(0, 0);
    cxt.rotate(dToR(circlerotation));
    cxt.beginPath();
    cxt.arc(0, 0, r + (circlethickness/2), dToR(270), dToR(90), true);
    cxt.lineWidth = 2;
    var gradient2 = cxt.createLinearGradient(0, -r, 0, r);
    gradient2.addColorStop(0, 'hsla('+circlehue+', 100%, 50%, 0)');
    gradient2.addColorStop(.1, 'hsla('+circlehue+', 100%, 100%, .7)');
    gradient2.addColorStop(1, 'hsla('+circlehue+', 100%, 50%, 0)');
    cxt.strokeStyle = gradient2;
    cxt.stroke();
    cxt.restore();
}

/*function renderCircleFlare(cxt) {
    cxt.save();
    cxt.translate(circle.x, circle.y);
    cxt.rotate(dToR(circle.rotation + 135));
    for (var i = 0; i < 10; ++i) {
        cxt.rotate(dToR(5));
        cxt.beginPath();
        cxt.arc(0, circle.radius, 30, 0, Math.PI *2, false);
        cxt.closePath();
        var gradient3 = cxt.createRadialGradient(0, circle.radius, 0, 0, circle.radius, 20 + i);
        gradient3.addColorStop(0, 'hsla(330, 100%, 100%, 1)');
        gradient3.addColorStop(i * i / 100, 'hsla(330, 100%, 100%, 1)');
        gradient3.addColorStop(1, 'hsla(330, 100%, 100%, 0)');
        cxt.fillStyle = gradient3;
        cxt.fill();
    }
    cxt.restore();
}

function renderCircleFlare2(cxt) {
    cxt.save();
    cxt.translate(circle.x, circle.y);
    cxt.rotate(dToR(circle.rotation+165));
    cxt.scale(1.5,1);
    cxt.beginPath();
    cxt.arc(0, circle.radius, 25, 0, Math.PI *2, false);
    cxt.closePath();
    var gradient4 = cxt.createRadialGradient(0, circle.radius, 0, 0, circle.radius, 25);
    gradient4.addColorStop(0, 'hsla(30, 100%, 50%, .2)');
    gradient4.addColorStop(1, 'hsla(30, 100%, 50%, 0)');
    cxt.fillStyle = gradient4;
    cxt.fill();
    cxt.restore();
}

function createParticles(cxt) {
    if(particles.length < particleMax) {
        particles.push({
            x: (circle.x + circle.radius * Math.cos(dToR(circle.rotation-85))) + (rand(0, circle.thickness*2) - circle.thickness),
            y: (circle.y + circle.radius * Math.sin(dToR(circle.rotation-85))) + (rand(0, circle.thickness*2) - circle.thickness),
            vx: (rand(0, 100)-50)/1000,
            vy: (rand(0, 100)-50)/1000,
            radius: rand(1, 6)/2,
            alpha: rand(10, 20)/100
        });
    }
}

function updateParticles(cxt) {
    var i = particles.length;
    while(i--){
        var p = particles[i];
        p.vx += (rand(0, 100)-50)/750;
        p.vy += (rand(0, 100)-50)/750;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= .01;

        if(p.alpha < .02){
            particles.splice(i, 1)
        }
    }
}

function renderParticles(cxt) {
    var i = particles.length;
    while(i--){
        var p = particles[i];
        cxt.beginPath();
        cxt.fillRect(p.x, p.y, p.radius, p.radius);
        cxt.closePath();
        cxt.fillStyle = 'hsla(0, 0%, 100%, '+p.alpha+')';
    }
}

function clear() {
    cxt.globalCompositeOperation = 'destination-out';
    cxt.fillStyle = 'rgba(0, 0, 0, .1)';
    cxt.fillRect(0, 0, cw, ch);
    cxt.globalCompositeOperation = 'lighter';
} */
