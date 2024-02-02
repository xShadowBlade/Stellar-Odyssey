/**
 * @file Genesis feature, the first reset layer
 */
import { E, boostsObjectInit, upgradeInit } from "emath.js";
import Game from "../game";
import { quarks } from "./mass";

const genesis = Game.addCurrency("genesis");

genesis.static.addUpgrade([
    {
        id: "valueUpg1Genesis",
        name: "Quarks Value",
        cost: n => E.pow(1.2, E.scale(E(n), 1e6, 2, 0)).mul(10).ceil(),
        maxLevel: E(1000),
        effect: function (level: E) {
            quarks.static.boost.setBoost(
                "valueUpg1Genesis",
                "Quarks Value - Genesis",
                "Quarks Value - Genesis",
                n => E(n).mul(E.floor(E.mul(0.5, level).mul(E.ln(level)).add(level))),
                2,
            );
        },
    },
] as upgradeInit[]);

const genesisReset = Game.addReset(quarks);

/**
 * Genesis pulse, the first reset
 * TODO: Make a formula, add conditions
 */
function genesisPulse () {
    genesis.static.boost.setBoost({
        id: "genesisBase",
        name: "Base",
        description: "Base boost",
        value: n => E(n).add(1), // TODO: Make a formula for this
        order: 1,
    } as boostsObjectInit);
    genesis.static.gain();
    genesisReset.reset(); // Resets quarks
}

export { genesis, genesisPulse };