"use strict";

function Ship() {
    this.x = width / 2;
    this.xdir = 0;

    this.show = function () {
        fill(255);
        rect(this.x, height - 20, 20, 60);
    };

    this.move = function () {
        this.x += this.xdir * 5;
    };

    this.setDir = function (dir) {
        this.xdir = dir;
    };
}