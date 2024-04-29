/**
 * @file Chronos (time) currency and related functions
 */
import { E, ESource } from "emath.js";
import Game from "../game";

const { app } = Game.PIXI;

// Playtime
/**
 * Active playtime in milliseconds. Not impacted by boosts or offline time.
 */
const tActive = Game.addCurrency("tActive");
/**
 * Passive playtime in milliseconds. Impacted by offline time but not boosts.
 */
const tPassive = Game.addCurrency("tPassive");
/**
 * Active playtime in milliseconds. Impacted by boosts but not offline time.
 */
const active = Game.addCurrency("active");
/**
 * Passive playtime in milliseconds. Impacted by boosts and offline time.
 */
const passive = Game.addCurrency("passive");
/**
 * Points currency.
 */
const chronos = Game.addCurrency("chronos");

app.ticker.add(function (dt: number) {
    // dt is mul of deviation (ex. 1.02 is 1.02 times fps) so we need to convert it to ms
    // !Note: "This does not factor in the value of PIXI.Ticker#speed , which is specific to scaling PIXI.Ticker#deltaTime."
    dt *= (1000 / app.ticker.FPS) * 1000; // convert to ms (mul by 1000)
    // console.log(dt);
    tActive.static.gain(dt);
    tPassive.static.gain(dt);
    active.static.gain(dt);
    passive.static.gain(dt);
    // points.static.gain(dt);
});

/**
 * Warps the time in the game.
 * @param t - The time to warp.
 */
function timewarp (t: ESource): void {
    // Game["data"].playtime.timewarp = E(t);
}

// Daily reward

const lastReward = Game.addAttribute("lastReward", false);

/**
 * Claims the daily reward.
 * @param skipTime - Whether to skip the time check and claim the reward immediately. Default is false.
 * @returns True if the reward was claimed, false otherwise.
 */
function claimDailyReward (skipTime = false): boolean {
    if (skipTime || lastReward.value.sub(Date.now()).mul(-1).gte(43_200_000)) { // 43,200,000 is 12 hours, checks if time elasped is greater
        lastReward.value = E(Date.now());
        chronos.static.gain();
        return true;
    } else return false;
}

export { tActive, tPassive, active, passive, chronos, timewarp, claimDailyReward };