/**
 * @file Genesis feature, the first reset layer
 */
import type { BoostsObjectInit, UpgradeInit } from "emath.js";
import { E } from "emath.js";
import Game from "../game";
import { SCurrency, defaultBoostObject } from "../lib/singularity";
import { quarks, quarksStatic, mass } from "./quarks";

// const genesis = Game.addCurrency("genesis");

const cosmicCellUpgrades = [
    {
        id: "unlockQuarksBoost",
        name: "Unlock Quarks Boost",
        get description (): string {
            const effect = E.formats.formatMult((quarksStatic.boost.getBoosts("cosmicCellBoost")[0] ?? defaultBoostObject).value(E(1)));
            return `Cosmic Cell - Multiplies the value of quarks by ${effect}`;
        },
        cost: (n): E => n.eq(1) ? E(10) : E.dInf,
    },
] as const satisfies UpgradeInit[];

const cosmicCell = new SCurrency("cosmicCell", cosmicCellUpgrades, {
    ticker: true,
    display: {
        name: "Cosmic Cells",
        description: "Accumulated energy from the cosmos",
        plural: "cosmic cells",
    },
});
const cosmicCellStatic = cosmicCell.currency.static;

quarksStatic.boost.setBoost({
    id: "cosmicCellBoost",
    name: "Cosmic Cell",
    value: n => cosmicCellStatic.getUpgrade("unlockQuarksBoost")?.level.eq(2) ? n.mul(cosmicCell.currency.value.add(1).ln().pow(0.85)) : n,
    order: 3,
});

const atomsUpgrades = [
    {
        id: "valueUpg1Genesis",
        name: "Quarks Value",
        description: (): string => {
            const effect = E.formats.formatMult((quarksStatic.boost.getBoosts("valueUpg1Genesis")[0] ?? defaultBoostObject).value(E(1)));
            return `Quarks Value - Multiplies the value of quarks by ${effect}`;
        },
        cost: (n): E => E.pow(1.1, E.scale(E(n), 1e6, 2, 0)).mul(10).ceil(),
        maxLevel: E(1000),
        effect: function (level: E): void {
            quarksStatic.boost.setBoost({
                id: "valueUpg1Genesis",
                name: "Quarks Value - Genesis",
                description: "Quarks Value - Genesis",
                value: (n): E => n.mul(E.floor(level.mul(level.sqrt().add(1).mul(2)).add(level))),
                order: 2,
            });
        },
    },
    {
        id: "unlockCosmicCell",
        name: "Cosmic Cell",
        description: "Unlocks the cosmic cell currency",
        cost: (n): E => n.eq(1) ? E(1e3) : E.dInf,
        // effect: function (level): void {
        //     // cosmicCellIsUnlocked.setValue(true);
        //     if (level.eq(2)) cosmicCellIsUnlocked.setValue(true);
        // },
    },
    {
        id: "quarksBoostSelf",
        name: "Quarks Boost Themselves",
        // description: "Quarks boost themselves",
        description: (): string => {
            const effect = E.formats.formatMult((quarksStatic.boost.getBoosts("quarksBoostSelf")[0] ?? defaultBoostObject).value(E(1)));
            return `Quarks Boost - Multiplies the value of quarks by ${effect}`;
        },
        cost: (n): E => n.eq(1) ? E(1e5) : E.dInf,
        effect: function (level): void {
            quarksStatic.boost.setBoost({
                id: "quarksBoostSelf",
                name: "Quarks ^2",
                value: n => level.eq(2) ? n.mul(quarksStatic.value.add(1).ln().add(1)) : n,
                order: 2,
            });
        },
    },
    {
        id: "powQuarks",
        name: "Quarks Power",
        description: (level): string => {
            // const effect = this.level?.div(10).add(1).format();
            const effect = level.sub(1).div(10).add(1).format();
            return `Quarks Power - Increases the value of quarks by ^${effect}`;
        },
        cost: (n): E => n.mul(5).pow(10),
        effect: function (level): void {
            quarksStatic.boost.setBoost({
                id: "powQuarks",
                name: "Quarks Power",
                value: n => n.pow(level.sub(1).div(10).add(1)),
                order: 3,
            });
        },
    },
] as const satisfies UpgradeInit[];

/**
 * Atoms currency (layer 1)
 */
const atoms = new SCurrency("atoms", atomsUpgrades, {
    display: {
        name: "Atoms",
        description: "The first reset layer",
        plural: "atoms",
    },
});
const atomsStatic = atoms.currency.static;

atomsStatic.boost.setBoost({
    id: "genesisBase",
    name: "Base",
    description: "Base boost",
    value: n => E(n).sub(1).add(quarks.currency.value.pow(0.75).div(100)), // TODO: Make a formula for this
    order: 1,
} as BoostsObjectInit);

cosmicCellStatic.boost.setBoost({
    id: "isUnlocked",
    name: "Unlock",
    value: (): E => atomsStatic.getUpgrade("unlockCosmicCell")?.level.eq(2) ? E(1) : E(0),
    order: 0,
});

// const genesisReset = Game.addReset(quarks.currency, [], (): void => {
//     atomsStatic.gain();
// }, () => mass.level.current.gte(25));

const genesisReset = Game.addResetFromObject({
    currenciesToReset: [quarks.currency],
    onReset: (): void => {
        atomsStatic.gain();
    },
    condition: (): boolean => mass.level.current.gte(25),
});

export { atoms, cosmicCell, genesisReset };
