Game["PIXI"] = {
    app: new PIXI.Application({
        background: 0x000000,
        resizeTo: window,
    }),
};
const app = Game["PIXI"].app;
document.body.appendChild(app.view);