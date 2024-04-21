/**
 * @file Defines the main game module.
 */

import { PixiGame } from "emath.js/pixiGame";
import { Application } from "pixi.js";

const pixiApp = new Application({
    resizeTo: window,
    backgroundColor: 0x000000,
});
// @ts-expect-error - PIXI.Application.view is buggy
document.getElementById("game")?.appendChild(pixiApp.view);

/**
 * Game instance.
 */
const Game = new PixiGame({
    mode: (() => {
        try {
            // @ts-expect-error - MODE is replaced by webpack, as type: "development" | "production"
            return MODE as "development" | "production";
        } catch {
            return "development";
        }
    })(),
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

if (Game.config.mode === "development") {
    (window as typeof window & { Game: typeof Game })["Game"] = Game;
    // (window as any).eMath = await import("emath.js");
    (async () => {
        const eMath = await import("emath.js");
        (window as typeof window & { eMath: typeof eMath })["eMath"] = eMath;
    })();
}

export default Game;