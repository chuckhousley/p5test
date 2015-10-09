"use strict";
var sketch = function(p) {
    var white, makeAnother;
    var dimensions = {};
    var grid = [];
    var emitters = [];
    var renderQueue = [];
    var squareSize = 15;

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        dimensions = createDimensions();
        grid = createGrid();

        white = p.color("white");
        makeAnother = 0;
        //p.noCursor();
        p.frameRate(60);  // pc mustard rayse
    };

    p.draw = function () {
        p.stroke(255);
        //p.strokeWeight(1);
        renderQueue.push({x: getX(), y: getY(), fade: 0.0, color: "#bada55"});

        p.fill(255);
        p.rect(50,25,175,50);
        p.textSize(32);
        p.fill(0,200,0);
        var pos = getX().toString() + ',' + getY().toString();
        p.text(pos, 50, 50);
        fade();
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
    function getX() {
        return p.floor(p.mouseX/squareSize);
    }
    function getY() {
        return p.floor(p.mouseY/squareSize);
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
    function md(src, dest) {
        return p.abs(src.x - dest.x) + p.abs(src.y - dest.y);
    }
    function fade() {
        var toDelete = 0;
        for (var i = 0; i < renderQueue.length; i++) {
            var e = renderQueue[i];
            p.fill(p.lerpColor(p.color(e.color), white, e.fade));
            p.rect(e.x*squareSize, e.y*squareSize, squareSize, squareSize);
            e.fade += 0.05;
            if (e.fade > 1.1) { // make extra sure the fade completed
                toDelete++;
            }
        }
        for (var j = 0; j < toDelete; j++) {
            renderQueue.shift()
        }
    }
};

var myp5 = new p5(sketch);