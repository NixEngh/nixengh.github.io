directionsList = ["S", "N", "W", "E"]
const directions = {
    SOUTH: directionsList[0],
    NORTH: directionsList[1],
    WEST: directionsList[2],
    EAST: directionsList[3],
}


class Location {
    constructor(gridx, gridy, cellSize) {
        this.gridx = gridx;
        this.gridy = gridy;
        this.x = gridx*cellSize;
        this.y = gridy*cellSize;
    }

    getNeighbor(direction, gridheight, gridwidth) {
        switch (direction) {
            case directions.SOUTH:
                return new Location(this.gridx, (this.gridy + 1 + gridheight) % gridheight, cellSize);
            case directions.NORTH:
                return new Location(this.gridx, (this.gridy - 1 + gridheight) % gridheight, cellSize);
            case directions.WEST:
                return new Location((this.gridx - 1 + gridwidth) % gridwidth, this.gridy, cellSize);
            case directions.EAST:
                return new Location((this.gridx + 1 + gridwidth) % gridwidth, this.gridy, cellSize);
        }
    }
}
class Segment {
    constructor(dir, isLast, isFirst, location) {
        this.dir = dir;
        this.isLast = isLast;
        this.isFirst = isFirst;
        this.location = location;
    }
    getNeighbor(direction, gridHeight, gridWidth){
        return new Segment(this.dir, this.isLast, this.isFirst, this.location.getNeighbor(direction, gridHeight, gridWidth));
        
    }
    getBounds(cellSize){
        return [this.location.x+cellSize/4, this.location.y+cellSize/4, cellSize/2, cellSize/2]

        // if (!this.isFirst && !this.isLast) {
        //     switch (dir) {
        //         case directions.NORTH:
        //         case directions.SOUTH:
        //             return [location.x + (cellSize / 4), directions.y, cellSize / 2, cellSize];
        //         case directions.EAST:
        //         case directions.West:

        //     }
        // }

    }
}