/**
 * @file js/PIXI/render/player.js
 * @description Player movement and camera movement
*/


// import React, { useEffect, useState } from "react";
// import { Stage, Sprite } from "@pixi/react";
import * as PIXI from "pixi.js";
import { GlowFilter } from "pixi-filters";
import { E } from "emath.js";
import Game from "../../game";

import { sprite } from "js/classes";

const { app } = Game.PIXI;
// Camera properties
Game.player = {
    sprite: (function () {
        // Create the circle sprite
        const circle = new PIXI.Graphics();
        circle.lineStyle(2, 0xFFFFFF); // Set line color and thickness
        circle.drawCircle(0, 0, 50); // Set the radius of the circle
        circle.x = app.screen.width / 2;
        circle.y = app.screen.height / 2;

        // Add a glow filter to the circle
        circle.filters = [
            new GlowFilter({
                quality: 0.1,
                // innerStrength: 4,
                // outerStrength: 4,
            }),
        ];

        // Add the circle to the stage

        return new sprite(circle, "Circle");
        // return app.stage.addChild(circle);
    })(),
    acceleration: 0.2,
    velocity: { x: 0, y: 0 },
    restoringForce: 0.005,
    friction: 0.95,
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
    state: ["idle"],
};
const condition = () => !Game.settings.clickToMove && Game.player.state[0] === "idle";
Game["keys"].addKeys([
    { name: "Move Up", key: "w", fn: () => Game.player.velocity.y -= condition() ? Game.player.acceleration : 0},
    { name: "Move Left", key: "a", fn: () => Game.player.velocity.x -= condition() ? Game.player.acceleration : 0 },
    { name: "Move Down", key: "s", fn: () => Game.player.velocity.y += condition() ? Game.player.acceleration : 0 },
    { name: "Move Right", key: "d", fn: () => Game.player.velocity.x += condition() ? Game.player.acceleration : 0 },
]);

Game.functions.updateCamera = function (dt: number) {
    Game.camera.x = E.smoothDamp(E(Game.camera.x), E(Game.player.position.x), E(Game.camera.smoothDamp), E(dt)).toNumber();
    Game.camera.y = E.smoothDamp(E(Game.camera.y), E(Game.player.position.y), E(Game.camera.smoothDamp), E(dt)).toNumber();
};
// Update loop
app.ticker.add((dt: number) => {
    Game.player.position.x += Game.player.velocity.x;
    Game.player.position.y += Game.player.velocity.y;

    Game.player.sprite.x += Game.player.velocity.x;
    Game.player.sprite.y += Game.player.velocity.y;

    // Damping (slowing down) velocity
    Game.player.velocity.x *= Game.player.friction;
    Game.player.velocity.y *= Game.player.friction;

    switch (Game.player.state[0]) {
    case "lockedToMass":
        const particle = Game.player.state[1];
        Game.player.position.x = Game.player.sprite.x = E.smoothDamp(E(Game.player.sprite.x), E(particle.x), E(0.15), E(dt)).toNumber();
        Game.player.position.y = Game.player.sprite.y = E.smoothDamp(E(Game.player.sprite.y), E(particle.y), E(0.15), E(dt)).toNumber();
        Game.camera.x = Game.player.sprite.x - app.screen.width / 2;
        Game.camera.y = Game.player.sprite.y - app.screen.height / 2;
        break;
    case "lockedToMassExit":
        Game.player.position.x -= app.screen.width / 2;
        Game.player.position.y -= app.screen.height / 2;
        Game.functions.updateCamera(dt);
        Game.player.state = ["idle"];
        break;
    case "idle":
    default:
        Game.functions.updateCamera(dt);
        break;
    }
});