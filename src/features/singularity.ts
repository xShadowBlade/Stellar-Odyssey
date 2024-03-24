/**
 * @file Singularity / loop currency (at the very end) and related functions
 */
import { E, boostsObjectInit } from "emath.js";
import { GameCurrency } from "emath.js/game";
import Game from "../game";

/**
 * Singularity / loop currency. This is the final currency in the game. It resets EVERYTHING, but also boosts everything.
 * Not like a traditional reset layer, but more like a new game plus.
 */
const singularity = Game.addCurrency("singularity");

// const singularityBoost = Game.dataManager.setData("singularityBoost", E(1));
/** The boost(s) from singularity */
const singularityBoost = {
    /** @returns The value of the multiplier boost */
    get multi () {
        const val = singularity.value;
        // return singularity.value.pow(2);
        // const effect = singularity.value.add(1).pow(2);
        // const effect = E.pow(2, singularity.value);
        const effect = val.pow(1.5).floor().add(1);
        return effect;
    },
};

const gravitionalCollapse = Game.addReset(singularity); // TODO: add extenders (singularity is not actually reset)
gravitionalCollapse.onReset = () => {
    console.log("Singularity reset");
    singularity.static.gain();
};

const defaultBoosts: boostsObjectInit[] = [
    {
        name: "Singularity",
        id: "singularity1",
        description: () => singularity.value.lt(1) ? "Unknown" : `Singularity Boost: ${singularityBoost.multi.format()}`,
        value: (input: E) => input.mul(singularityBoost.multi),
        order: 2,
    },
];

interface SCurrencySettings {
    useDefaultBoosts?: boolean;
}

/**
 * A currency that is affected by singularity and other default boosts
 */
class SCurrency<N extends string> {
    public currency: GameCurrency<N>;
    constructor (name: N, settings?: SCurrencySettings) {
        this.currency = Game.addCurrency(name);
        if (settings?.useDefaultBoosts) this.currency.static.boost.setBoost(defaultBoosts);
    }
}

export { SCurrency, singularity, singularityBoost };