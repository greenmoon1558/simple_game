"use strict";

var ship = void 0;
var flowers = [];
var drops = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	ship = new Ship();
	for (var i = 0; i < 10; i++) {
		flowers[i] = new Flower(i * 80 + random(width / 10), 120);
	}
}

function draw() {
	background(51);
	ship.show();
	ship.move();
	for (var i = 0; i < drops.length; i++) {
		drops[i].show();
		drops[i].move();

		for (var j = 0; j < flowers.length; j++) {
			if (drops[i].hit(flowers[j])) {
				flowers[j].grow();
				drops[i].evaporate();
			}
		}
	}
	var edge = false;
	for (var _i = 0; _i < 10; _i++) {
		flowers[_i].show();
		flowers[_i].move();
		if (flowers[_i].x > width || flowers[_i].x < 0) {
			edge = true;
		}
	}
	if (edge) {
		for (var _i2 = 0; _i2 < flowers.length; _i2++) {
			flowers[_i2].shiftDown();
		}
	}
	for (var _i3 = drops.length - 1; _i3 >= 0; _i3--) {
		if (drops[_i3].toDelete) {
			drops.splice(_i3, 1);
		}
	}
}

function keyReleased() {
	if (key !== " ") ship.setDir(0);
}

function keyPressed() {
	if (key === " ") {
		var drop = new Drop(ship.x + 10, height - 60);
		drops.push(drop);
	}
	if (keyCode === RIGHT_ARROW) {
		ship.setDir(1);
	} else if (keyCode === LEFT_ARROW) {
		ship.setDir(-1);
	}
}