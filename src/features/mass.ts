/**
 * @file Mass (quarks) currency and related functions
 */
import { E, UpgradeInit } from "emath.js";
import Game from "../game";
import { SCurrency } from "./singularity";
import { player } from "../PIXI/player";
import { massParticles, spawnStaticCircles } from "../PIXI/massParticles";

// const quarks = Game.addCurrency("quarks");
/**
 * Quarks currency (layer 0)
 */
const quarks = new SCurrency("quarks");
const quarksStatic = quarks.currency.static;

const regenRate = Game.addAttribute("regenRate", true, 1);
const absorbRate = Game.addAttribute("absorbRate", true, 2);
const maxParticles = Game.addAttribute("maxParticles", true, 5);

quarksStatic.addUpgrade([
    {
        id: "upg1Quarks",
        name: "Value",
        // cost: E(5),
        cost: n => E.pow(1.2, E.scale(E(n), 1e6, 2, 0)).mul(10).ceil(),
        maxLevel: E(1000),
        effect: function (level: E) {
            // quarksStatic.boost.setBoost(
            //     "upg1Quarks",
            //     "Quarks Value - Quarks",
            //     "Quarks Value - Quarks",
            //     n => E(n).mul(E.floor(E.mul(0.5, level).mul(E.ln(level)).add(level))),
            //     2,
            // );
            quarksStatic.boost.setBoost({
                id: "upg1Quarks",
                name: "Quarks Value - Quarks",
                description: "Quarks Value - Quarks",
                value: n => E(n).mul(E.floor(E.mul(0.5, level).mul(E.ln(level)).add(level))),
                order: 2,
            });
        },
    },
    {
        id: "upg2Quarks",
        name: "Capacity",
        // cost: E(25),
        cost: n => E.pow(1.3, E.scale(E(n), 1e6, 2, 0)).mul(10).ceil(),
        maxLevel: E(100),
        effect: function (level: E) {
            // maxParticles.update();
            // maxParticles.static.boost?.setBoost(
            //     "upg2Quarks",
            //     "Quarks Capacity - Quarks",
            //     "Quarks Capacity - Quarks",
            //     n => E(n).add(level.sub(1).mul(2)),
            //     1,
            // );
            maxParticles.static.boost?.setBoost({
                id: "upg2Quarks",
                name: "Quarks Capacity - Quarks",
                description: "Quarks Capacity - Quarks",
                value: n => E(n).add(level.sub(1).mul(2)),
                order: 1,
            });
        },
    },
    {
        id: "upg3Quarks",
        name: "Regeneration",
        // cost: E(100),
        cost: n => E.pow(1.5, E.scale(E(n), 1e6, 2, 0)).mul(10).ceil(),
        maxLevel: E(30),
        effect: function (level: E) {
            // regenRate.static.boost?.setBoost(
            //     "upg3Quarks",
            //     "Quarks Regeneration - Quarks",
            //     "Quarks Regeneration - Quarks",
            //     n => E(n).add(2).add(level.mul(0.5)),
            //     1,
            // );
            regenRate.static.boost?.setBoost({
                id: "upg3Quarks",
                name: "Quarks Regeneration - Quarks",
                description: "Quarks Regeneration - Quarks",
                value: n => E(n).add(2).add(level.mul(0.5)),
                order: 1,
            });
        },
    },
    {
        id: "upg4Quarks",
        name: "Speed",
        // cost: E(1000),
        cost: n => E.pow(3, E.scale(E(n), 1e6, 2, 0)).mul(100).ceil(),
        maxLevel: E(5),
        effect: function (level: E) {
            // Placeholder
        },
    },
] as UpgradeInit[]);

const mass = {
    /**
     * @returns - the current level, progress to next level, and the requirement for the next level
     */
    get level () {
        const V = quarksStatic.value;
        // If n >= 1000 it is 1.35^(n^2 / 1000) * 10 otherwise it is 1.35^n * 10
        const levelRequirementFormula = (n: E) => E.pow(1.35, E.scale(n, 1e3, 2, 0)).mul(10).ceil();
        // Create a formula that finds the max level such that V < levelRequirementFormula(level)
        const level = V.lt(levelRequirementFormula(E(1))) ? E(0) :
            V.lt(levelRequirementFormula(E(1000))) ?
                // \frac{\ln\left(\frac{x}{10}\right)}{\ln1.35}
                V.div(10).ln().div(E.ln(1.35)).floor() :
                // \frac{\left(10\sqrt{10}\cdot\sqrt{\ln\left(\frac{x}{10}\right)}\right)}{\sqrt{\ln\left(1.35\right)}}
                E(10).mul(E.sqrt(10)).mul(E.sqrt(V.div(10).ln())).div(E.sqrt(E.ln(1.35))).floor();
        const nextRequirement = levelRequirementFormula(level.add(1));
        return {
            current: level,
            nextRequirement,
        };
    },
};
(window as any).mass = mass;

/**
 * Spawn a mass particle
 */
Game.eventManager.setEvent("Mass Spawn", "interval", E(1000).div(regenRate.value), () => {
    if (maxParticles.value.gt(massParticles.length)) {
        // console.log(maxParticles.value, massParticles.length);
        spawnStaticCircles();
    }
});

// When pressing the massCollect key, check if collides
Game.keyManager.addKey("Collect Quarks", " ", function () {
    if (player.state[0] === "idle") {
        for (let i = 0; i < massParticles.length; i++) {
            const particle = massParticles[i];

            // Check for collision between playerSprite and the current particle
            if (player.sprite.collides(particle)) {
                // console.log(massParticles.length);
                // Collision detected
                player.state = ["lockedToMass", particle];
                Game.eventManager.setEvent("massCollect", "timeout", E(1000).div(absorbRate.value), function () {
                    player.state = ["lockedToMassExit"];
                    console.log("gainMass");
                    // const index = massParticles.indexOf(particle);
                    massParticles[i].remove();
                    massParticles.splice(i, 1);
                    quarksStatic.gain();
                    console.log(quarksStatic.value.format());
                });
                break;
            }
        }
    }
});

export { quarks, regenRate, absorbRate, maxParticles, quarksStatic };