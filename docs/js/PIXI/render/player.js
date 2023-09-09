/**
 * @file js/PIXI/render/player.js
 * @description Player movement and camera movement
*/
(function() {
const { app } = Game.PIXI;
// Camera properties
Game.camera = {
    x: 0, 
    y: 0,
    smoothDamp: 0.15,
};
const { camera } = Game;
Game.player = {
    sprite: (function() {
        // Create the circle sprite
        const circle = new PIXI.Graphics();
        circle.lineStyle(2, 0xFFFFFF); // Set line color and thickness
        circle.drawCircle(0, 0, 50);   // Set the radius of the circle
        circle.x = app.screen.width / 2;
        circle.y = app.screen.height / 2;

        // Add a glow filter to the circle
        circle.filters = [
            new PIXI.filters.GlowFilter({
                quality: 0.1,
                // innerStrength: 4,
                // outerStrength: 4,
            })
        ];

        // Add the circle to the stage

        return new Game.classes.sprite(circle, "Circle");
        // return app.stage.addChild(circle);
    })(),
    acceleration: 0.2,
    velocity: { x: 0, y: 0 },
    restoringForce: 0.005,
    friction: 0.95,
    position: { 
        x: 0, 
        y: 0 ,
        _x: 0, 
        _y: 0,
    },
    /**
     * Possible states:
     * - ["idle"]
     * - ["lockedToMass", ${particle}]
     * - ["lockedToMassExit"]
     */
    state: ["idle"],
}
Game.settings.clickToMove = false;
const condition = () => !Game.settings.clickToMove && Game.player.state[0] == "idle"
Game["keys"].addKeys([
    { name: "Move Up", key: "w", fn: () => Game.player.velocity.y -= condition() ? Game.player.acceleration : 0},
    { name: "Move Left", key: "a", fn: () => Game.player.velocity.x -= condition() ? Game.player.acceleration : 0 },
    { name: "Move Down", key: "s", fn: () => Game.player.velocity.y += condition() ? Game.player.acceleration : 0 },
    { name: "Move Right", key: "d", fn: () => Game.player.velocity.x += condition() ? Game.player.acceleration : 0 },
]);

// Click to move || To be continued
// (function () {
//     let circleGraphics = new PIXI.Graphics();
//     const circleRadius = 50;
//     const dotRadius = 2.5;
//     const dotSpacing = 10;

//     circleGraphics.lineStyle(2, 0xFFFFFF); // Set line style (color, thickness, etc.)
//     circleGraphics.beginFill(0xFFFFFF); // Fill color

//     for (let angle = 0; angle < 360; angle += 10) {
//         const radians = PIXI.DEG_TO_RAD * angle;
//         const x = circleRadius * Math.cos(radians);
//         const y = circleRadius * Math.sin(radians);

//         circleGraphics.drawCircle(x, y, dotRadius);
//     }

//     circleGraphics.endFill();

//     new Game.classes.sprite(circleGraphics, "Circle");

//     const mask = new PIXI.Graphics();
//     mask.beginFill(0);
//     mask.drawCircle(0, 0, circleRadius);
//     mask.endFill();

//     circleGraphics.mask = mask;
//     new Game.classes.sprite(mask, "Circle")

//     mask.eventMode = "static";
//     mask.cursor = "pointer";
//     app.stage.on('pointerup', onDragEnd);
//     app.stage.on('pointerupoutside', onDragEnd);

//     mask.on('pointerdown', onDragStart, mask);

//     function onDragMove(event)
//     {
//         if (dragTarget)
//         {
//             dragTarget.parent.toLocal(event.global, null, dragTarget.position);
//         }
//     }

//     function onDragStart()
//     {
//         // store a reference to the data
//         // the reason for this is because of multitouch
//         // we want to track the movement of this particular touch
//         // this.data = event.data;
//         this.alpha = 0.5;
//         dragTarget = this;
//         app.stage.on('pointermove', onDragMove);
//     }

//     function onDragEnd()
//     {
//         if (dragTarget)
//         {
//             app.stage.off('pointermove', onDragMove);
//             dragTarget.alpha = 1;
//             dragTarget = null;
//         }
//     }
// })();
Game.functions.updateCamera = function(dt) {
    Game.camera.x = eMath.smoothDamp(Game.camera.x, Game.player.position.x, Game.camera.smoothDamp, dt);
    Game.camera.y = eMath.smoothDamp(Game.camera.y, Game.player.position.y, Game.camera.smoothDamp, dt);
}
// Update loop
app.ticker.add((dt) => {
    Game.player.position.x += Game.player.velocity.x;
    Game.player.position.y += Game.player.velocity.y;

    Game.player.sprite.x += Game.player.velocity.x;
    Game.player.sprite.y += Game.player.velocity.y;

    // Damping (slowing down) velocity
    Game.player.velocity.x *= Game.player.friction;
    Game.player.velocity.y *= Game.player.friction;

    switch (Game.player.state[0]) {
        case "lockedToMass":
            const particle = Game.player.state[1];
            Game.player.position.x = Game.player.sprite.x = eMath.smoothDamp(Game.player.sprite.x, particle.x, 0.15, dt);
            Game.player.position.y = Game.player.sprite.y = eMath.smoothDamp(Game.player.sprite.y, particle.y, 0.15, dt);
            Game.camera.x = Game.player.sprite.x - app.screen.width / 2;
            Game.camera.y = Game.player.sprite.y - app.screen.height / 2;
        break;
        case "lockedToMassExit":
            Game.player.position.x -= app.screen.width / 2;
            Game.player.position.y -= app.screen.height / 2;
            Game.functions.updateCamera(dt);
            Game.player.state = ["idle"];
        break;
        case "idle":
        default:
            Game.functions.updateCamera(dt);
        break;
    }
});
})();