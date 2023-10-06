const { Application, Graphics, GlowFilter, ParticleContainer, Texture, Rectangle } = PIXI;
// Create a particle texture (1x1 pixel white texture)
const particleTexture = Texture.WHITE;

// Create a ParticleContainer to efficiently render particles
const particleContainer = new ParticleContainer(1000, {
    scale: true,
    position: true,
    rotation: true,
    uvs: true,
    alpha: true,
});

// Add the ParticleContainer to the stage
app.stage.addChild(particleContainer);

// Create particles with random positions and velocities
for (let i = 0; i < 1000; i++) {
    const particle = new Graphics();
    particle.beginFill(0xFFFFFF); // Set particle color
    particle.drawCircle(0, 0, Math.random() * 2); // Vary particle size
    particle.endFill();

    particle.x = Math.random() * app.screen.width;
    particle.y = Math.random() * app.screen.height;

    particle.velocity = {
        x: (Math.random() - 0.5) * 2, // Random horizontal velocity
        y: (Math.random() - 0.5) * 2, // Random vertical velocity
    };

    particleContainer.addChild(particle);
}

// Update loop
app.ticker.add(() => {
    // Update particle positions
    for (const particle of particleContainer.children) {
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        // Wrap particles around the screen edges
        if (particle.x > app.screen.width) {
            particle.x = 0;
        } else if (particle.x < 0) {
            particle.x = app.screen.width;
        }

        if (particle.y > app.screen.height) {
            particle.y = 0;
        } else if (particle.y < 0) {
            particle.y = app.screen.height;
        }
    }
});