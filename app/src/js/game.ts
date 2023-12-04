/**
 * @fileoverview Defines the main game module.
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
// const placeholder = {
//     camera: {
//         x: 0,
//         y: 0,
//         smoothDamp: 0.15,
//     },
//     functions: {
//         timewarp: (t: number | string | E) => Game["data"].playtime.timewarp = E(t),
//         claimDailyReward: function (skipTime: boolean = false): boolean {
//             if (skipTime || Game.data.chronos.lastReward.sub(Date.now()).mul(-1).gte(E(43_200_000))) { // 43,200,000 is 12 hours, checks if time elasped is greater
//                 Game.data.chronos.lastReward = E(Date.now());
//                 Game.static.chronos.currency.gain();
//                 return true;
//             } else return false;
//         },
//         updateCamera: function (dt: number) {
//             Game.camera.x = E.smoothDamp(Game.camera.x, Game.player.position.x, Game.camera.smoothDamp, dt).toNumber();
//             Game.camera.y = E.smoothDamp(Game.camera.y, Game.player.position.y, Game.camera.smoothDamp, dt).toNumber();
//         },
//     },
// }
// console.log("test: ", E, currency);
// import spriteFunction from "./PIXI/sprite";

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
//         chronos: {
//             currency: new currency(),
//             lastReward: E(0),
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
//         chronos: {
//             currency: new currencyStatic(() => Game.data.chronos.currency),
//         },
//     },
// };

// console.log(Game);

if (Game.config.meta.mode === "development") (window as any)["Game"] = Game;

export default Game;