/**
 * @file loader
 * @description
 * This JavaScript file handles the loading of external scripts and stylesheets required for a web application or game.
 * It asynchronously loads scripts and stylesheets and provides a progress indicator during the loading process.
*/

const scripts = [
    // @ts-ignore
    async () => import("./js/game"),
    // async () => import("./js/PIXI/pixiSetup"),
    // async () => import("./js/keybinds"),

    // async () => import("./js/features/playtime"),
    // @ts-ignore
    // async () => import("./js/features/mass"), // Fix later
    // async () => import("./js/features/chronos"),

    // async () => import("./js/main"),

    // async () => import("./js/PIXI/sprite"),
    // @ts-ignore
    async () => import("./js/PIXI/player"),
    // @ts-ignore
    async () => import("./js/PIXI/massParticles"),
    // "functions/gainParticles",

    // "upgrades",

    // "particles", // Fix later
    // "PIXI/render/background", // Fix later
];

const stylesheets = [
    // async () => import("./css/loading.css"),
    async () => import("./css/index.css"),
];

let scriptsRun = 0;
let stylesheetsRun = 0;

const loadAssets = async () => {
    const loadingProgress = document.getElementsByClassName("loading-progress")[0];
    const loadingText = document.getElementsByClassName("loading-text")[0];
    const loadingStart = Date.now();
    console.group("Loading...");
    console.time("Loading Ended");
    console.log(`${loadingStart} | Loading Started`);
    // Load scripts
    for (let x = 0; x < scripts.length; x++) {
        // setScriptsRun(x + 1);
        const scriptName = scripts[x].toString().match(/("|'|`).*?("|'|`)/)?.[0].replace(/("|'|`)/g, "").replace(/_/g, "/");
        if (scriptName) {
            loadingProgress.innerHTML = `${scriptsRun}/${scripts.length}`;
            loadingText.innerHTML = `Loading: ${scriptName}`;
            console.time(scriptName);
            console.group(`${scriptName}`);
            await scripts[x]()
                // eslint-disable-next-line no-loop-func
                .then(() => {
                    console.log(`${Date.now()} | Script ${scriptName} has run`);
                    scriptsRun++;
                })
                .catch((error) => {
                    console.error(`${Date.now()} | Failed to run script ${scriptName}:`, error);
                });
            console.timeEnd(scriptName);
            console.groupEnd();
        }
    }

    // Load Stylesheets
    for (let y = 0; y < stylesheets.length; y++) {
        // setStylesheetsRun(y + 1);
        const ssName = stylesheets[y].toString().match(/("|'|`).*?("|'|`)/)?.[0].replace(/("|'|`)/g, "").replace(/_/g, "/");
        if (ssName) {
            loadingProgress.innerHTML = `${stylesheetsRun}/${stylesheets.length}`;
            loadingText.innerHTML = `Loading: ${ssName}`;
            console.time(ssName);
            console.group(`${ssName}`);
            await stylesheets[y]()
                // eslint-disable-next-line no-loop-func
                .then(() => {
                    console.log(`${Date.now()} | Stylesheet ${ssName} has run`);
                    stylesheetsRun++;
                })
                .catch((error) => {
                    console.error(`${Date.now()} | Failed to run Stylesheet ${ssName}:`, error);
                });
            console.timeEnd(ssName);
            console.groupEnd();
        }
    }
    console.timeEnd("Loading Ended");
    console.groupEnd();
    const loadingScreen = document.querySelector(".loading-screen");
    if (loadingScreen) {
        document.body.removeChild(loadingScreen);
    }
};
loadAssets();