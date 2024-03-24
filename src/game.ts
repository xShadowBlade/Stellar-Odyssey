/**
 * @file Defines the main game module.
 * @module game
 * @version 0.1.0
 */

import { PixiGame } from "emath.js/pixiGame";
import { Application } from "pixi.js";

const pixiApp = new Application({
    resizeTo: window,
    backgroundColor: 0x000000,
});
// @ts-expect-error - PIXI.Application.view is buggy
document.getElementById("game")?.appendChild(pixiApp.view);

const Game = new PixiGame({
    // @ts-expect-error - MODE is replaced by webpack, as type: "development" | "production"
    mode: MODE,
    name: {
        title: "Stellar Odyssey",
        id: "stellar-odyssey",
        version: "0.1.0",
    },
    settings: {
        framerate: 30,
    },
    pixi: {
        app: pixiApp,
    },
});

// console.log(Game);

if (Game.config.mode === "development") (window as typeof window & { Game: typeof Game })["Game"] = Game;

export default Game;