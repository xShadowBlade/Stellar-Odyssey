/**
 * @file Mass particles, the particles that are attracted to the player
 */
import Game from "../game";

import { Graphics } from "pixi.js";
// import { E } from "emath.js";
import type { GameSprite } from "emath.js/pixiGame";

const massParticles: GameSprite[] = [];

const { app } = Game.PIXI;
/**
 * Function to generate and add a static circle
 * @param x - x position
 * @param y - y position
 * @returns - the circle sprite
 */
function addStaticCircle (x: number, y: number): GameSprite {
    const staticCircle = new Graphics();
    staticCircle.beginFill(0xFFFFFF); // Set circle color
    staticCircle.drawCircle(0, 0, 45); // Set circle size
    staticCircle.endFill();
    staticCircle.x = x;
    staticCircle.y = y;
    return Game.addSprite(staticCircle, "Circle");
}

/**
 * Function to generate and add static circles within a box
 * @returns - the circle sprite
 */
function spawnStaticCircles (): GameSprite {
    const boxWidth = 600;
    const boxHeight = 400;
    const minX = app.screen.width / 2 - boxWidth / 2;
    const maxX = app.screen.width / 2 + boxWidth / 2;
    const minY = app.screen.height / 2 - boxHeight / 2;
    const maxY = app.screen.height / 2 + boxHeight / 2;

    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;

    const circle = addStaticCircle(x, y);
    massParticles.push(circle);
    return circle;
}

export { massParticles, spawnStaticCircles };