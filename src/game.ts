/**
 * @file Defines the main game module.
 */

import { Game as GameClass } from "emath.js/game";
// import { Application } from "pixi.js";

// const pixiApp = new Application({
//     resizeTo: window,
//     backgroundColor: 0x000000,
// });
// // @ts-expect-error - PIXI.Application.view is buggy
// document.getElementById("game")?.appendChild(pixiApp.view);

/**
 * Game instance.
 */
const Game = new GameClass({
    mode: ((): "development" | "production" => {
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
        version: "0.2.0",
    },
    settings: {
        framerate: 30,
    },
    // pixi: {
    //     app: pixiApp,
    // },
});

// console.log(Game);

if (Game.config.mode === "development") {
    (window as typeof window & { Game: typeof Game }).Game = Game;
    // (window as any).eMath = await import("emath.js");
    void (async (): Promise<void> => {
        const eMath = await import("emath.js");
        (window as typeof window & { eMath: typeof eMath }).eMath = eMath;

        const eMathGame = await import("emath.js/game");
        (window as typeof window & { eMathGame: typeof eMathGame }).eMathGame = eMathGame;
    })();
}

export default Game;
