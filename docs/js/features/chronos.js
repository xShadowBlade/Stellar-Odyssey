Game.data.chronos = {
    value: E(0),
    boost: new Game.classes.boost(100),
    lastReward: E(0),
}
//Daily Reward
Game.functions.claimDailyReward = (function () {
    let { chronos } = Game.data;
    return function (skipTime = false) {
        if (skipTime || chronos.lastReward.sub(Date.now()).mul(-1).gte(E(43200000))) { // 43200000 is 12 hours
            chronos.lastReward = E(Date.now());
            return chronos.value = chronos.value.add(chronos.boost.calculate());
        }
    }
})()