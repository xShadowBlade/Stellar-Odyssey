/**
 * @file Defines the main game module.
 * @module game
 * @version 0.1.0
 */

import { pixiGame } from "emath.js/pixiGame";
const Game = new pixiGame({
    // MODE is replaced by webpack, as type: "development" | "production"
    // @ts-ignore
    mode: MODE,
    name: {
        title: "Stellar Odyssey",
        id: "stellar-odyssey",
    },
    settings: {
        framerate: 30,
    },
});

// const gameOld: any = {
//     data: {
//         playtime: { // in milliseconds
//             tActive: new currency(),
//             tPassive: new currency(),
//             timewarp: E(),
//             active: new currency(),
//             passive: new currency(),
//             points: new currency(),
//             timeLastPlayed: E(),
//         },
//         quarks: {
//             currency: new currency(),
//             /**
//              * Rate of regeneration
//              * in x per second
//              */
//             regenRate: E(2),
//             absorbRate: E(2),
//             maxParticles: E(10),
//         },
//     },
//     static: {
//         massParticles: [],
//         playtime: { // in milliseconds
//             tActive: new currencyStatic(() => Game["data"].playtime.tActive),
//             tPassive: new currencyStatic(() => Game["data"].playtime.tPassive),
//             active: new currencyStatic(() => Game["data"].playtime.active),
//             passive: new currencyStatic(() => Game["data"].playtime.passive),
//             points: new currencyStatic(() => Game["data"].playtime.points),
//         },
//         quarks: {
//             currency: new currencyStatic(() => Game.data.quarks.currency),
//             regenRate: new attribute(2),
//             absorbRate: new attribute(2),
//             maxParticles: new attribute(10),
//         },
//     },
// };

// console.log(Game);

if (Game.config.mode === "development") (window as any)["Game"] = Game;

export default Game;