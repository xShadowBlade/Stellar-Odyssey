const { Application, Graphics, GlowFilter, ParticleContainer, Texture, Rectangle } = PIXI;
// Function to generate and add a static circle
function addStaticCircle(x, y) {
    const staticCircle = new Graphics();
    staticCircle.beginFill(0xFFFFFF); // Set circle color
    staticCircle.drawCircle(0, 0, 10); // Set circle size
    staticCircle.endFill();
    staticCircle.x = x;
    staticCircle.y = y;

    app.stage.addChild(staticCircle);
}

// Function to generate and add static circles within a box
function spawnStaticCircles() {
    const boxWidth = 300;
    const boxHeight = 200;
    const minX = app.screen.width / 2 - boxWidth / 2;
    const maxX = app.screen.width / 2 + boxWidth / 2;
    const minY = app.screen.height / 2 - boxHeight / 2;
    const maxY = app.screen.height / 2 + boxHeight / 2;
    
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    
    addStaticCircle(x, y);
}

// Set up a timer to spawn static circles every 5 seconds
const spawnInterval = 5000; // 5000 milliseconds = 5 seconds
let lastSpawnTime = 0;

app.ticker.add((delta) => {
    const currentTime = performance.now();
    
    // Check if 5 seconds have passed since the last spawn
    if (currentTime - lastSpawnTime >= spawnInterval) {
        spawnStaticCircles();
        lastSpawnTime = currentTime;
    }
});