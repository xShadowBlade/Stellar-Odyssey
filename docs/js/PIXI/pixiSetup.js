Game["PIXI"] = {
    app: new PIXI.Application({
        background: 0x000000,
        resizeTo: window,
    }),
};
document.body.appendChild(Game.PIXI.app.view);