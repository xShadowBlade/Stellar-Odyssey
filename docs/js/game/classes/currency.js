import Game from ".././game.js";
import { E } from ".././eMath.js";
Game.classes.currency = class {
    constructor () {
        this.value = E(0);
        this.boost = new Game.classes.boost(1);
    }
    gain () { 
        this.value = this.value.add(this.boost.calculate());
    }
}