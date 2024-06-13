/**
 * @file Declares the quantum assembler feature (basically reactor grid)
 */
import { Grid, Decimal } from "emath.js";
import type { UpgradeInit } from "emath.js";
import { Expose, Type } from "class-transformer";
import Game from "../game";

interface QAGridCell {
    tier: Decimal;
}

interface QACellStaticSpawner {
    /** The type of the cell */
    type: string;

    /** The upgrade of the cell */
    upgrade: Readonly<Omit<UpgradeInit, "id">>;

    /** The image of the cell */
    image?: string;
}

/**
 * Represents a cell type in the quantum assembler grid
 */
class QACell {
    /** The type of the cell */
    @Expose()
    public type: string;

    /** The tier of the cell */
    @Type(() => Decimal)
    public tier: Decimal;

    constructor (type: string, tier: Decimal) {
        this.type = type;
        this.tier = tier;
    }
}

const cellTypes = [
    {
        type: "void",
        upgrade: {
            name: "Void",
            description: "Does nothing.",
            cost: (): Decimal => Decimal.dZero,
        },
        image: "void.png",
    },
] as const satisfies QACellStaticSpawner[];

const quantumAssemblerGrid = new Grid<QAGridCell>(5, 5, { tier: Decimal.dZero });
