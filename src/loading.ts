/**
 * @file Loading data and starting the game
 */
import { EventTypes } from "emath.js/game";
import Game from "./game";

Game.init();

Game.dataManager.loadData();

Game.eventManager.setEvent("autosave", EventTypes.interval, 30e3, () => {
    console.log("Autosaving...");
    Game.dataManager.saveData();
});

window.addEventListener("beforeunload", () => {
    Game.dataManager.saveData();
});