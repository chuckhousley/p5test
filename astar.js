"use strict";
var sketch = function(p) {
    var grid = [];
    var squareSize = 15;
    var numX = p.round(p.windowWidth / squareSize) - 1;
    var numY = p.round(p.windowHeight / squareSize) - 1;
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        for (var x = 0; x < numX; x++) {
            grid[x] = [];
            for(var y = 0; y < numY; y++) {
                grid[x][y] = new Square(x, y);
            }
        }
        p.strokeWeight(1);
    };

    p.draw = function () {
        //p.strokeWeight(1);
        for(var x = 0; x < numX; x++) {
            for(var y = 0; y < numY; y++) {
                var current = grid[x][y];
                if(p.floor(p.mouseX / squareSize) == x && p.floor(p.mouseY / squareSize) == y) {
                    p.fill(255, 0, 0);
                } else {
                    p.fill(current.color);
                }
                p.rect(current.x*squareSize, current.y*squareSize, squareSize, squareSize);
            }
        }
        p.textSize(32);
        p.fill(0,200,0);
        var pos = p.mouseX.toString() + ',' + p.mouseY.toString();
        p.text(pos, 50, 50);
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    function Square(ix, iy) {
        this.x = ix;
        this.y = iy;
        this.color = p.color(p.random(255));

    }
};

var myp5 = new p5(sketch);