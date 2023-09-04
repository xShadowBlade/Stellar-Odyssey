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
        this.boost = new Game.classes.boost(1);
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