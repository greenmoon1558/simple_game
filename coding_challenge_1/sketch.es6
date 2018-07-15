let ship;
let flowers = [];
let drops = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	ship = new Ship();
	for (let i = 0; i < 10; i++) {
		flowers[i] = new Flower(i * 80 + random(width / 10), 120);
	}
}

function draw() {
	background(51);
	ship.show();
	ship.move();
	for (let i = 0; i < drops.length; i++) {
		drops[i].show();
		drops[i].move();

		for (let j = 0; j < flowers.length; j++) {
			if (drops[i].hit(flowers[j])) {
				flowers[j].grow();
				drops[i].evaporate();
			}
		}
	}
	let edge = false;
	for (let i = 0; i < 10; i++) {
		flowers[i].show();
		flowers[i].move();
		if (flowers[i].x > width || flowers[i].x < 0) {
			edge = true;
		}
	}
	if (edge) {
		for (let i = 0; i < flowers.length; i++) {
			flowers[i].shiftDown();
		}
	}
	for (let i = drops.length - 1; i >= 0; i--) {
		if (drops[i].toDelete) {
			drops.splice(i, 1);
		}
	}
}

function keyReleased() {
	if (key !== " ")
		ship.setDir(0);
}

function keyPressed() {
	if (key === " ") {
		let drop = new Drop(ship.x + 10, height - 60);
		drops.push(drop);
	}
	if (keyCode === RIGHT_ARROW) {
		ship.setDir(1);
	} else if (keyCode === LEFT_ARROW) {
		ship.setDir(-1);
	}
}