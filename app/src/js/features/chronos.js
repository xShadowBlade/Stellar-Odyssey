import eMath from "emath.js";
import Game from "../game.js";
const { E } = eMath;

Game.data.chronos = {
    currency: new eMath.classes.currency(),
    lastReward: E(0),
};

Game.static.chronos = {
    currency: new eMath.classes.currencyStatic(() => Game.data.chronos.currency),
};
// Daily Reward
Game.functions.claimDailyReward = (function () {
    const { chronos } = Game.data;
    return function (skipTime = false) {
        if (skipTime || chronos.lastReward.sub(Date.now()).mul(-1).gte(E(43200000))) { // 43200000 is 12 hours, checks if time elasped is greater
            chronos.lastReward = E(Date.now());
            return chronos.currency.gain();
        }
    };
})();