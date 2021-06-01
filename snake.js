
var canvas = document.getElementById("myCanvas");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");
var gridHeight = 10;
var gridWidth = 10
var cellSize = height / gridHeight;

const FRAMEMILLIS = 250;


ctx.fillStyle = "#FFFFFF";
ctx.font = "30px Arial";


var keyToDir = {
    left: directions.WEST,
    right: directions.EAST,
    up: directions.NORTH,
    down: directions.SOUTH
};
var dirToOpposite = {
    'left': 'right',
    'right': 'left',
    'up': 'down',
    'down': 'up'
}
var keyMap = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};
var lastkey = 'down';
function keydown(event) {
    if (event.keyCode in keyMap) {
        var key = keyMap[event.keyCode];
        if(key != dirToOpposite[lastkey]){
            lastkey = key;
        }
    }
};
window.addEventListener("keydown", keydown, false);

function drawSegmentToCanvas(segment) {
    var bounds = segment.getBounds(cellSize);
    ctx.fillStyle = "#A9A9A9";
    ctx.fillRect(bounds[0], bounds[1], bounds[2], bounds[3]);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(bounds[0], bounds[1], bounds[2]-3, bounds[3]-3);
};

function drawFruitToCanvas(fruit) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(fruit.x+3*(cellSize/8), fruit.y+3*(cellSize/8), 2*(cellSize/8), 2*(cellSize/8));
    ctx.fillStyle = "#FFFFFF"
}

function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
};


var startsegment = new Segment(directions.SOUTH, false, true, new Location(5, 5, cellSize));
var startsegment1 = startsegment.getNeighbor(directions.NORTH, gridHeight, gridWidth);
var startsegment2 = startsegment1.getNeighbor(directions.NORTH, gridHeight, gridWidth);

var segments = [startsegment, startsegment1, startsegment2];
var currentFruit = new Location(7, 9, cellSize);




function drawSnake() {
    segments.forEach(element => {
        drawSegmentToCanvas(element);
    });
};
function locationInSnake(location, skipFirst) {
    for (let i = 0; i < segments.length; i++) {
        if(skipFirst && i == 0) {
            continue;
        }
        const segment = segments[i];
        if( segment.location.equals(location)) {
            return true;
        };
    }
    return false;
}

function eatFruit() {
    tail = segments[segments.length-1];
    segments[segments.length] = new Segment(tail.dir, true, false, tail.location);


    var run = true;
    while(run) {
        currentFruit = new Location(Math.floor(Math.random()*gridWidth), Math.floor(Math.random()*gridHeight), cellSize);
        if(locationInSnake(currentFruit)) {
            continue;
        }
        break;
        
        
    }
}
function gameOver() {
    clearCanvas();
    var score = segments.length - 3;
    segments = [];
    currentFruit = null;
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
    ctx.fillText("Your score was : " + score.toString(), canvas.width/2, canvas.height/2+50);
}



function loop(timestamp) {
    if ((timestamp - timestamp % FRAMEMILLIS) != lastRender) {
        lastRender = timestamp - timestamp % FRAMEMILLIS;



        // segments[segments.length]=segments[segments.length-1].getNeighbor(directionsList[currentDirInt], gridHeight, gridWidth);

        //move snake segments one over
        for (let i = segments.length - 1; i > 0; i--) {
            segments[i].location = segments[i - 1].location;
        };

        //make the head of the snake move based on the keydirection
        segments[0] = segments[0].getNeighbor(keyToDir[lastkey], gridHeight, gridWidth);
        if(segments[0].location.equals(currentFruit)) {
            eatFruit();
        }
        if(locationInSnake(segments[0].location, true)) {
            gameOver();
            return
        }


        clearCanvas();
        
        drawFruitToCanvas(currentFruit);

        drawSnake();




    };
    window.requestAnimationFrame(loop);
};

var lastRender = 0;
window.requestAnimationFrame(loop);

