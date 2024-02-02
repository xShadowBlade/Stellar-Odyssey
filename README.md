![Header](./public/github-header-image.png)

# Synopsis

# Main Gameplay Loop

1. Set up a canvas where the game will be rendered.
2. Create a player object represented by a circle that can move around the screen.
3. The player's objective is to collect particles scattered throughout the game world.
4. When the player is near a particle, the player locks onto it and waits to collect it.
5. Implement a cap on the number of particles on the screen at once.
6. Particles regenerate over time, and the regeneration rate can be increased through upgrades obtained later in the game.

# Mass and Upgrades

1. Each time the player collects a particle, their mass increases.
2. Use the accumulated mass as currency to purchase upgrades that enhance mass gain.
3. Upgrades can include increasing the mass gained from particles, raising the maximum number of particles, and boosting particle regeneration rate.

# Experience Mechanic

1. After reaching a certain amount of mass (after approximately 10 minutes of gameplay), unlock an experience (XP) mechanic.
2. Leveling up rewards the player with XP points, which can be used to obtain various bonuses.
3. Bonuses can provide advantages such as increased particle collection speed, enhanced abilities, or additional upgrades.

# Automation

1. At a certain point in the game (around 30 minutes of gameplay), unlock an automation mechanic.
2. Introduce a robot character that can collect particles on the player's behalf.
3. The robot operates both online and offline, allowing for offline progress.
4. Implement a vision system for the robot, including a range and angle.
5. The angle determines the robot's field of view from left to right, while the range sets the distance it can see in that direction.

# Progress Reset Mechanic

1. After playing for a significant amount of time (approximately 30 minutes), introduce a mechanic that resets all previous progress (excluding automation).
2. In exchange for the reset, offer a new currency and mechanic to the player.
3. This mechanic should provide fresh gameplay elements and challenges to keep the game engaging.