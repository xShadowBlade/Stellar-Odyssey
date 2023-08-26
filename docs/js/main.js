/*
Handling of:
Loop Events
Saving/loading
*/
window.addEventListener('load', (event) => {
    Game["functions"].startF();
    let loop = setInterval(main, 1000 / Game.settings.framerate); //Initiates loop with framerate
})
let timestamp = E(Date.now());
let deltaT = E(0);
const temp = {
    
}
addLoopFunction("time", function(dt) {
    Game["data"].playtime.tActive.plus(dt);
    Game["data"].playtime.tPassive.plus(dt);
    Game["data"].playtime.active = Game["data"].playtime.active.plus(Game["data"].playtime.boost.calculate().times(dt));
    Game["data"].playtime.passive = Game["data"].playtime.passive.plus(Game["data"].playtime.boost.calculate().times(dt));
    Game["data"].playtime.points = Game["data"].playtime.points.plus(Game["data"].playtime.boost.calculate().times(dt));
});
function main() { //t = no decimal
    deltaT = (E(Date.now()).sub(timestamp)).plus(Game["data"].playtime.timewarp); //Time since last update (scale factor)
    Game["data"].playtime.timewarp = E(); //reset timewarp
    timestamp = E(Date.now());
    Game["functions"].loopF(deltaT);
}