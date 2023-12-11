import { E } from "emath.js";
import Game from "../game";

// Game.PIXI.app.ticker.add(function (dt: number) {
//     Game["data"].playtime.timewarp = E(); // reset timewarp

//     Game["static"].playtime.tActive.gain(dt);
//     Game["static"].playtime.tPassive.gain(dt);
//     Game["static"].playtime.active.gain(dt);
//     Game["static"].playtime.passive.gain(dt);
//     Game["static"].playtime.points.gain(dt);
// });

/**
 * Warps the time in the game.
 * @param t - The time to warp.
 */
function timewarp (t: number | string | E) {
    // Game["data"].playtime.timewarp = E(t);
}

export { timewarp };