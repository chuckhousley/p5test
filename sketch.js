"use strict";
var sketch = function (p) {
    var hexes = [];
    p.setup = function () {
        p.createCanvas(640, 480);
        // p.noCursor();
        //p.noStroke();
        p.background(100);
        for(var i = 0; i < 20; i++) {
            for(var j = 0; j < 18; j++) {
                hexes.push(new Polygon(50+i*22, 50+j*22, 10, 6));
            }
        }
    };

    p.draw = function () {
        for(var i = 0; i < hexes.length; i++) {
            var r = p.min(p.abs(hexes[i].x - p.mouseX), 255);
            var b = p.min(p.abs(hexes[i].y - p.mouseY), 255);
            if(p.mouseIsPressed){
                p.fill(0, b, r);
            } else {
                p.fill(r, 0, b);
            }
            hexes[i].display();
        }
    };

    function Polygon(x, y, radius, npoints) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.npoints = npoints;

        this.display = function () {
            var angle = p.TWO_PI / this.npoints;
            p.beginShape();
            for (var a = 0; a < p.TWO_PI; a += angle) {
                var sx = this.x + p.cos(a) * this.radius;
                var sy = this.y + p.sin(a) * this.radius;
                p.vertex(sx, sy);
            }
            p.endShape(p.CLOSE);
        }
    }
};

var myp5 = new p5(sketch);
