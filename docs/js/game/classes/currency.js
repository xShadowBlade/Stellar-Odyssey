/**
 * Represents a currency in the game.
 *
 * @class
 */
Game.classes.currency = class {
    /**
    * Constructs a new currency object with an initial value of 0 and a boost.
    *
    * @constructor
    */
    constructor () {
        /**
         * The current value of the currency.
         * @type {Decimal}
         */
        this.value = E(0);

        /**
         * A boost object that affects the currency gain.
         * @type {Game.classes.boost}
         */
        // this.boost = new Game.classes.boost(1);
    }

    /**
     * The new currency value after applying the boost.
     * @type {Decimal}
     * @returns {Decimal}
     */
    gain () { 
        this.value = this.value.add(this.boost.calculate());
        return this.value;
    }
}

/**
 * Represents the backend for a currency in the game.
 *
 * @class
 */
Game.classes.currencyStatic = class {
    /**
    * Constructs the backend for a currency
    *
    * @constructor
    * @param {function} pointer - returns Game.classes.currency
    */
    constructor (pointer) {
        /**
         * An array that represents upgrades, their costs, and their effects.
         * @type {Array}
         */
        this.upgrades = [];

        /**
         * A function that returns the pointer of the data
         * @type {function}
         */
        this.pointer = pointer;
    
        /**
         * A boost object that affects the currency gain.
         * @type {Game.classes.boost}
         */
        this.boost = new Game.classes.boostStatic(1);
    }

    /**
     * The new currency value after applying the boost.
     * @type {Decimal}
     * @returns {Decimal}
     */
    gain () { 
        this.pointer().value = this.pointer().value.add(this.boost.calculate());
        return this.value;
    }

    /**
    * Create new upgrades
    * 
    * @typedef {Object} CurrencyUpgrade
    * @property {string} [id] - id
    * @property {string} [name] - name
    * @property {Decimal} cost - The cost of the first upgrade
    * @property {function} costScaling - Scalar function for cost with param level
    * @property {Decimal} maxLevel - Max level
    * @property {function} [effect] - Function to call after the upgrade is bought with param upgrade.level and param context
    *
    * @param {Array<CurrencyUpgrade>} upgrades - An array of upgrade objects.
    * @param {boolean} [runEffectInstantly] - Whether to run the effect immediately
    * @example
    * const myCurrency = new currency([
    *     {
    *         cost: E(10), // The cost of the first upgrade
    *         
    *         // Additional properties specific to this upgrade
    *     },
    *     // Add more upgrades here...
    * ]);
    */
    addUpgrade (upgrades, runEffectInstantly = true) {
        for (let i = 0; i < upgrades.length; i++) {
            upgrades[i].level = upgrades[i].level ? upgrades[i].level : upgrades[i].level = E(1);
            if (runEffectInstantly) upgrades[i].effect(upgrades.level);
        }
        this.upgrades = this.upgrades.concat(upgrades);
    }

    /**
     * Buys an upgrade based on its ID or array position, 
     * if enough currency is available.
     *
     * @param {string|number} id - The ID or position of the upgrade to buy or upgrade. 
     * If a string is provided, it is treated as the upgrade's ID. If a number is provided, it is treated as the upgrade's array position (starting from 0).
     * @param {Decimal} target - The target level or quantity to reach for the upgrade. 
     * This represents how many upgrades to buy or upgrade.
     * 
     * @returns {boolean} Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
     *
     */
    buyUpgrade (id, target) {
        // Binary Search
        /**
         * Finds the highest value of 'b' for which the sum of 'f(n)' from 0 to 'b' is less than or equal to 'a'.
         *
         * @param {function} f - The function 'f(n)' to calculate the sum.
         * @param {number} a - The target sum value to compare against.
         * @returns {number} - The highest 'b' value for which the sum is less than or equal to 'a'.
         */
        function findHighestB(f, a) {
            let left = E(0);
            let right = E(1);
            let highestB = E(0);
        
            // Find an upper bound for 'b' by exponentially increasing it
            while (calculateSum(f, right).lt(a)) {
                highestB = right;
                right = right.mul(2);
            }
        
            // Perform binary search within the estimated range
            while (left.lt(right)) {
                const mid = Decimal.floor((left.add(right)).div(2));
                const sum = calculateSum(f, mid);
        
                if (sum.lt(a)) {
                    left = mid.add(1);
                } else {
                    right = mid;
                }
            }
        
            return [left.sub(1), calculateSum(f, left.sub(1))];
        }
        
        /**
         * Calculates the sum of 'f(n)' from 0 to 'b'.
         *
         * @param {function} f - The function 'f(n)' to calculate the sum.
         * @param {number} b - The upper limit for the sum.
         * @returns {number} - The calculated sum of 'f(n)'.
         */
        function calculateSum(f, b) {
            let sum = E();
            for (let n = E(0); n.lte(b); n = n.add(1)) {
                sum = sum.add(f(n));
            }
            return sum;
        }
        
        //Example
        // console.log(findHighestB((n) => n.mul(n), 100))

        // Implementation logic to find the upgrade based on ID or position
        let upgrade;
        if (typeof id == "number") {
            upgrade = this.upgrades[id];
        } else if (typeof id == "string") {
            for (let i = 0; i < this.upgrades.length; i++) {
                if (this.upgrades[i].id == id) {
                    upgrade = this.upgrades[i];
                    break;
                } else continue;
            }
        } else {
            return false;
        }

        // Assuming you have found the upgrade object, calculate the maximum affordable quantity
        const maxAffordableQuantity = findHighestB((level) => upgrade.costScaling(upgrade.level.add(level)), this.pointer().value);

        if (!maxAffordableQuantity.lte(0)) {
            // Determine the actual quantity to purchase based on 'target' and 'maxLevel'
            target = upgrade.level.add(target).lte(upgrade.maxLevel) ? target : upgrade.maxLevel.sub(upgrade.level);
        
            // Check if the calculated quantity exceeds the affordable quantity
            const condition = maxAffordableQuantity[0].lte(target);
        
            // Update the affordable quantity and cost if needed
            maxAffordableQuantity[0] = condition ? maxAffordableQuantity[0] : E(target);
            maxAffordableQuantity[1] = condition ? maxAffordableQuantity[1] : calculateSum(upgrade.costScaling, target);
        
            // Deduct the cost from available currency and increase the upgrade level
            this.pointer().value = this.pointer().value.sub(maxAffordableQuantity[1]);
            upgrade.level = upgrade.level.add(maxAffordableQuantity[1]);
            upgrade.effect(upgrade.level, upgrade);
        } else {
            return false; // Unable to afford any upgrades
        }
    }
}