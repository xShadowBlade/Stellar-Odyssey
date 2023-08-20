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
app.stage.addChild(circle);

// Player properties
const player = {
    acceleration: 0.02,
    velocity: { x: 0, y: 0 },
    restoringForce: 0.005,
};

// Camera properties
const camera = {
    damping: 0.1,    // Adjust the camera damping value
    lookahead: -100, // Adjust the lookahead distance
};

// Keyboard input
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
};

// Key event listeners
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (keys.hasOwnProperty(key)) {
        keys[key] = true;
    }
});

document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (keys.hasOwnProperty(key)) {
        keys[key] = false;
    }
});

// Update loop
app.ticker.add(() => {
    // Update velocity based on keyboard input
    if (keys.w) {
        player.velocity.y -= player.acceleration;
    }
    if (keys.a) {
        player.velocity.x -= player.acceleration;
    }
    if (keys.s) {
        player.velocity.y += player.acceleration;
    }
    if (keys.d) {
        player.velocity.x += player.acceleration;
    }

    // Apply restoring force towards the center
    const centerX = app.screen.width / 2;
    const centerY = app.screen.height / 2;
    const distanceX = centerX - circle.x;
    const distanceY = centerY - circle.y;
    player.velocity.x += distanceX * player.restoringForce;
    player.velocity.y += distanceY * player.restoringForce;

    // Apply velocity to position
    circle.x += player.velocity.x;
    circle.y += player.velocity.y;

    // Damping (slowing down) velocity
    player.velocity.x *= 0.98;
    player.velocity.y *= 0.98;

    // Update camera position with damping and lookahead
    const targetX = circle.x + player.velocity.x * camera.lookahead;
    const targetY = circle.y + player.velocity.y * camera.lookahead;
    app.stage.pivot.x += (targetX - app.screen.width / 2 - app.stage.pivot.x) * camera.damping;
    app.stage.pivot.y += (targetY - app.screen.height / 2 - app.stage.pivot.y) * camera.damping;

    // Keep the circle centered on the screen
    circle.x = app.screen.width / 2;
    circle.y = app.screen.height / 2;
});