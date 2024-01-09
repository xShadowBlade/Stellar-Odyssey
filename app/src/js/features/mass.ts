import { E, upgradeInit } from "emath.js";
import Game from "../game";
import { player } from "../PIXI/player";
import { massParticles, spawnStaticCircles } from "../PIXI/massParticles";

const quarks = Game.addCurrency("quarks");
const regenRate = Game.addAttribute("regenRate", true, 2);
const absorbRate = Game.addAttribute("absorbRate", true, 2);
const maxParticles = Game.addAttribute("maxParticles", true, 10);

quarks.static.addUpgrade([
    {
        name: "Value",
        // cost: E(5),
        costScaling: n => E.pow(1.2, E.scale(E(n), 1e6, 2, 0)).mul(10).ceil(),
        maxLevel: E(1000),
        effect: function (level: E) {
            quarks.static.boost.setBoost(
                "valueUpg1Quarks",
                "Quarks Value - Quarks",
                "Quarks Value - Quarks",
                n => E(n).mul(E.floor(E.mul(0.5, level).mul(E.ln(level)).add(level))),
                2,
            );
        },
    },
    {
        name: "Capacity",
        // cost: E(25),
        costScaling: n => E.pow(1.3, E.scale(E(n), 1e6, 2, 0)).mul(10).ceil(),
        maxLevel: E(100),
        effect: function (level: E) {
            // maxParticles.update();
            maxParticles.static.boost.setBoost(
                "valueUpg2Quarks",
                "Quarks Capacity - Quarks",
                "Quarks Capacity - Quarks",
                n => E(n).add(10).add(level),
                1,
            );
        },
    },
    {
        name: "Regeneration",
        // cost: E(100),
        costScaling: n => E.pow(1.5, E.scale(E(n), 1e6, 2, 0)).mul(10).ceil(),
        maxLevel: E(30),
        effect: function (level: E) {
            regenRate.static.boost.setBoost(
                "valueUpg3Quarks",
                "Quarks Regeneration - Quarks",
                "Quarks Regeneration - Quarks",
                n => E(n).add(2).add(level.mul(0.5)),
                1,
            );
        },
    },
    {
        name: "Speed",
        // cost: E(1000),
        costScaling: n => E.pow(3, E.scale(E(n), 1e6, 2, 0)).mul(100).ceil(),
        maxLevel: E(5),
        effect: function (level: E) {
            // Placeholder
        },
    },
] as upgradeInit[]);

/**
 * Spawn a mass particle
 */
Game.eventManager.addEvent("Mass Spawn", "interval", E(1000).div(regenRate.value), () => {
    if (maxParticles.value.gt(massParticles.length)) spawnStaticCircles();
});

// When pressing the massCollect key, check if collides
Game.keyManager.addKey("Collect Quarks", " ", function () {
    if (player.state[0] === "idle") {
        for (let i = 0; i < massParticles.length; i++) {
            const particle = massParticles[i];

            // Check for collision between playerSprite and the current particle
            if (player.sprite.collides(particle)) {
            // Collision detected
                player.state = ["lockedToMass", particle];
                Game.eventManager.addEvent("massCollect", "timeout", E(1000).div(absorbRate.value.toString()), function () {
                    player.state = ["lockedToMassExit"];
                    console.log("gainMass");
                    const index = massParticles.indexOf(particle);
                    massParticles[index].remove(massParticles);
                    massParticles.splice(index, 1);
                    quarks.static.gain();
                    console.log(quarks.static.value.format());
                });
                break;
            }
        }
    }
});

export { quarks, regenRate, absorbRate, maxParticles };