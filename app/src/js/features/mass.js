import eMath from "emath.js";

import Game from "../game.js";

const { E } = eMath;

Game.get("data").quarks = {
    currency: new Game.classes.currency(),
    /**
     * Rate of regeneration
     * in x per second
    */
    regenRate: E(2),
    absorbRate: E(2),
    maxParticles: E(10),
};
Game.get("static").quarks = {
    currency: new Game.classes.currencyStatic(() => Game.get("data").quarks.currency),
    regenRate: new Game.classes.staticAttribute(2),
    absorbRate: new Game.classes.staticAttribute(2),
    maxParticles: new Game.classes.staticAttribute(10),
};
Game.get("static").quarks.currency.addUpgrade([
    {
        name: "Value",
        cost: E(5),
        costScaling: n => E.pow(1.2, E.scale(E(n), 1e6, 2, 0)).mul(10).ceil(),
        maxLevel: E(1000),
        effect: function () {
            console.log(this);
            const level = this.getLevel();

            Game.get("static").quarks.currency.boost.bSet(
                "valueUpg1Quarks",
                "Quarks Value - Quarks",
                "Quarks Value - Quarks",
                n => E(n).mul(E.floor(E.mul(0.5, level).mul(E.ln(level)).add(level))),
                2
            );
        },
    },
    {
        name: "Capacity",
        cost: E(25),
        costScaling: n => E.pow(1.3, E.scale(E(n), 1e6, 2, 0)).mul(10).ceil(),
        maxLevel: E(100),
        effect: function () {
            console.log(this);
            const level = this.getLevel();

            Game.get("static").quarks.maxParticles.update(function () {
                Game.get("static").quarks.maxParticles.boost.bSet(
                    "valueUpg2Quarks",
                    "Quarks Capacity - Quarks",
                    "Quarks Capacity - Quarks",
                    n => E(n).add(10).add(level),
                    1
                );
            });
        },
    },
    {
        name: "Regeneration",
        cost: E(100),
        costScaling: n => E.pow(1.5, E.scale(E(n), 1e6, 2, 0)).mul(10).ceil(),
        maxLevel: E(30),
        effect: function () {
            console.log(this);
            const level = this.getLevel();

            Game.get("static").quarks.regenRate.update(function () {
                Game.get("static").quarks.regenRate.boost.bSet(
                    "valueUpg3Quarks",
                    "Quarks Regeneration - Quarks",
                    "Quarks Regeneration - Quarks",
                    n => E(n).add(2).add(level.mul(0.5)),
                    1
                );
            });
        },
    },
    {
        name: "Speed",
        cost: E(1000),
        costScaling: n => E.pow(3, E.scale(E(n), 1e6, 2, 0)).mul(100).ceil(),
        maxLevel: E(5),
        effect: function () {

        },
    },
]);

// When pressing the massCollect key, check if collides
Game.get("keys").addKey("Collect Quarks", " ", function (dt) {
    if (Game.player.state == "idle") {
        for (let i = 0; i < Game.static.massParticles.length; i++) {
            const particle = Game.static.massParticles[i];

            // Check for collision between playerSprite and the current particle
            if (Game.player.sprite.collides(particle)) {
            // Collision detected
                Game.player.state = ["lockedToMass", particle];
                eventSystem.addEvent("massCollect", "timeout", E(1000).div(Game.get("data").quarks.absorbRate), function () {
                    Game.player.state = ["lockedToMassExit"];
                    console.log("gainMass");
                    const index = Game.static.massParticles.indexOf(particle);
                    Game.static.massParticles[index].remove();
                    Game.static.massParticles.splice(index, 1);
                    Game.get("static").quarks.currency.gain();
                    console.log(Game.data.quarks.currency.value.toString());
                });
                break;
            }
        }
    }
});