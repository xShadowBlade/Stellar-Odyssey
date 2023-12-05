/**
 * @file chronos.ts
 * @description Chronos (time) currency and related functions
 */
import { E } from "emath.js";
import Game from "../game";

const chronos = Game.addCurrency("chronos");
const lastReward = Game.addAttribute("lastReward", false);
/**
 * Warps the time in the game.
 * @param t - The time to warp.
 */
function timewarp (t: number | string | E) {
    // Game["data"].playtime.timewarp = E(t);
}
/**
 * Claims the daily reward.
 * @param skipTime - Whether to skip the time check and claim the reward immediately. Default is false.
 * @returns True if the reward was claimed, false otherwise.
 */
function claimDailyReward (skipTime: boolean = false): boolean {
    if (skipTime || lastReward.value.sub(Date.now()).mul(-1).gte(E(43_200_000))) { // 43,200,000 is 12 hours, checks if time elasped is greater
        lastReward.value = E(Date.now());
        chronos.static.gain();
        return true;
    } else return false;
};

export { chronos, timewarp, claimDailyReward };