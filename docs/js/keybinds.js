import Game from ".././game.js";
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
     * @description Adds a keynind 
     * @param {string} name 
     * @param {string} key 
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