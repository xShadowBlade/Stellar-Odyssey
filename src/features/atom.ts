/**
 * @file Genesis feature, the first reset layer
 */
import { E, BoostsObjectInit, UpgradeInit } from "emath.js";
import Game from "../game";
import { SCurrency } from "./singularity";
import { quarks, quarksStatic, mass } from "./quarks";

// const genesis = Game.addCurrency("genesis");
/**
 * Atoms currency (layer 1)
 */
const atoms = new SCurrency("atoms");
const atomsStatic = atoms.currency.static;

atomsStatic.addUpgrade([
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
 * Genesis pulse, the first reset.
 * Requires: Mass level 25 (~18e3 quarks)
 * TODO: Make a formula, add conditions
 */
function genesisPulse () {
    if (mass.level.current.lt(25)) return;
    atomsStatic.boost.setBoost({
        id: "genesisBase",
        name: "Base",
        description: "Base boost",
        value: n => E(n).add(quarks.currency.value.pow(0.75).div(100)), // TODO: Make a formula for this
        order: 1,
    } as BoostsObjectInit);
    atomsStatic.gain();
    genesisReset.reset(); // Resets quarks
}

export { atoms, genesisPulse };