import Game from ".././game.js";
import { E } from ".././eMath.js";
Game["data"].playtime = { //in milliseconds
    tActive: E(),
    tPassive: E(),
    timewarp: E(),
    active: E(),
    passive: E(),
    points: E(),
    timeLastPlayed: E(),
    boost: new Game.classes.boost("1"),
}