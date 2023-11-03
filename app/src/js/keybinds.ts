/**
 * @file js/keybinds
 * @description
 * This TypeScript file defines and manages key bindings, tracks keyboard key states,
 * and provides functionality for customizing user input handling within a game or application.
 *
 * @module keybinds
 */

interface KeyBinding {
    name: string;
    key: string;
    fn?: (dt?: number) => void;
}

/**
 * Game keys manager for handling key bindings and tracking pressed keys.
 *
 * @namespace
 * @property {string[]} keysPressed - An array to track currently pressed keys.
 * @property {KeyBinding[]} binds - An array of key bindings, each specifying a name and associated key.
 */
const keys = {
    keysPressed: [] as string[],
    binds: [
        // case sensitive
        /* example
        {
            name: "moveUp",
            key: "w"
        },
        (...)
        */
    ] as KeyBinding[],

    /**
     * Checks if a specific key binding is currently being pressed.
     *
     * @param {string} name - The name of the key binding to check.
     * @returns {boolean} True if the key binding is being pressed, otherwise false.
     */
    isPressing (name: string): boolean {
        for (let i = 0; i < keys.binds.length; i++) {
            const current = keys.binds[i];
            // console.log(current);
            if (current.name === name) {
                return keys.keysPressed.includes(current.key);
            }
        }
        return false;
    },

    /**
     * Adds or updates a key binding.
     *
     * @param {string} name - The name of the key binding.
     * @param {string} key - The key associated with the binding.
     * @param {function} [fn] - The function executed when the binding is pressed
     * @example addKey("Move Up", "w", () => Game.player.velocity.y -= Game.player.acceleration);
     */
    addKey (name: string, key: string, fn?: (dt?: number) => void): void {
        for (let i = 0; i < keys.binds.length; i++) {
            const current = keys.binds[i];
            // console.log(current);
            if (current.name === name) {
                current.key = key;
                return;
            }
        }
        // if not found (new keybind entirely)
        keys.binds.push({ name, key, fn });
        if (typeof fn == "function") {
            // @ts-ignore
            PIXI.app.ticker.add((dt: number) => {
                // @ts-ignore
                if (keys.isPressing(name)) fn(dt);
            });
        }
    },
    /**
     * Adds or updates multiple key bindings.
     *
     * @param {KeyBinding[]} keysToAdd - An array of key binding objects.
     * @example
     * addKeys([
     *     { name: "Move Up", key: "w", fn: () => Game.player.velocity.y -= Game.player.acceleration },
     *     // Add more key bindings here...
     * ]);
     */
    addKeys (keysToAdd: KeyBinding[]): void {
        for (const keyBinding of keysToAdd) {
            this.addKey(keyBinding.name, keyBinding.key, keyBinding.fn);
        }
    },
};

const logKey = function (event: KeyboardEvent, type: boolean): void {
    const key = event.key;
    if (type && !keys.keysPressed.includes(key)) keys.keysPressed.push(key); else if (!type && keys.keysPressed.includes(key)) keys.keysPressed.splice(keys.keysPressed.indexOf(key), 1);
};
// Key event listeners
document.addEventListener("keydown", (e) => logKey(e, true));
document.addEventListener("keyup", (e) => logKey(e, false));

keys.addKey("Debug - Reload", "`", () => window.location.reload());

export default keys;
