/**
 * @fileoverview Defines the main game module.
 * @module game
 * @version 0.1.0
 */

import keys from "./keybinds";
import pixiGame from "./PIXI/pixiSetup";
import dataManagement from "./save";

type GameType = {
    // Imported
    // ./keybinds
    keys: typeof keys,

    // ./PIXI/pixiSetup
    PIXI: typeof pixiGame,

    // ./save
    dataManagement?: ReturnType<typeof dataManagement>,

    version: {
        saveAPI: number;
        phase: string;
        dev: boolean;
    };
    classes: Record<string, any>;
    data: Record<string, any>;
    functions: {
        start: Record<string, Function>;
        startF: () => void;
        loop: Record<string, Function>;
        loopF: (dt: number) => void;
    };
    static: Record<string, any>;
    settings: {
        framerate: number;
        c2: boolean;
    };
    features: Record<string, any>;
};

const Game: GameType = {
    // Imported
    keys,
    PIXI: pixiGame,
    dataManagement: dataManagement(() => Game),

    version: {
        saveAPI: 1,
        phase: "alpha",
        dev: true,
    },
    classes: {},
    data: {},
    functions: {
        start: {},
        startF: () => Object.values(Game.functions.start).forEach((item) => (item as Function)()),
        loop: {},
        loopF: (dt: number) => Object.values(Game.functions.loop).forEach((item) => (item as Function)(dt)),
    },
    static: {},
    settings: {
        framerate: 30,
        c2: false, // whether or not to display the "c^2" on formating eV
    },
    features: {},
};

console.log(Game);

if (Game.version.dev) (window as any)["Game"] = Game;

export default Game;