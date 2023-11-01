import { Application } from "pixi.js";

const pixiGame = {
    app: new Application({
        background: 0x000000,
        resizeTo: window,
    }),
};
pixiGame.app.stage.eventMode = "static";
// @ts-ignore
document.body.appendChild(pixiGame.app.view);
console.log("PIXI Setup complete.");
// globalThis.__PIXI_APP__ = pixiGame.app;
window.addEventListener("resize", () => {
    // Update the background's size to match the new window size
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // Resize the renderer
    pixiGame.app.renderer.resize(newWidth, newHeight);
});

export default pixiGame;