WINDOW_WIDTH = 1024;
WINDOW_HEIGHT = 600;
POINTRADIUS = 10;
PLOTRADIUS = 300;

originPoints = [    {leafchild:6, subtreeh:3, father:-1},
                        {leafchild:2, subtreeh:1, father:0}, 
                        {leafchild:0, subtreeh:0, father:1}, 
                        {leafchild:0, subtreeh:0, father:1}, 
                        {leafchild:3, subtreeh:2, father:0}, 
                        {leafchild:3, subtreeh:1, father:4}, 
                        {leafchild:0, subtreeh:0, father:5}, 
                        {leafchild:0, subtreeh:0, father:5}, 
                        {leafchild:0, subtreeh:0, father:5},  
                        {leafchild:0, subtreeh:0, father:0}  ];
TOTALLEAF = originPoints[0].leafchild;
MAXDEPTH = originPoints[0].subtreeh;
PERANG = 2 * Math.PI / TOTALLEAF;
PERDEP = PLOTRADIUS / MAXDEPTH;
points = [];

spreadtime = 30;

buildTree = ->
    col = getTemp(TOTALLEAF);
    points.push( {x:0, y:0, father:-1, color:col} );
    accuAng = 0;
    for i in [1..originPoints.length-1]
        subtreeh = originPoints[i].subtreeh;
        leafchild = originPoints[i].leafchild;
        r;
        theta;
        if subtreeh != 0
            r = PLOTRADIUS - PERDEP * subtreeh;
            theta = accuAng + (1 + leafchild) / 2 * PERANG;
        else
            r = PLOTRADIUS;
            accuAng += PERANG;
            theta = accuAng;
        
        ax = Math.cos(theta) * r;
        ay = Math.sin(theta) * r;
        col = getTemp(leafchild);
        addp = {x:ax, y:ay, father:originPoints[i].father, color:col};
        points.push(addp);
    

getTemp = (leafchild) ->
    temp = Math.round(leafchild / TOTALLEAF * 390);
    return sewen[temp][1];

drawPoint = (cxt, i, x, y) ->
    gra = cxt.createRadialGradient(x, y, 0, x, y, POINTRADIUS);
    gra.addColorStop(0, points[i].color);
    gra.addColorStop(0.8, points[i].color);
    gra.addColorStop(1, "rgb( 100 , 100 , 100 )");
    cxt.fillStyle = gra;
    cxt.beginPath();
    cxt.arc( x, y, POINTRADIUS, 0, 2*Math.PI );
    cxt.closePath();
    cxt.fill();


drawLine = (cxt, x, y, ex, ey)->
    cxt.strokeStyle = "rgb( 100 , 100 , 100 )";
    cxt.beginPath();
    cxt.moveTo( x, y );
    cxt.lineTo( ex, ey );
    cxt.closePath();
    cxt.stroke();

render = (cxt) ->
    cxt.clearRect( -WINDOW_WIDTH / 2, -WINDOW_HEIGHT / 2, WINDOW_WIDTH, WINDOW_HEIGHT );

    cxt.save();
    cxt.scale(1 - spreadtime * spreadtime / 900, 1 - spreadtime * spreadtime / 900);

    father;
    for i in [1..points.length-1]
        father = points[i].father;
        drawLine(cxt, points[i].x, points[i].y, points[father].x, points[father].y);
    
    for i in [1..points.length-1]
        drawPoint(cxt, i, points[i].x, points[i].y);
    
    drawPoint(cxt, 0, 0, 0);
    cxt.restore();

MouseDown = (e) -> 
    e = MousePos(e);
    for i in [0..points.length-1]
        dx = points[i].x - e.x;
        dy = points[i].y - e.y;
        
    

handle = (para) ->
	return 0
	
MouseWheel = (e) ->
    delta = 0;  

    if not event
        event = window.event;  
    if event.wheelDelta 
        delta = event.wheelDelta / 120;  
    else if event.detail
        delta = -event.detail / 3;  
    

    if delta == 1
        handle(delta);
        #发送请求
    if delta == -1
        handle(delta);
    
    if event.preventDefault 
        event.preventDefault();  
    event.returnValue = false; 

MousePos = (event) ->
    event = (event ? event : window.event);
    return {
        x: event.pageX - canvas.offsetLeft - WINDOW_WIDTH / 2,
        y: event.pageY - canvas.offsetTop - WINDOW_HEIGHT / 2
    }

$(document).ready ->
    canvas = document.getElementById('wb_tree');
    context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    context.translate( WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2 );

    buildTree();

    setInterval(
        (->
            render( context );
            if spreadtime > 0 
                spreadtime -= 1;
            
        ),
        50
    );

    canvas.onmouseclick = MouseDown;
    canvas.onmousewheel = MouseWheel;
