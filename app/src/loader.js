/**
 * @file loader.js
 * @description
 * This JavaScript file handles the loading of external scripts and stylesheets required for a web application or game.
 * It asynchronously loads scripts and stylesheets and provides a progress indicator during the loading process.
*/


import React, { useEffect, useState } from "react";

const scripts = [
    "js/game.js",

    // "js/functions/gainParticles.js",

    "js/keybinds.js",
    "js/main.js",
    "js/PIXI/sprite.js",
    // "js/upgrades.js",

    // "js/features/playtime.js",
    // "js/features/mass.js",
    // "js/features/chronos.js",

    // "js/PIXI/render/player.js",
    // "js/particles.js", // Fix later
    // "js/PIXI/render/massParticles.js",
    // "js/PIXI/render/background.js", // Fix later

    // This last
    "js/save.js",
];

const stylesheets = [
    "css/style.css",
];

function Loader () {
    const [scriptsRun, setScriptsRun] = useState(0);
    const [stylesheetsRun, setStylesheetsRun] = useState(0);

    async function include (url) {
        await import(url);
    }

    useEffect(() => {


        const loadAssets = async () => {
            // Load scripts
            for (let x = 0; x < scripts.length; x++) {
                setScriptsRun(x + 1);

                await include(scripts[x])
                    .then(() => {
                        console.log(`Script ${scripts[x]} has run`);
                    })
                    .catch((error) => {
                        console.error(`Failed to run script ${scripts[x]}:`, error);
                    });
            }

            // Load Stylesheets
            for (let y = 0; y < stylesheets.length; y++) {
                setStylesheetsRun(y + 1);

                await include(stylesheets[y])
                    .then(() => {
                        console.log(`Stylesheet ${stylesheets[y]} has run`);
                    })
                    .catch((error) => {
                        console.error(`Failed to run stylesheet ${stylesheets[y]}:`, error);
                    });
            }
        };

        loadAssets();
    }); // Empty dependency array to run once on mount

    return (
        <div>
            <p>Loading: {scriptsRun}/{scripts.length}</p>
            <p>Loading: {stylesheetsRun}/{stylesheets.length}</p>
        </div>
    );
}

export default Loader;