import Game from "./game";
import { eventSystem } from "./main";
import eMath from "emath.js";

const { E } = eMath;

Game.keys.addKey("Upgrade", " ", function (dt) {
    if (Game.player.state === "idle") {
        for (let i = 0; i < Game.static.massParticles.length; i++) {
            const particle = Game.static.massParticles[i];

            // Check for collision between playerSprite and the current particle
            if (Game.player.sprite.collides(particle)) {
                // Collision detected
                Game.player.state = ["lockedToMass", particle];
                eventSystem.addEvent("massCollect", "timeout", E(1000).div(Game["data"].quarks.absorbRate), function () {
                    Game.player.state = ["lockedToMassExit"];
                    console.log("gainMass");
                    const index = Game.static.massParticles.indexOf(particle);
                    Game.static.massParticles[index].remove();
                    Game.static.massParticles.splice(index, 1);
                    Game["static"].quarks.currency.gain();
                    console.log(Game.data.quarks.currency.value.toString());
                });
                break;
            }
        }
    }
});