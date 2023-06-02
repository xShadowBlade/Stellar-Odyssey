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
function save() {
    if (!Game["data"]) {return} //check if data exists
    Game["data"].playtime.timeLastPlayed = Date.now();
    localStorage.setItem("data", btoa(eMath.encrypt(JSON.stringify(Game.data), Game.key)))
}
function load() {
    if (!Game["data"]) {return} //check if data exists
    if (Game["data"].playtime.timeLastPlayed != 0) {Game["data"].playtime.passive += Date.now() - Game["data"].playtime.timeLastPlayed;}

    if (localStorage.getItem("data")) console.log(JSON.parse(eMath.decrypt(atob(localStorage.getItem("data")))));
}