import eMath from "emath.js";
import Game from "../game.js";

const { E } = eMath;

const { currency, currencyStatic } = eMath.classes;

Game["data"].playtime = { // in milliseconds
    tActive: new currency(),
    tPassive: new currency(),
    timewarp: E(),
    active: new currency(),
    passive: new currency(),
    points: new currency(),
    timeLastPlayed: E(),
};

Game["static"].playtime = { // in milliseconds
    tActive: new currencyStatic(() => Game["data"].playtime.tActive),
    tPassive: new currencyStatic(() => Game["data"].playtime.tPassive),
    active: new currencyStatic(() => Game["data"].playtime.active),
    passive: new currencyStatic(() => Game["data"].playtime.passive),
    points: new currencyStatic(() => Game["data"].playtime.points),
};

Game["functions"].timewarp = t => Game["data"].playtime.timewarp = E(t);