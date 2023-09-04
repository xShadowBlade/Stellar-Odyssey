/* 
* Player movement and camera movement
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
}

Game["keys"]["addKey"]("Move Up", "w");
Game["keys"]["addKey"]("Move Left", "a");
Game["keys"]["addKey"]("Move Down", "s");
Game["keys"]["addKey"]("Move Right", "d");

// Update loop
app.ticker.add((dt) => {
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

    Game.player.sprite.x += Game.player.velocity.x;
    Game.player.sprite.y += Game.player.velocity.y;

    // Damping (slowing down) velocity
    Game.player.velocity.x *= Game.player.friction;
    Game.player.velocity.y *= Game.player.friction;

    // Camera Movement Damping
    function smoothDamp(current, target, smoothing, deltaTime) {
        // Calculate the difference between current and target
        var difference = target - current;
    
        // Calculate the change based on smoothing and deltaTime
        var change = difference * smoothing * deltaTime;
    
        // Apply the change to the current value
        return current + change;
    }
    Game.camera.x = smoothDamp(Game.camera.x, Game.player.position.x, Game.camera.smoothDamp, dt);
    Game.camera.y = smoothDamp(Game.camera.y, Game.player.position.y, Game.camera.smoothDamp, dt);
});
})();