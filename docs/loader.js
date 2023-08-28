(function() {
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
function includeStylesheet(url) {
    return new Promise((resolve, reject) => {
        const style = document.createElement('link');
        style.rel = "stylesheet";
        style.href = url;
        style.onload = resolve;
        style.onerror = reject;
        document.head.appendChild(style);
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
    "js/keybinds.js",

    "js/game/format.js",

    "js/game/classes/boost.js",
    // "js/game/classes/currency_layer.js",
    "js/game/classes/grid.js",
    // "js/game/classes/obb.js",
    "js/game/classes/currency.js",

    "js/features/playtime.js",
    "js/features/mass.js",
    "js/features/chronos.js",

    // "js/functions/gainParticles.js",

    "js/pixiSetup.js",
    "js/main.js",

    "js/render/player.js",
    // "js/particles.js", // Fix later
    "js/render/massParticles.js",

    // This last
    "js/save.js",
]
const stylesheets = [
    "css/style.css",
]

// Function to run all scripts

// Initialize counters
let totalScripts = scripts.length;
let scriptsRun = 0;
let totalStylesheets = stylesheets.length;
let stylesheetsRun = 0;


window.addEventListener("load", async function () {
    const loadingProgress = document.getElementsByClassName("loading-progress")[0];
    const loadingText = document.getElementsByClassName("loading-text")[0];
    const loadingStart = Date.now();
    console.group("Loading...")
    console.time("Loading Ended")
    console.log(`${Date.now()} | Loading Started`);
    // Load scripts
    for (let x = 0; x < scripts.length; x++) {
        // console.log(scripts[x]);

        // console.groupCollapsed(`${scripts[x]}`);
        console.group(`${scripts[x]}`);

        console.log(`${Date.now()} | Script ${scripts[x]} has initiated`);
        console.time(scripts[x])
        loadingProgress.innerHTML = `${scriptsRun}/${scripts.length}`;
        loadingText.innerHTML = `Loading: ${scripts[x]}`;
        await includeScript(scripts[x])
            .then(() => {
                scriptsRun++;
                console.log(`${Date.now()} | Script ${scripts[x]} has run`);
                
            })
            .catch(error => {
                console.error(`${Date.now()} | Failed to run script ${scripts[x]}:`, error);
            });
        console.timeEnd(scripts[x]);
        console.groupEnd();
    }
    // Load Stylesheets
    /*
    for (let y = 0; y < stylesheets.length; y++) {
        console.groupCollapsed(`${stylesheets[y]}`)
        console.log(`${Date.now()} | Stylesheet ${stylesheets[y]} has initiated`);
        console.time(stylesheets[y])
        await includeStylesheet(stylesheets[y])
            .then(() => {
                stylesheetsRun++;
                console.log(`${Date.now()} | Stylesheet ${stylesheets[y]} has run`);
            })
            .catch(error => {
                console.error(`${Date.now()} | Failed to run stylesheets ${stylesheets[y]}:`, error);
            });
        console.timeEnd(stylesheets[y]);
        console.groupEnd();
    }
    */
    console.timeEnd("Loading Ended");
    console.groupEnd();
    document.body.removeChild(document.querySelector('.loading-screen'));
});
})();