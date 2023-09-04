/**
 * @file js/keybinds.js
 * @description
 * This JavaScript file defines and manages key bindings, tracks keyboard key states, 
 * and provides functionality for customizing user input handling within a game or application.
 *
 * @module keybinds
 */
(function () {
/**
 * Game keys manager for handling key bindings and tracking pressed keys.
 *
 * @namespace
 * @property {string[]} keysPressed - An array to track currently pressed keys.
 * @property {Object[]} binds - An array of key bindings, each specifying a name and associated key.
 */
Game["keys"] = {
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
        for (let i = 0; i < Game["keys"]["binds"].length; i++) {
            let current = Game["keys"]["binds"][i];
            // console.log(current);
            if (current.name == name) {
                return Game["keys"]["keysPressed"].includes(current.key);
            }
        }
    },

    /**
     * Adds or updates a key binding.
     *
     * @param {string} name - The name of the key binding.
     * @param {string} key - The key associated with the binding.
     * @example Game["keys"]["addKey"]("Move Up", "w");
     */
    addKey: function (name, key) {
        for (let i = 0; i < Game["keys"]["binds"].length; i++) {
            let current = Game["keys"]["binds"][i];
            // console.log(current);
            if (current.name == name) { 
                current.key = key;
                return;
            }
        }
        // else
        Game["keys"]["binds"].push(
            {
                name: name,
                key: key
            }
        )
    },
}

const logKey = function(key, type) {
    key = key.key;
    if (type && !Game["keys"]["keysPressed"].includes(key)) Game["keys"]["keysPressed"].push(key); else if (!type && Game["keys"]["keysPressed"].includes(key)) Game["keys"]["keysPressed"].splice(Game["keys"]["keysPressed"].indexOf(key), 1);
}
// Key event listeners
document.addEventListener('keydown', (e) => logKey(e, true));
document.addEventListener('keyup', (e) => logKey(e, false));
})();