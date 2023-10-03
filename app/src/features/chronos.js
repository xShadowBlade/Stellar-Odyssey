import eMath from "emath.js";

const { E } = eMath;

const chronos = {
    currency: new eMath.classes.currency(),
    lastReward: E(0),
};
// Daily Reward
const claimDailyReward = (function () {
    return function (skipTime = false) {
        if (skipTime || chronos.lastReward.sub(Date.now()).mul(-1).gte(E(43200000))) { // 43200000 is 12 hours, checks if time elasped is greater
            chronos.lastReward = E(Date.now());
            return chronos.currency.gain();
        }
    };
})();

export { chronos, claimDailyReward };