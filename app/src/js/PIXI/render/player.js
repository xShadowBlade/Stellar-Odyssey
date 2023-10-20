/**
 * @file js/PIXI/render/player.js
 * @description Player movement and camera movement
*/


import React, { useEffect, useState } from "react";
import { Stage, Sprite } from "@pixi/react";
import * as PIXI from "pixi.js";
import eMath from "emath.js";
import Game from "../../Game/js";
const { E } = eMath;

const { app } = window["Game"].PIXI;
// Camera properties
window["Game"].camera = {
    x: 0,
    y: 0,
    smoothDamp: 0.15,
};
const { camera } = window["Game"];
window["Game"].player = {
    sprite: (function () {
        // Create the circle sprite
        const circle = new PIXI.Graphics();
        circle.lineStyle(2, 0xFFFFFF); // Set line color and thickness
        circle.drawCircle(0, 0, 50); // Set the radius of the circle
        circle.x = app.screen.width / 2;
        circle.y = app.screen.height / 2;

        // Add a glow filter to the circle
        circle.filters = [
            new PIXI.filters.GlowFilter({
                quality: 0.1,
                // innerStrength: 4,
                // outerStrength: 4,
            }),
        ];

        // Add the circle to the stage

        return new window["Game"].classes.sprite(circle, "Circle");
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
window["Game"].settings.clickToMove = false;
const condition = () => !window["Game"].settings.clickToMove && window["Game"].player.state[0] == "idle";
window["Game"]["keys"].addKeys([
    { name: "Move Up", key: "w", fn: () => window["Game"].player.velocity.y -= condition() ? window["Game"].player.acceleration : 0},
    { name: "Move Left", key: "a", fn: () => window["Game"].player.velocity.x -= condition() ? window["Game"].player.acceleration : 0 },
    { name: "Move Down", key: "s", fn: () => window["Game"].player.velocity.y += condition() ? window["Game"].player.acceleration : 0 },
    { name: "Move Right", key: "d", fn: () => window["Game"].player.velocity.x += condition() ? window["Game"].player.acceleration : 0 },
]);

window["Game"].functions.updateCamera = function (dt) {
    window["Game"].camera.x = eMath.smoothDamp(window["Game"].camera.x, window["Game"].player.position.x, window["Game"].camera.smoothDamp, dt);
    window["Game"].camera.y = eMath.smoothDamp(window["Game"].camera.y, window["Game"].player.position.y, window["Game"].camera.smoothDamp, dt);
};
// Update loop
app.ticker.add((dt) => {
    window["Game"].player.position.x += window["Game"].player.velocity.x;
    window["Game"].player.position.y += window["Game"].player.velocity.y;

    window["Game"].player.sprite.x += window["Game"].player.velocity.x;
    window["Game"].player.sprite.y += window["Game"].player.velocity.y;

    // Damping (slowing down) velocity
    window["Game"].player.velocity.x *= window["Game"].player.friction;
    window["Game"].player.velocity.y *= window["Game"].player.friction;

    switch (window["Game"].player.state[0]) {
    case "lockedToMass":
        const particle = window["Game"].player.state[1];
        window["Game"].player.position.x = window["Game"].player.sprite.x = eMath.smoothDamp(window["Game"].player.sprite.x, particle.x, 0.15, dt);
        window["Game"].player.position.y = window["Game"].player.sprite.y = eMath.smoothDamp(window["Game"].player.sprite.y, particle.y, 0.15, dt);
        window["Game"].camera.x = window["Game"].player.sprite.x - app.screen.width / 2;
        window["Game"].camera.y = window["Game"].player.sprite.y - app.screen.height / 2;
        break;
    case "lockedToMassExit":
        window["Game"].player.position.x -= app.screen.width / 2;
        window["Game"].player.position.y -= app.screen.height / 2;
        window["Game"].functions.updateCamera(dt);
        window["Game"].player.state = ["idle"];
        break;
    case "idle":
    default:
        window["Game"].functions.updateCamera(dt);
        break;
    }
});

const Player = function () {
    return <Sprite />;
};

export default Player;