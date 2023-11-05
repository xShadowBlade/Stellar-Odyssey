/**
 * @fileoverview Defines the main game module.
 * @module game
 * @version 0.1.0
 */

import keys from "./keybinds";
import pixiGame from "./PIXI/pixiSetup";
// import dataManagement from "./save";

import { E, currency, currencyStatic, attribute } from "emath.js";

console.log("test: ", E, currency);
// import spriteFunction from "./PIXI/sprite";

type GameType = {
    dataManagement?: { resetData: (reload?: boolean) => void; compileData: (data?: object) => string; decompileData: (data?: string | null) => object | null; saveData: () => void; exportData: () => void; loadData: () => void; };
    player: { sprite: any; acceleration: number; velocity: { x: number; y: number; }; restoringForce: number; friction: number; position: { x: number; y: number; _x: number; _y: number; }; state: any[]; };
    // Imported
    // ./keybinds
    keys: typeof keys,

    // ./PIXI/pixiSetup
    PIXI: typeof pixiGame,

    // ./save
    // dataManagement?:,

    camera: {
        x: number;
        y: number;
        smoothDamp: number;
    }

    version: {
        saveAPI: number;
        phase: string;
        dev: boolean;
    };
    // classes: {
    //     sprite: ReturnType<typeof spriteFunction>;
    // };
    data: {
        playtime: { // in milliseconds
            tActive: currency,
            tPassive: currency,
            timewarp: E,
            active: currency,
            passive: currency,
            points: currency,
            timeLastPlayed: E,
        };
        quarks: {
            currency: currency,
            regenRate: E,
            absorbRate: E,
            maxParticles: E,
        };
        chronos: {
            currency: currency,
            lastReward: E,
        }
    };
    static: {
        massParticles: any[];
        playtime: { // in milliseconds
            tActive: currencyStatic,
            tPassive: currencyStatic,
            active: currencyStatic,
            passive: currencyStatic,
            points: currencyStatic,
        },
        quarks: {
            currency: currencyStatic,
            regenRate: attribute,
            absorbRate: attribute,
            maxParticles: attribute,
        }
        chronos: {
            currency: currencyStatic,
        }
    };
    functions: {
        timewarp: (t: number | string | E) => E;
        claimDailyReward: (skipTime?: boolean) => boolean;
        updateCamera: (dt: number) => void;

        start: Record<string, Function>;
        startF: () => void;
        loop: Record<string, Function>;
        loopF: (dt: number) => void;
    };
    settings: {
        framerate: number;
        c2: boolean;
        clickToMove: boolean;
    };
    features: {};
};

const Game: GameType = {
    // Imported
    keys,
    PIXI: pixiGame,

    camera: {
        x: 0,
        y: 0,
        smoothDamp: 0.15,
    },
    player: {
        sprite: null,
        acceleration: 0.2,
        velocity: { x: 0, y: 0 },
        restoringForce: 0.005,
        friction: 0.95,
        position: {
            x: 0,
            y: 0,
            _x: 0,
            _y: 0,
        },
        /**
         * Possible states:
         * - ["idle"]
         * - ["lockedToMass", ${particle}]
         * - ["lockedToMassExit"]
         */
        state: ["idle"],
    },

    version: {
        saveAPI: 1,
        phase: "alpha",
        dev: true,
    },
    // classes: {
    //     sprite: spriteFunction(() => Game),
    // },
    data: {
        playtime: { // in milliseconds
            tActive: new currency(),
            tPassive: new currency(),
            timewarp: E(),
            active: new currency(),
            passive: new currency(),
            points: new currency(),
            timeLastPlayed: E(),
        },
        quarks: {
            currency: new currency(),
            /**
             * Rate of regeneration
             * in x per second
            */
            regenRate: E(2),
            absorbRate: E(2),
            maxParticles: E(10),
        },
        chronos: {
            currency: new currency(),
            lastReward: E(0),
        },
    },
    static: {
        massParticles: [],
        playtime: { // in milliseconds
            tActive: new currencyStatic(() => Game["data"].playtime.tActive),
            tPassive: new currencyStatic(() => Game["data"].playtime.tPassive),
            active: new currencyStatic(() => Game["data"].playtime.active),
            passive: new currencyStatic(() => Game["data"].playtime.passive),
            points: new currencyStatic(() => Game["data"].playtime.points),
        },
        quarks: {
            currency: new currencyStatic(() => Game.data.quarks.currency),
            regenRate: new attribute(2),
            absorbRate: new attribute(2),
            maxParticles: new attribute(10),
        },
        chronos: {
            currency: new currencyStatic(() => Game.data.chronos.currency),
        },
    },
    functions: {
        start: {},
        startF: () => Object.values(Game.functions.start).forEach((item) => (item as Function)()),
        loop: {},
        loopF: (dt: number) => Object.values(Game.functions.loop).forEach((item) => (item as Function)(dt)),

        timewarp: (t: number | string | E) => Game["data"].playtime.timewarp = E(t),
        claimDailyReward: function (skipTime: boolean = false): boolean {
            if (skipTime || Game.data.chronos.lastReward.sub(Date.now()).mul(-1).gte(E(43_200_000))) { // 43,200,000 is 12 hours, checks if time elasped is greater
                Game.data.chronos.lastReward = E(Date.now());
                Game.static.chronos.currency.gain();
                return true;
            } else return false;
        },
        updateCamera: function (dt: number) {
            Game.camera.x = E.smoothDamp(Game.camera.x, Game.player.position.x, Game.camera.smoothDamp, dt).toNumber();
            Game.camera.y = E.smoothDamp(Game.camera.y, Game.player.position.y, Game.camera.smoothDamp, dt).toNumber();
        },
    },
    settings: {
        framerate: 30,
        c2: false, // whether or not to display the "c^2" on formating eV
        clickToMove: false,
    },
    features: {},
};

console.log(Game);

if (Game.version.dev) (window as any)["Game"] = Game;

export default Game;