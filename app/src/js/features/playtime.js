import eMath from "emath.js";
import Game from "../game.js";

const { E } = eMath;

Game["data"].playtime = { // in milliseconds
    tActive: E(),
    tPassive: E(),
    timewarp: E(),
    active: E(),
    passive: E(),
    points: E(),
    timeLastPlayed: E(),
};

Game["functions"].timewarp = t => Game["data"].playtime.timewarp = E(t);