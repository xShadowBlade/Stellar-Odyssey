// Function to include and run a script
function includeScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

const scripts = [ // Also in the order that they will be run
    "https://pixijs.download/release/pixi.js",
    "js/import/pixi-filters.js",
    "js/import/break_eternity.js",
    "js/import/lz-string-1.4.4.js",

    "js/eMath.js",
    "js/format.js",
    "js/game.js",
    "js/main.js",
    "js/save.js",
    "js/keybinds.js",

    "js/game/game_format.js",

    "js/game/game_classes/game_classes_boost.js",
    "js/game/game_classes/game_classes_currency_layer.js",
    "js/game/game_classes/game_classes_grid.js",
    "js/game/game_classes/game_classes_obb.js",

    "js/features/playtime.js",
    "js/features/mass.js",

    "js/pixiSetup.js",
    "js/render/player.js",
    // "js/particles.js", // Fix later
    "js/render/massParticles.js",
]

// Function to run all scripts

// Initialize counters
let totalScripts = scripts.length;
let scriptsRun = 0;

window.addEventListener("load", async function () {
    const loadingStart = Date.now();
    console.log(`${Date.now()} | Loading Started`);
    for (let x in scripts) {
        // console.log(scripts[x]);
        await includeScript(scripts[x])
            .then(() => {
                scriptsRun++;
                console.log(`${Date.now()} | Script ${scripts[x]} has run`);
            })
            .catch(error => {
                console.error(`${Date.now()} | Failed to run script ${scripts[x]}:`, error);
            });
    }
    console.log(`${Date.now()} | Loaded Ended: Took ${Date.now() - loadingStart}ms`);
});