// Generated by CoffeeScript 1.9.3
(function() {
  var MAXDEPTH, MouseDown, MousePos, MouseWheel, PERANG, PERDEP, PLOTRADIUS, POINTRADIUS, TOTALLEAF, WINDOW_HEIGHT, WINDOW_WIDTH, buildTree, drawLine, drawPoint, getTemp, handle, originPoints, points, render, spreadtime;

  WINDOW_WIDTH = 1024;

  WINDOW_HEIGHT = 600;

  POINTRADIUS = 10;

  PLOTRADIUS = 300;

  originPoints = [];

  TOTALLEAF;

  MAXDEPTH;

  PERANG;

  PERDEP;

  points = [];

  spreadtime = 30;

  buildTree = function() {
    var accuAng, addp, ax, ay, col, i, j, leafchild, r, ref, results, subtreeh, theta;
    col = getTemp(TOTALLEAF);
    points.push({
      x: 0,
      y: 0,
      father: -1,
      color: col
    });
    accuAng = 0;
    results = [];
    for (i = j = 1, ref = originPoints.length - 1; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      subtreeh = originPoints[i].subtreeh;
      leafchild = originPoints[i].leafchild;
      r;
      theta;
      if (subtreeh !== 0) {
        r = PLOTRADIUS - PERDEP * subtreeh;
        theta = accuAng + (1 + leafchild) / 2 * PERANG;
      } else {
        r = PLOTRADIUS;
        accuAng += PERANG;
        theta = accuAng;
      }
      ax = Math.cos(theta) * r;
      ay = Math.sin(theta) * r;
      col = getTemp(leafchild);
      addp = {
        x: ax,
        y: ay,
        father: originPoints[i].father,
        color: col
      };
      results.push(points.push(addp));
    }
    return results;
  };

  getTemp = function(leafchild) {
    var temp;
    temp = Math.round(leafchild / TOTALLEAF * 390);
    return sewen[temp][1];
  };

  drawPoint = function(cxt, i, x, y) {
    var gra;
    gra = cxt.createRadialGradient(x, y, 0, x, y, POINTRADIUS);
    gra.addColorStop(0, points[i].color);
    gra.addColorStop(0.8, points[i].color);
    gra.addColorStop(1, "rgb( 100 , 100 , 100 )");
    cxt.fillStyle = gra;
    cxt.beginPath();
    cxt.arc(x, y, POINTRADIUS, 0, 2 * Math.PI);
    cxt.closePath();
    return cxt.fill();
  };

  drawLine = function(cxt, x, y, ex, ey) {
    cxt.strokeStyle = "rgb( 100 , 100 , 100 )";
    cxt.beginPath();
    cxt.moveTo(x, y);
    cxt.lineTo(ex, ey);
    cxt.closePath();
    return cxt.stroke();
  };

  render = function(cxt) {
    var father, i, j, k, ref, ref1;
    cxt.clearRect(-WINDOW_WIDTH / 2, -WINDOW_HEIGHT / 2, WINDOW_WIDTH, WINDOW_HEIGHT);
    cxt.save();
    cxt.scale(1 - spreadtime * spreadtime / 900, 1 - spreadtime * spreadtime / 900);
    father;
    for (i = j = 1, ref = points.length - 1; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      father = points[i].father;
      drawLine(cxt, points[i].x, points[i].y, points[father].x, points[father].y);
    }
    for (i = k = 1, ref1 = points.length - 1; 1 <= ref1 ? k <= ref1 : k >= ref1; i = 1 <= ref1 ? ++k : --k) {
      drawPoint(cxt, i, points[i].x, points[i].y);
    }
    drawPoint(cxt, 0, 0, 0);
    return cxt.restore();
  };

  MouseDown = function(e) {
    var dx, dy, i, j, ref, results;
    e = MousePos(e);
    results = [];
    for (i = j = 0, ref = points.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      dx = points[i].x - e.x;
      results.push(dy = points[i].y - e.y);
    }
    return results;
  };

  handle = function(para) {
    return 0;
  };

  MouseWheel = function(e) {
    var delta, event;
    delta = 0;
    if (!event) {
      event = window.event;
    }
    if (event.wheelDelta) {
      delta = event.wheelDelta / 120;
    } else if (event.detail) {
      delta = -event.detail / 3;
    }
    if (delta === 1) {
      handle(delta);
    }
    if (delta === -1) {
      handle(delta);
    }
    if (event.preventDefault) {
      event.preventDefault();
    }
    return event.returnValue = false;
  };

  MousePos = function(event) {
    event = event != null ? event : {
      event: window.event
    };
    return {
      x: event.pageX - canvas.offsetLeft - WINDOW_WIDTH / 2,
      y: event.pageY - canvas.offsetTop - WINDOW_HEIGHT / 2
    };
  };

  $(document).ready(function() {
    var canvas, context;
    canvas = document.getElementById('wb_tree');
    context = canvas.getContext("2d");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    context.translate(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);

    var tree_node = document.getElementById('tree_node').innerHTML;
    tree_node = tree_node.replace(/'/g, '"');
    originPoints = $.parseJSON(tree_node);
    TOTALLEAF = originPoints[0].leafchild;
    MAXDEPTH = originPoints[0].subtreeh;
    PERANG = 2 * Math.PI / TOTALLEAF;
    PERDEP = PLOTRADIUS / MAXDEPTH;

    buildTree();
    setInterval((function() {
      render(context);
      if (spreadtime > 0) {
        return spreadtime -= 1;
      }
    }), 50);
    canvas.onmouseclick = MouseDown;
    return canvas.onmousewheel = MouseWheel;
  });

}).call(this);
