/**
 * @file js/keybinds.js
 * @description
 * This JavaScript file defines and manages key bindings, tracks keyboard key states,
 * and provides functionality for customizing user input handling within a game or application.
 *
 * @module keybinds
 */
"use strict";
/**
 * Keys manager for handling key bindings and tracking pressed keys.
 *
 * @namespace
 * @property {string[]} keysPressed - An array to track currently pressed keys.
 * @property {Object[]} binds - An array of key bindings, each specifying a name and associated key.
 */
const keys = {
    keysPressed: [],
    binds: [
        // case sensitive
        /* example
        {
            name: "moveUp",
            key: "w"
        },
        (...)
        */
    ],

    /**
     * Checks if a specific key binding is currently being pressed.
     *
     * @param {string} name - The name of the key binding to check.
     * @returns {boolean} True if the key binding is being pressed, otherwise false.
     */
    isPressing: function (name) {
        for (let i = 0; i < this["binds"].length; i++) {
            const current = this["binds"][i];
            // console.log(current);
            if (current.name == name) return this["keysPressed"].includes(current.key);
        }
    },

    /**
     * Adds or updates a key binding.
     *
     * @param {string} name - The name of the key binding.
     * @param {string} key - The key associated with the binding.
     * @param {function} [fn] - The function executed when the binding is pressed
     * @example addKey("Move Up", "w", () => this.player.velocity.y -= this.player.acceleration);
     */
    addKey: function (name, key, fn) {
        for (let i = 0; i < this["binds"].length; i++) {
            const current = this["binds"][i];
            // console.log(current);
            if (current.name == name) {
                current.key = key;
                return;
            }
        }
        // if not found (new keybind entirely)
        this["binds"].push({ name, key, fn });
        if (typeof fn == "function")
            this.PIXI.app.ticker.add((dt) => {
                if (this["isPressing"](name)) fn(dt);
            });

    },
    /**
     * Adds or updates multiple key bindings.
     *
     * @param {Array} keysb - An array of key binding objects.
     * @example
     * addKeys([
     *     { name: "Move Up", key: "w", fn: () => this.player.velocity.y -= this.player.acceleration },
     *     // Add more key bindings here...
     * ]);
     */
    addKeys: function (keysb) {
        for (const keyBinding of keysb)
            this.addKey(keyBinding.name, keyBinding.key, keyBinding.fn);

    },
};

const logKey = function (key, type) {
    key = key.key;
    if (type && !this["keysPressed"].includes(key)) this["keysPressed"].push(key); else if (!type && this["keysPressed"].includes(key)) this["keysPressed"].splice(this["keysPressed"].indexOf(key), 1);
};
// Key event listeners
window.document.addEventListener("keydown", (e) => logKey(e, true));
window.document.addEventListener("keyup", (e) => logKey(e, false));

this.keys.addKey("Debug - Reload", "`", () => window.location.reload());

export default keys;