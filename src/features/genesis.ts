/**
 * @file Genesis feature, the first reset layer
 */
import { E, boostsObjectInit, UpgradeInit } from "emath.js";
import Game from "../game";
import { SCurrency } from "./singularity";
import { quarks, quarksStatic } from "./mass";

// const genesis = Game.addCurrency("genesis");
/**
 * Genesis currency (layer 1)
 */
const genesis = new SCurrency("genesis");
const genesisStatic = genesis.currency.static;

genesisStatic.addUpgrade([
    {
        id: "valueUpg1Genesis",
        name: "Quarks Value",
        cost: n => E.pow(1.2, E.scale(E(n), 1e6, 2, 0)).mul(10).ceil(),
        maxLevel: E(1000),
        effect: function (level: E) {
            quarksStatic.boost.setBoost(
                "valueUpg1Genesis",
                "Quarks Value - Genesis",
                "Quarks Value - Genesis",
                n => E(n).mul(E.floor(E.mul(0.5, level).mul(E.ln(level)).add(level))),
                2,
            );
        },
    },
] as UpgradeInit[]);

const genesisReset = Game.addReset(quarks.currency);

/**
 * Genesis pulse, the first reset
 * TODO: Make a formula, add conditions
 */
function genesisPulse () {
    genesisStatic.boost.setBoost({
        id: "genesisBase",
        name: "Base",
        description: "Base boost",
        value: n => E(n).add(quarks.currency.value.pow(0.75).div(100)), // TODO: Make a formula for this
        order: 1,
    } as boostsObjectInit);
    genesisStatic.gain();
    genesisReset.reset(); // Resets quarks
}

export { genesis, genesisPulse };