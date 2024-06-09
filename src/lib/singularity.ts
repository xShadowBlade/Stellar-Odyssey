/**
 * @file Singularity / loop currency (at the very end) and related functions
 */
import type { E, BoostObject } from "emath.js";
import type { UpgradeInit, BoostsObjectInit } from "emath.js";
import type { GameCurrency} from "emath.js/game";
import { ConfigManager } from "emath.js/game";
import type { RequiredDeep } from "emath.js/game";
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
    get multi (): E {
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
gravitionalCollapse.onReset = (): void => {
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
    display?: {
        /** The name of the currency, for headers */
        name?: string;
        /** The description of the currency */
        description?: string;
        /** The name of the currency, for display in small text */
        plural?: string;
    };
}

const defaultSCurrencySettings: RequiredDeep<SCurrencySettings> = {
    useDefaultBoosts: true,
    ticker: false,
    display: {
        name: "Currency",
        description: "Currency",
        plural: "currencies",
    },
};

/**
 * A currency that is affected by singularity and other default boosts
 */
class SCurrency<N extends string = string, U extends UpgradeInit[] = []> {
    /** The config manager for the currency */
    private static readonly configManager = new ConfigManager(defaultSCurrencySettings);

    /** The currencies */
    public static readonly currencies: SCurrency[] = [];

    /** The currency */
    public readonly currency: GameCurrency<N, U>;

    /** The settings for the currency */
    public readonly config: typeof SCurrency.configManager.options;

    /**
     * Creates a new currency
     * @param name - The name of the currency
     * @param upgrades
     * @param config - The settings for the currency. See {@link SCurrencySettings}
     */
    constructor (name: N, upgrades?: U, config?: Partial<SCurrencySettings>) {
        this.currency = Game.addCurrency<N, U>(name, upgrades);
        this.config = SCurrency.configManager.parse(config);
        SCurrency.currencies.push(this as SCurrency);

        if (this.config.useDefaultBoosts) this.currency.static.boost.setBoost(defaultBoosts);
        if (this.config.ticker) {
            Game.eventManager.setEvent(`ticker-${name}`, "interval", 0, (dt) => {
                this.currency.static.gain(dt);
            });
        }
    }
}

const defaultBoostObject: BoostObject = {
    id: "defaultBoost",
    name: "Default Boost",
    description: "Default Boost",
    descriptionFn: () => "Default Boost",
    desc: "Default Boost",
    value: (n: E): E => n,
    order: 1,
};

export { SCurrency, singularity, singularityBoost, defaultBoostObject };
