/**
 * Represents a static attribute in the game.
 *
 * @class
 */
Game.classes.staticAttribute = class {
    /**
     * Constructs a static attribute with an initial effect.
     *
     * @constructor
     * @param {Decimal|Number} initial - The inital value of the attribute.
     */
    constructor (initial) {
        /**
         * The inital value of the attribute.
         * @type {Decimal}
         */
        this.initial = initial;

        /**
         * The current value of the attribute.
         * @type {Decimal}
         */
        this.value = E(initial);

        /**
         * A boost object that affects the attribute.
         * @type {Game.classes.boost}
         */
        this.boost = new Game.classes.boostStatic(1);

    }
    /**
     * Updates the value of the attribute based on the provided effect function and initial value.
     *
     * @param {function} effect - The effect function to apply to the attribute.
     * @returns {Decimal} The updated value of the attribute after applying the effect.
     */
    update (effect) {
        // Execute the provided effect function
        effect();

        // Calculate and set the new value using the initial value and boost factor
        this.value = this.boost.calculate(this.initial);

        // Return the updated attribute value
        return this.value;
    }
}