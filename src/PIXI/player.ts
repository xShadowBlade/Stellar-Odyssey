/**
 * @file Player movement and camera movement
 */

// import React, { useEffect, useState } from "react";
// import { Stage, Sprite } from "@pixi/react";
import * as PIXI from "pixi.js";
import { GlowFilter } from "pixi-filters";
import type { ESource } from "emath.js";
import { E } from "emath.js";
import Game from "../game";
import type { GameSprite } from "emath.js/pixiGame";

const { app } = Game.PIXI;
// Camera properties
const player = {
    sprite: ((): GameSprite => {
        // Create the circle sprite
        const circle = new PIXI.Graphics();
        circle.lineStyle(2, 0xFFFFFF); // Set line color and thickness
        circle.drawCircle(0, 0, 50); // Set the radius of the circle
        circle.x = app.screen.width / 2;
        circle.y = app.screen.height / 2;

        // Add a glow to the circle
        circle.filters = [
            // @ts-expect-error - PIXI.GlowFilter is a valid filter
            new GlowFilter({
                quality: 0.2, // Low quality since higher quality is very slow
                // innerStrength: 4,
                // outerStrength: 4,
            }),
        ];

        // Add the circle to the stage
        return Game.addSprite(circle, "Circle");
    })(),
    acceleration: 0.2,
    velocity: { x: 0, y: 0 },
    restoringForce: 0.005,
    friction: 0.95,
    smoothDamp: 0.15,
    position: {
        x: 0,
        y: 0,
        _x: 0,
        _y: 0,
    },
    /**
     * Possible states:
     * - ["idle"]
     * - ["lockedToMass", ${particle}]
     * - ["lockedToMassExit"]
     */
    state: ["idle"] as [string, ...any[]],
};
Game.keyManager.addKey([
    {
        id: "moveUp",
        name: "Move Up",
        key: "w",
        onDownContinuous: (): void => {
            player.velocity.y -= player.acceleration;
        },
    },
    {
        id: "moveLeft",
        name: "Move Left",
        key: "a",
        onDownContinuous: (): void => {
            player.velocity.x -= player.acceleration;
        },
    },
    {
        id: "moveDown",
        name: "Move Down",
        key: "s",
        onDownContinuous: (): void => {
            player.velocity.y += player.acceleration;
        },
    },
    {
        id: "moveRight",
        name: "Move Right",
        key: "d",
        onDownContinuous: (): void => {
            player.velocity.x += player.acceleration;
        },
    },
]);

/**
 * Updates the camera position based on the player's position using smooth damping.
 * @param dt - The time delta between frames.
 */
function updateCamera (dt: ESource): void {
    Game.PIXI.camera.x = E.smoothDamp(Game.PIXI.camera.x, player.position.x, player.smoothDamp, dt).toNumber();
    Game.PIXI.camera.y = E.smoothDamp(Game.PIXI.camera.y, player.position.y, player.smoothDamp, dt).toNumber();
}
// Update loop
app.ticker.add((dt: number) => {
    player.position.x += player.velocity.x;
    player.position.y += player.velocity.y;

    player.sprite.x += player.velocity.x;
    player.sprite.y += player.velocity.y;

    // Damping (slowing down) velocity
    player.velocity.x *= player.friction;
    player.velocity.y *= player.friction;

    switch (player.state[0]) {
        case "lockedToMass": {
            const particle = player.state[1] as GameSprite;
            player.position.x = player.sprite.x = E.smoothDamp(player.sprite.x, particle.x, player.smoothDamp, dt).toNumber();
            player.position.y = player.sprite.y = E.smoothDamp(player.sprite.y, particle.y, player.smoothDamp, dt).toNumber();
            Game.PIXI.camera.x = player.sprite.x - app.screen.width / 2;
            Game.PIXI.camera.y = player.sprite.y - app.screen.height / 2;
        } break;
        case "lockedToMassExit":
            player.position.x -= app.screen.width / 2;
            player.position.y -= app.screen.height / 2;
            updateCamera(dt);
            player.state = ["idle"];
            break;
        case "idle":
        default:
            updateCamera(dt);
            break;
    }
});

export { player };