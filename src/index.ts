/**
 * @file loader
 * @description
 * This JavaScript file handles the loading of external scripts and stylesheets required for a web application or game.
 * It asynchronously loads scripts and stylesheets and provides a progress indicator during the loading process.
 */

// TODO: Completely overhaul loading

import "reflect-metadata";
import "emath.js";
import "emath.js/game";

// !Temporary fix

import "./css/index.css";
import "./css/loading.css";

import "./game";
import "./features/quarks";
import "./features/chronos";
import "./features/atom";
// import "./PIXI/player";
import "./ui/uiLayer";
import "./ui/story";
import "./loading";

import "./demo";

// import "./game";

// // import "./features/playtime";
// import "./features/mass";
// import "./features/chronos";
// import "./features/genesis";
// import "./PIXI/player";

// import "./ui/uiLayer";
// import "./ui/story";


// const scripts = [
//     // @ts-expect-error - Path resolution wrong
//     async (): Promise<unknown> => import("./game"),
//     // @ts-expect-error - Path resolution wrong
//     async (): Promise<unknown> => import("./features/quarks"), // Fix later
//     // @ts-expect-error - Path resolution wrong
//     async (): Promise<unknown> => import("./features/chronos"),
//     // @ts-expect-error - Path resolution wrong
//     async (): Promise<unknown> => import("./features/atom"),
//     // @ts-expect-error - Path resolution wrong
//     async (): Promise<unknown> => import("./PIXI/player"),

//     // @ts-expect-error - Path resolution wrong
//     async (): Promise<unknown> => import("./ui/uiLayer"),
//     // @ts-expect-error - Path resolution wrong
//     async (): Promise<unknown> => import("./ui/story"),

//     // Import loading last
//     // @ts-expect-error - Path resolution wrong
//     async (): Promise<unknown> => import("./loading"),
// ];

// const stylesheets = [
//     // async () => import("./css/loading.css"),
//     async (): Promise<unknown> => import("./css/index.css"),
// ];

// let scriptsRun = 0;
// const stylesheetsRun = 0;

// /**
//  * Load all assets
//  */
// async function loadAssets () {
//     const loadingProgress = document.getElementsByClassName("loading-progress")[0];
//     const loadingText = document.getElementsByClassName("loading-text")[0];
//     const loadingStart = Date.now();
//     console.group("Loading...");
//     console.time("Loading Ended");
//     console.log(`${loadingStart} | Loading Started at ${new Date().toISOString()}`);
//     // Load scripts
//     // for (let x = 0; x < scripts.length; x++) {
//     for (const [x, script] of scripts.entries()) {
//         // setScriptsRun(x + 1);
//         const scriptName = scripts[x].toString().match(/("|'|`).*?("|'|`)/)?.[0].replace(/("|'|`)/g, "").replace(/_/g, "/");
//         if (scriptName) {
//             loadingProgress.innerHTML = `${scriptsRun}/${scripts.length}`;
//             loadingText.innerHTML = `Loading: ${scriptName}`;
//             console.time(scriptName);
//             console.group(scriptName);
//             await scripts[x]()
//                 .then(() => {
//                     console.log(`${Date.now()} | Script ${scriptName} has run`);
//                     scriptsRun++;
//                 })
//                 .catch((error) => {
//                     console.error(`${Date.now()} | Failed to run script ${scriptName}:`, error);
//                 });
//             console.timeEnd(scriptName);
//             console.groupEnd();
//         }
//     }

//     // Load Stylesheets
//     // for (let y = 0; y < stylesheets.length; y++) {
//     //     // setStylesheetsRun(y + 1);
//     //     const ssName = stylesheets[y].toString().match(/("|'|`).*?("|'|`)/)?.[0].replace(/("|'|`)/g, "").replace(/_/g, "/");
//     //     if (ssName) {
//     //         loadingProgress.innerHTML = `${stylesheetsRun}/${stylesheets.length}`;
//     //         loadingText.innerHTML = `Loading: ${ssName}`;
//     //         console.time(ssName);
//     //         console.group(`${ssName}`);
//     //         await stylesheets[y]()
//     //             // eslint-disable-next-line no-loop-func
//     //             .then(() => {
//     //                 console.log(`${Date.now()} | Stylesheet ${ssName} has run`);
//     //                 stylesheetsRun++;
//     //             })
//     //             .catch((error) => {
//     //                 console.error(`${Date.now()} | Failed to run Stylesheet ${ssName}:`, error);
//     //             });
//     //         console.timeEnd(ssName);
//     //         console.groupEnd();
//     //     }
//     // }
//     console.timeEnd("Loading Ended");
//     console.groupEnd();
//     const loadingScreen = document.querySelector(".loading-screen");
//     if (loadingScreen) {
//         document.body.removeChild(loadingScreen);
//     }
// }
// loadAssets();
