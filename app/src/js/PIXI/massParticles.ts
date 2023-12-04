import Game from "../game";

import * as PIXI from "pixi.js";
import { E } from "emath.js";
import { sprite } from "emath.js/pixiGame";

// Game.static.massParticles = [];

const { Graphics } = PIXI;
const { app } = Game.PIXI;
// Function to generate and add a static circle
function addStaticCircle (x: number, y: number) {
    const staticCircle = new Graphics();
    staticCircle.beginFill(0xFFFFFF); // Set circle color
    staticCircle.drawCircle(0, 0, 45); // Set circle size
    staticCircle.endFill();
    staticCircle.x = x;
    staticCircle.y = y;
    return Game.addSprite(staticCircle, "Circle");
}

// Function to generate and add static circles within a box
function spawnStaticCircles () {
    const boxWidth = 600;
    const boxHeight = 400;
    const minX = app.screen.width / 2 - boxWidth / 2;
    const maxX = app.screen.width / 2 + boxWidth / 2;
    const minY = app.screen.height / 2 - boxHeight / 2;
    const maxY = app.screen.height / 2 + boxHeight / 2;

    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;

    return addStaticCircle(x, y);
}

// const box = new Graphics();
// box.lineStyle(2, 0xFFFFFF)
// box.drawRect(0, 0, 300, 200);
// Game.addToStage(box)

// eventSystem.addEvent("Mass Spawn", "interval", E(1000).div(Game.data.quarks.regenRate), () => {
//     if (Game.data.quarks.maxParticles.gt(Game.static.massParticles.length)) Game.static.massParticles.push(spawnStaticCircles());
// });