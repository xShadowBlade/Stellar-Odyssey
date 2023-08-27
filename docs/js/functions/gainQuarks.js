Game["functions"].gainQuarks = (function () {
    let quarks = Game.data.mass.currencies.quarks;
    return function () {
        quarks.value.add(quarks.boost.calculate());
    }
})();