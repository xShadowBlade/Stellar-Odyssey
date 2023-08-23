Game["player"] = {
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
                quality: 0.5
            })
        ];

        // Add the circle to the stage
        return app.stage.addChild(circle);
    })(),
    acceleration: 0.01,
    velocity: { x: 0, y: 0 },
    restoringForce: 0.005,
    friction: 0.97,
    position: { 
        x: 0, 
        y: 0 ,
        _x: 0, 
        _y: 0,
    },
}

Game["addToStage"] = function (child, correctPositionOnly = false) {
    !correctPositionOnly ? app.stage.addChild(child) : 0;
    child.pivot.x = -camera.position.x;
    child.pivot.y = -camera.position.y;
}

// Camera properties
const camera = {
    damping: 0.1,    // Adjust the camera damping value
    lookahead: -100, // Adjust the lookahead distance
    position: { x: 0, y: 0 },
};

// Keyboard input
const keys = [];
function logKey(key, type) {
    key = key.key;
    if (type && !keys.includes(key)) keys.push(key); else if (!type && keys.includes(key)) keys.splice(keys.indexOf(key), 1);
}
// Key event listeners
document.addEventListener('keydown', (e) => logKey(e, true));
document.addEventListener('keyup', (e) => logKey(e, false));

// Update loop
app.ticker.add(() => {
    // Update velocity based on keyboard input
    if (keys.includes("w")) {
        Game.player.velocity.y -= Game.player.acceleration;
    }
    if (keys.includes("a")) {
        Game.player.velocity.x -= Game.player.acceleration;
    }
    if (keys.includes("s")) {
        Game.player.velocity.y += Game.player.acceleration;
    }
    if (keys.includes("d")) {
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