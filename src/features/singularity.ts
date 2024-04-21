/**
 * @file Singularity / loop currency (at the very end) and related functions
 */
import { E, BoostsObjectInit } from "emath.js";
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
        // console.log("Singularity value", val.toString());
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

const defaultBoosts: BoostsObjectInit[] = [
    {
        name: "Singularity",
        id: "singularity1",
        description: () => singularity.value.lt(1) ? "Unknown" : `Singularity Boost: ${singularityBoost.multi.format()}`,
        value: (input: E) => input.mul(singularityBoost.multi),
        order: 2,
    },
];

/**
 * Settings for the singularity currency
 */
interface SCurrencySettings {
    /** Whether to use the default boosts */
    useDefaultBoosts?: boolean;
    /** Whether to have the currency gain in the ticker */
    ticker?: boolean;
}

/**
 * A currency that is affected by singularity and other default boosts
 */
class SCurrency<U extends string[] = string[], N extends string = string> {
    /** The currencies */
    public static currencies: SCurrency[] = [];

    /** The currency */
    public currency: GameCurrency<N, U>;

    /** The settings for the currency */
    public settings: SCurrencySettings;

    /**
     * Creates a new currency
     * @param name - The name of the currency
     * @param settings - The settings for the currency. See {@link SCurrencySettings}
     */
    constructor (name: N, settings?: SCurrencySettings) {
        this.currency = Game.addCurrency(name);
        this.settings = Object.assign({}, settings, {
            useDefaultBoosts: true,
            ticker: false,
        });
        SCurrency.currencies.push(this as SCurrency);

        if (this.settings.useDefaultBoosts) this.currency.static.boost.setBoost(defaultBoosts);
    }
}

export { SCurrency, singularity, singularityBoost };