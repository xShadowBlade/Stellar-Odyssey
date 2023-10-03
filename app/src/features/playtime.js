import eMath from "emath.js";

const { E } = eMath;

const playtime = { // in milliseconds
    tActive: E(),
    tPassive: E(),
    timewarp: E(),
    active: E(),
    passive: E(),
    points: E(),
    timeLastPlayed: E(),
};

export default playtime;