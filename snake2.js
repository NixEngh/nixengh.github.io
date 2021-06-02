var canvas = document.getElementById("myCanvas");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");

var gridHeight = 10;
var gridWidth = 10;

var cellHeight = height/gridHeight;
var cellWidth = width/gridWidth;

function gridCoordToAbsoluteCoordsTopLeft(gridx, gridy) {
    return [gridx*cellWidth, gridy*cellHeight];
}

function translateToValidLocation(gridx, gridy) {
    return [(gridx+gridWidth)%gridWidth, (gridy+gridHeight)%gridHeight];
}
