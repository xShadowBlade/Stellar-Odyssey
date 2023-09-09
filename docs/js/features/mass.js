(function () {
Game["data"].quarks = {
    currency: new Game.classes.currency(),
    /** 
     * Rate of regeneration
     * in x per second
    */
    regenRate: E(2),
    absorbRate: E(2),
    maxParticles: E(10),
}
Game["static"].quarks = {
    currency: new Game.classes.currencyStatic(() => Game["data"].quarks.currency),
}
Game["static"].quarks.currency.addUpgrade([
    {
        name: "Value",
        cost: E(5),
        costScaling: n => Decimal.pow(1.2,scale(E(n),1e6,2,0)).mul(10).ceil(),
        maxLevel: E(1000),
        effect: function () {
            const { level } = this;
            Game["static"].quarks.currency.boost.bSet(
                "valueUpg1Quarks",
                "Quarks Value - Quarks",
                "Quarks Value - Quarks",
                n => E(n).mul(level),
                2
            );
        }
    },
    {
        name: "Capacity",
        cost: E(25),
        costScaling: n => Decimal.pow(1.3,scale(E(n),1e6,2,0)).mul(10).ceil(),
        maxLevel: E(100),
        effect: function (level) {
            
        }
    },
    {
        name: "Regeneration",
        cost: E(100),
        costScaling: n => Decimal.pow(1.5,scale(E(n),1e6,2,0)).mul(10).ceil(),
        maxLevel: E(30),
        effect: function (level) {
            
        }
    },
    {
        name: "Speed",
        cost: E(1000),
        costScaling: n => Decimal.pow(3,scale(E(n),1e6,2,0)).mul(100).ceil(),
        maxLevel: E(5),
        effect: function (level) {
            
        }
    },
])

// When pressing the massCollect key, check if collides
Game.keys.addKey("Collect Quarks", " ", function (dt) {
    if (Game.player.state == "idle") {
        for (let i = 0; i < Game.static.massParticles.length; i++) {
            const particle = Game.static.massParticles[i];

            // Check for collision between playerSprite and the current particle
            if (Game.player.sprite.collides(particle)) {
                // Collision detected
                Game.player.state = ["lockedToMass", particle];
                eventSystem.addEvent("massCollect", "timeout", E(1000).div(Game["data"].quarks.absorbRate), function () {
                    Game.player.state = ["lockedToMassExit"];
                    console.log("gainMass");
                    const index = Game.static.massParticles.indexOf(particle);
                    Game.static.massParticles[index].remove();
                    Game.static.massParticles.splice(index, 1);
                    Game["static"].quarks.currency.gain();
                    console.log(Game.data.quarks.currency.value.toString());
                });
                break;
            }
        }
    }
});
})();