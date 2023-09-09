Game["PIXI"] = {
    app: new PIXI.Application({
        background: 0x000000,
        resizeTo: window,
    }),
};
Game.PIXI.app.stage.eventMode = "static";
document.body.appendChild(Game.PIXI.app.view);
globalThis.__PIXI_APP__ = Game.PIXI.app;
window.addEventListener('resize', () => {
    // Update the background's size to match the new window size
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // Resize the renderer
    app.renderer.resize(newWidth, newHeight);

    // Resize the background
    background.width = newWidth;
    background.height = newHeight;
});