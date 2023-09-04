/**
 * Represents a boost manager that applies various effects to a base value.
 *
 * @class
 * @param {number|Decimal} baseEffect - The base effect value to which boosts are applied.
 * @param {...Object} boosts - An array of boost objects to initialize with.
 * @example
 * const myBoost = new Game.classes.boost(100, {
 *   id: "reallyCoolBoost124",
 *   name: "buff this",
 *   desc: "really cool lol",
 *   type: "add",
 *   value: E(124),
 * });
 */
Game.classes.boost = class {
    /**
     * Constructs a new boost manager.
     *
     * @constructor
     * @param {number} baseEffect - The base effect value to which boosts are applied.
     * @param {...Object} boosts - An array of boost objects to initialize with.
     */
    constructor(baseEffect, ...boosts) {
        /**
         * An array of boost objects.
         * @type {Object[]}
         */
        this.boost = boosts;

        /**
         * The base effect value.
         * @type {Decimal}
         */
        this.baseEffect = E(baseEffect);
    };

     /**
     * Gets a boost object by its ID.
     *
     * @param {string} id - The ID of the boost to retrieve.
     * @returns {Object|null} The boost object if found, or null if not found.
     */
    bGet(id) {
        let output = null;
        for (i = 0; i < this.boost.length; i++) {
            if (i == this.boost.length) break;
            if (id == this.boost[i].id) { 
                output = this.boost[i];
                output["index"] = i;
            }
        }
        return output;
    };

    /**
     * Removes a boost by its ID.
     *
     * @param {string} id - The ID of the boost to remove.
     */
    bRemove(id) { delete this.bGet(id) }

    /**
     * Sets or updates a boost with the given parameters.
     *
     * @param {string} id - The ID of the boost.
     * @param {string} name - The name of the boost.
     * @param {string} desc - The description of the boost.
     * @param {string} type - The type of the boost.
     * @param {number} value - The value of the boost.
     */
    bSet(id, name, desc, type, value) {
        let bCheck = this.bGet(id);
        if (!bCheck) {
            this.boost.push({
                "id": id,
                "name": name,
                "desc": desc,
                "type": type,
                "value": value,
            });
        } else {
            bCheck = {
                "id": id,
                "name": name,
                "desc": desc,
                "type": type,
                "value": value,
            }
        }
    };

    /**
     * Sets or updates multiple boosts with advanced parameters.
     *
     * @param {...Object} x - Boost objects to set or update.
     */
    bSetAdvanced(...x) {
        for (i = 0; i < x.length; i++) {
            if (!this.bGet(x[i].id)) {
                this.boost = this.boost.concat(x[i]);
            } else {
                console.log(i);
                this.boost[this.bGet(x[i].id).index] = x[i]
            }
        }
        
    };

    /**
     * Calculates the cumulative effect of all boosts on the base effect.
     *
     * @param {number|Decimal} [base=this.baseEffect] - The base effect value to calculate with.
     * @returns {Decimal} The calculated effect after applying boosts.
     */
    calculate(base = this.baseEffect) {
        let output = E(base);
        let listOfBoosts = [ //also in the order that they will be applied
            {
                name: ["add", "plus"],
                value: (x1, x2) => E(x1).plus(E(x2)),
            },
            {
                name: ["sub", "subtract", "minus"],
                value: (x1, x2) => E(x1).minus(E(x2)),
            },
            {
                name: ["mul", "multiply", "times"],
                value: (x1, x2) => E(x1).times(E(x2)),
            },
            {
                name: ["div", "divide", "over", "divided", "divide by", "divided by"],
                value: (x1, x2) => E(x1).divide(E(x2)),
            },
            {
                name: ["pow", "power", "exp", "exponent", "exponentiate"],
                value: (x1, x2) => E(x1).pow(E(x2)),
            },
            {
                name: ["log", "logarithm"],
                value: (x1, x2) => E(x1).log(E(x2)),
            },
            {
                name: ["tetr", "tetrate"],
                value: (x1, x2) => E(x1).tetrate(E(x2)),
            },
            {
                name: ["slog"],
                value: (x1, x2) => E(x1).slog(E(x2)),
            },
            {
                name: ["pent", "pentate"],
                value: (x1, x2) => E(x1).pentate(E(x2)),
            }
        ];
        for (let i = 0; i < listOfBoosts.length; i++) { //iterate through the array and add the "item" property
            listOfBoosts[i] = Object.assign(listOfBoosts[i], {
                items: [],
            });
        }
        this.boost.forEach((item) => { //sort it
            for(i = 0; i < listOfBoosts.length; i++) { //compare each entry
                for(let j = 0; j < listOfBoosts[i].name.length; j++) {
                    if (item.type.toLowerCase() == listOfBoosts[i].name[j].toLowerCase()) {
                        listOfBoosts[i].items.push(item);
                    }
                }
            }
        });
        listOfBoosts.forEach((item) => { //actually calc the boost now
            if (item.items.length > 0) {
                item.items.forEach((item2) => {
                    output = item.value(output, item2.value);
                });
            }
        });
        return output;
    };
}