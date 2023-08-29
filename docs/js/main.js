/*
Handling of:
Loop Events
Saving/loading
*/
// window.addEventListener('load', (event) => {
//     Game["functions"].startF();
//     let loop = setInterval(main, 1000 / Game.settings.framerate); //Initiates loop with framerate
// })
// const temp = {
    
// }
import Game from ".././game.js";
import { E } from ".././eMath.js";
Game.PIXI.app.ticker.add(function(dt) {
    dt = E(dt).plus(Game["data"].playtime.timewarp); //Time since last update (scale factor)
    Game["data"].playtime.timewarp = E(); //reset timewarp

    Game["data"].playtime.tActive.plus(dt);
    Game["data"].playtime.tPassive.plus(dt);
    Game["data"].playtime.active = Game["data"].playtime.active.plus(Game["data"].playtime.boost.calculate().times(dt));
    Game["data"].playtime.passive = Game["data"].playtime.passive.plus(Game["data"].playtime.boost.calculate().times(dt));
    Game["data"].playtime.points = Game["data"].playtime.points.plus(Game["data"].playtime.boost.calculate().times(dt));
});