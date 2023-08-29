import Game from ".././game.js";
const { app } = Game.PIXI;
// Camera properties
Game.camera = {
    damping: 0.1,    // Adjust the camera damping value
    lookahead: -100, // Adjust the lookahead distance
    position: { x: 0, y: 0 },
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
        return app.stage.addChild(circle);
    })(),
    acceleration: 0.02,
    velocity: { x: 0, y: 0 },
    restoringForce: 0.005,
    friction: 0.95,
    position: { 
        x: 0, 
        y: 0 ,
        _x: 0, 
        _y: 0,
    },
}
Game.addToStage = function (child, correctPositionOnly = false) {
    !correctPositionOnly ? app.stage.addChild(child) : 0;
    child.pivot.x = -camera.position.x;
    child.pivot.y = -camera.position.y;
}

Game["keys"]["addKey"]("Move Up", "w");
Game["keys"]["addKey"]("Move Left", "a");
Game["keys"]["addKey"]("Move Down", "s");
Game["keys"]["addKey"]("Move Right", "d");

// Update loop
app.ticker.add(() => {
    // Update velocity based on keyboard input
    if (Game["keys"]["isPressing"]("Move Up")) {
        Game.player.velocity.y -= Game.player.acceleration;
    }
    if (Game["keys"]["isPressing"]("Move Left")) {
        Game.player.velocity.x -= Game.player.acceleration;
    }
    if (Game["keys"]["isPressing"]("Move Down")) {
        Game.player.velocity.y += Game.player.acceleration;
    }
    if (Game["keys"]["isPressing"]("Move Right")) {
        Game.player.velocity.x += Game.player.acceleration;
    }
    Game.player.position.x += Game.player.velocity.x;
    Game.player.position.y += Game.player.velocity.y;

    // Apply restoring force towards the center
    const centerX = app.screen.width / 2;
    const centerY = app.screen.height / 2;
    const distanceX = centerX - Game.player.sprite.x;
    const distanceY = centerY - Game.player.sprite.y;
    Game.player.velocity.x += distanceX * Game.player.restoringForce;
    Game.player.velocity.y += distanceY * Game.player.restoringForce;

    // Apply velocity to position
    Game.player.sprite.x += Game.player.velocity.x;
    Game.player.sprite.y += Game.player.velocity.y;

    // Damping (slowing down) velocity
    Game.player.velocity.x *= Game.player.friction;
    Game.player.velocity.y *= Game.player.friction;

    // Update camera position with damping and lookahead
    const targetX = Game.player.sprite.x + Game.player.velocity.x * camera.lookahead;
    const targetY = Game.player.sprite.y + Game.player.velocity.y * camera.lookahead;
    camera.position.x += (targetX - app.screen.width / 2 - app.stage.pivot.x) * camera.damping;
    camera.position.y += (targetY - app.screen.height / 2 - app.stage.pivot.y) * camera.damping;

    app.stage.children.forEach(element => Game.addToStage(element, true));

    Game.player.sprite.pivot.x = -Game.player.position.x;
    Game.player.sprite.pivot.y = -Game.player.position.y;

    // Keep the circle centered on the screen
    Game.player.sprite.x = app.screen.width / 2;
    Game.player.sprite.y = app.screen.height / 2;

    Game.player.position._x = (app.screen.width / 2 - camera.lookahead + Game.player.position.x) + 2 * camera.position.x;
    Game.player.position._y = (app.screen.height / 2 - camera.lookahead + Game.player.position.y) + 2 * camera.position.y;
});