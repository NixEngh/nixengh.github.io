
var canvas = document.getElementById("myCanvas");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");
var gridHeight = 10;
var gridWidth = 10
var cellSize = height / gridHeight;

const FRAMEMILLIS = 250;


ctx.fillStyle = "#FFFFFF";

var currentDirInt = 0;

var keyToDir = {
    left: directions.WEST,
    right: directions.EAST,
    up: directions.NORTH,
    down: directions.SOUTH
};
var keyMap = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};
var lastkey = 'down';
function keydown(event) {
    var key = keyMap[event.keyCode];
    lastkey = key;
};
window.addEventListener("keydown", keydown, false);




function setNextDir(int) {
    currentDirInt = (currentDirInt + int) % directions.length;
};

function drawSegmentToCanvas(segment) {
    var bounds = segment.getBounds(cellSize);
    ctx.fillRect(bounds[0], bounds[1], bounds[2], bounds[3]);
    console.log(bounds);
};

function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
};


var startsegment = new Segment(directions.SOUTH, false, true, new Location(5, 5));
var startsegment1 = startsegment.getNeighbor(directions.NORTH, gridHeight, gridWidth);
var startsegment2 = startsegment1.getNeighbor(directions.NORTH, gridHeight, gridWidth);

var segments = [startsegment, startsegment1, startsegment2];

function drawSnake() {
    segments.forEach(element => {
        drawSegmentToCanvas(element);
    });
};

function loop(timestamp) {
    if ((timestamp - timestamp % FRAMEMILLIS) != lastRender) {
        lastRender = timestamp - timestamp % FRAMEMILLIS;

        

        // segments[segments.length]=segments[segments.length-1].getNeighbor(directionsList[currentDirInt], gridHeight, gridWidth);
        for (let i = segments.length - 1; i > 0; i--) {
            segments[i].location = segments[i - 1].location;
        };


        segments[0] = segments[0].getNeighbor(keyToDir[lastkey], gridHeight, gridWidth);



        clearCanvas();
        
        drawSnake();

    };
    window.requestAnimationFrame(loop);
};

var lastRender = 0;
window.requestAnimationFrame(loop);

