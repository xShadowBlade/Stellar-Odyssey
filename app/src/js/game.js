/**
 * @fileoverview Defines the main game module.
 * @module game
 * @version 0.1.0
 * @namespace Game
 * @typedef {Object} Game
 * @property {Object} version - Information about the game version.
 * @property {number} version.saveAPI - Save API version.
 * @property {string} version.phase - Development phase (e.g., "alpha").
 * @property {string} version.version - Game version.
 * @property {Object} classes - Collection of game classes.
 * @property {Object} data - Game data storage.
 * @property {Object} functions - Collection of game functions.
 * @property {Object} functions.start - Functions to run at the start of the game.
 * @property {Function} functions.startF - Function to execute all start functions.
 * @property {Object} functions.loop - Functions to run in the game loop.
 * @property {Function} functions.loopF - Function to execute all loop functions.
 * @property {Object} functions.timewarp - Function to set the game timewarp.
 * @property {Object} static - Static game data and functions.
 * @property {Object} settings - Game settings.
 * @property {number} settings.framerate - Game framerate.
 * @property {boolean} settings.c2 - Display "c^2" formatting for eV.
 * @property {Object} features - Game features and flags.
 */

const Game = {
    version: {
        saveAPI: 1,
        phase: "alpha",
        version: "0.1.0",
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

export default Game;