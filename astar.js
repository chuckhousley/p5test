"use strict";
var sketch = function(p) {
    var white, makeAnother;
    var dimensions = {};
    var grid = [];
    var emitters = [];
    var squareSize = 15;

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        dimensions = createDimensions();
        grid = createGrid();
        white = p.color("white");
        //pg = p.createGraphics(squareSize, squareSize);
        emitters.push({x: 20, y: 20, fade: 0.0, color: "#fa6607"});
        makeAnother = 0;
    };

    p.draw = function () {
        p.stroke(255);
        p.strokeWeight(1);
        /*for(var x = 0; x < dimensions.numX; x++) {
            for(var y = 0; y < dimensions.numY; y++) {
                //var current = grid[x][y];
                if(p.floor(p.mouseX / squareSize) == x && p.floor(p.mouseY / squareSize) == y) {
                    pg.fill(255, 0, 0);
                } else {
                    pg.fill(255);
                }
                pg.rect(0,0,squareSize,squareSize);
                //pg.rect(x*squareSize, y*squareSize, squareSize, squareSize);
                p.image(pg, x*squareSize, y*squareSize);
            }
        }*/
        p.fill(255);
        p.rect(50,25,175,50);
        p.textSize(32);
        p.fill(0,200,0);
        var pos = p.mouseX.toString() + ',' + p.mouseY.toString();
        p.text(pos, 50, 50);
        fade();
        makeAnother++;

        if(makeAnother > 10) {
            emitters.push({x: p.random(5, 25), y: p.random(5, 25), fade: 0.0, color: "#fa6607"});
            makeAnother = 0;
        }
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.strokeWeight(0);
        dimensions = createDimensions();
        grid = createGrid();
    };

    function createDimensions() {
        var _dimensions = {};
        _dimensions.numX = p.round(p.windowWidth / squareSize) - 1;
        _dimensions.numY = p.round(p.windowHeight / squareSize) - 1;
        return _dimensions;
    }

    function createGrid() {
        var _grid = [];
        for (var x = 0; x < dimensions.numX; x++) {
            _grid[x] = [];
            for(var y = 0; y < dimensions.numY; y++) {
                _grid[x][y] = p.random(10);
            }
        }
        return _grid;
    }
    function fade() {
        var toDelete = 0;
        for (var i = 0; i < emitters.length; i++) {
            var e = emitters[i];
            p.fill(p.lerpColor(p.color(e.color), white, e.fade));
            p.rect(e.x*squareSize, e.y*squareSize, squareSize, squareSize);
            e.fade += 0.1;
            if (e.fade > 1.0) {
                toDelete++;

            }
        }
        for (var j = 0; j < toDelete; j++) {
            emitters.shift()
        }
    }
};

var myp5 = new p5(sketch);