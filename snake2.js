const FRAMEMILLIS = 300;

var canvas = document.getElementById("myCanvas");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FFFFFF";

var gridHeight = 10;
var gridWidth = 10;

var cellHeight = height/gridHeight;
var cellWidth = width/gridWidth;

const directions = {
    SOUTH: [0, +1],
    NORTH: [0, -1],
    WEST: [-1, 0],
    EAST: [1, 0]
}


function gridCoordToAbsoluteCoordsTopLeft(gridx, gridy) {
    return [gridx*cellWidth, gridy*cellHeight];
}

function translateToValidLocation(gridx, gridy) {
    return [(gridx+gridWidth)%gridWidth, (gridy+gridHeight)%gridHeight];
}


function drawSegmentsToCanvas() {
    snake.forEach(segment => {
        coords = gridCoordToAbsoluteCoordsTopLeft(segment[0], segment[1]);
        ctx.fillRect(coords[0] + cellWidth/4, coords[1] + cellHeight/4, cellWidth/2, cellHeight/2);
    })
};

function drawFruitToCanvas() {
    coords = gridCoordToAbsoluteCoordsTopLeft(fruit[0], fruit[1]);
    ctx.fillStyle = "red";
    ctx.fillRect(coords[0]+3*(cellWidth/8), coords[1]+3*(cellHeight/8), 2*(cellWidth/8), 2*(cellHeight/8));
    ctx.fillStyle = "white";
}

function moveSnake() {
    for (let i = snake.length-1; i > 0; i--) {
        snake[i] = snake[i-1];
    }
    
    snake[0] = translateToValidLocation(snake[0][0]+currentDirection[0], snake[0][1]+currentDirection[1]);
    lastDirection = currentDirection;
}

function eatFruit() {
    snake[snake.length] = snake[snake.length-1].slice();
    
    while(true) {
        fruit = [Math.floor(Math.random()*gridWidth), Math.floor(Math.random()*gridHeight)];
        wasIn = false;
        for(let i = 0; i<snake.length; i++) {
            if(fruit[0]==snake[i][0] && fruit[1]==snake[i][1]) {
                wasIn = true;
                break;
            }
        }
        if(!wasIn){
            break;
        }
    }
}
function hasCrashed() {
    for(let i = 1; i<snake.length; i++) {
        if(snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]) {
            return true;
        }
    }
    return false;
}


var keyMap = {
    37: directions.WEST,
    38: directions.NORTH,
    39: directions.EAST,
    40: directions.SOUTH
};


function getOppositeDirection(dir) {
    
    switch(dir){
        case directions.SOUTH:
            return directions.NORTH;
        case directions.NORTH:
            return directions.SOUTH;
        case directions.WEST:
            return directions.EAST;
        case directions.EAST:
            return directions.WEST;
    }
    
}

var lastDirection = directions.SOUTH;
var currentDirection = directions.SOUTH;

function keydown(event) {
    if (event.keyCode in keyMap) {
        var key = keyMap[event.keyCode];
        if(key != getOppositeDirection(lastDirection)){
            currentDirection = key;
        }
    }
};
window.addEventListener("keydown", keydown, false);


var snake = [[5, 5], [5, 4], [5,3]];
var fruit = [7, 6];



var lastRender = 0;
function loop(timestamp) {
    if ((timestamp - timestamp % FRAMEMILLIS) != lastRender) {
        lastRender = timestamp - timestamp % FRAMEMILLIS;
        moveSnake();

        if(hasCrashed()) {
            gameOver();
            return;
        }

        if(snake[0][0] == fruit[0] && snake[0][1] == fruit[1]) {
            eatFruit();
        }

    };

    ctx.clearRect(0, 0, width, height);

    drawFruitToCanvas();
    
    drawSegmentsToCanvas();


    window.requestAnimationFrame(loop);
};

requestAnimationFrame(loop);

function gameOver() {
    ctx.clearRect(0, 0, width, height);
    
    ctx.font = "30px Arial";
    var score = snake.length - 3;
    snake = [];
    fruit = null;
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
    ctx.fillText("Your score was : " + score.toString(), canvas.width/2, canvas.height/2+50);
}