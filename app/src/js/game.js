/**
 * @fileoverview Defines the main game module.
 * @module game
 * @version 0.1.0
 */

const Game = {
    version: {
        saveAPI: 1,
        phase: "alpha",
        dev: true,
    },
    classes: {},
    data: {},
    functions: {
        start: {},
        startF: () => Object.values(Game.functions.start).forEach((item) => item()),
        loop: {},
        loopF: (dt) => Object.values(Game.functions.loop).forEach((item) => item(dt)),
    },
    static: {},
    settings: {
        framerate: 30,
        c2: false, // whether or not to display the "c^2" on formating eV
    },
    features: {},
};
console.log(Game);

if (Game.version.dev) window["Game"] = Game;

export default Game;