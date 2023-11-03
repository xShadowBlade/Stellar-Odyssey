import LZString from "lz-string";
import { E } from "emath.js";

export default function dataManagement (gamePointer: Function) {
    const normalData = gamePointer().data;

    const compileData = (data = gamePointer()["data"]): string =>
        LZString.compressToBase64(JSON.stringify(data));

    const decompileData = (data: string | null = localStorage.getItem("data")): object | null =>
        data ? JSON.parse(LZString.decompressFromBase64(data)) : null;

    const resetData = (reload = false): void => {
        gamePointer().data = normalData;
        saveData();
        if (reload) window.location.reload();
    };

    const saveData = (): void => {
        if (!gamePointer()["data"]) {
            return;
        } // check if data exists
        gamePointer()["data"].playtime.timeLastPlayed = Date.now();
        localStorage.setItem("data", compileData());
        console.log("Game Saved");
    };

    const exportData = (): void => {
        // Step 1: Create the content
        const content = compileData();

        console.log(content);

        // Ask if user wants to download

        if (prompt("Download save data?:", content) != null) {
            // Step 2: Create a Blob
            const blob = new Blob([content], { type: "text/plain" });

            // Step 3: Create an anchor element
            const downloadLink = document.createElement("a");

            // Step 4: Set attributes
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = "stellar-odyssey-data.txt"; // Specify the file name
            downloadLink.textContent = "Download .txt file"; // Text shown on the link

            // Step 5: Append to the DOM
            document.body.appendChild(downloadLink);

            // Step 6: Programmatically trigger click event
            downloadLink.click();

            // Clean up: Remove the link from the DOM after the download
            document.body.removeChild(downloadLink);
        }
    };

    const loadData = (): void => {
        if (!gamePointer()["data"]) {
            return;
        } // check if data exists
        // if (gamePointer()["data"].playtime.timeLastPlayed != 0) {gamePointer()["data"].playtime.passive += Date.now() - gamePointer()["data"].playtime.timeLastPlayed;}

        // let loadedData = decompileData();

        // if (localStorage.getItem("data")) console.log(decompileData(localStorage.getItem("data")));

        // Sample function E()
        // function E(value) {
        //     // Replace this with your implementation of function E()
        //     return `Processed: ${value}`;
        // }

        // Recursive function to process object properties
        function processObject (obj: any) {
            for (const prop in obj) {
                if (typeof obj[prop] === "string") {
                    try {
                        const processedValue = E(obj[prop]);
                        obj[prop] = processedValue;
                    } catch (error) {
                        // Handle any errors from function E()
                        console.error(`Error processing value: ${obj[prop]}`);
                    }
                } else if (typeof obj[prop] === "object" && obj[prop] !== null) {
                    processObject(obj[prop]); // Recurse into nested objects
                }
            }
            return obj;
        }

        // Example object

        // Process the object
        let loadedData = decompileData();
        console.log(loadedData);
        console.log((loadedData = processObject(loadedData)));

        // Add new / updated properties
        function deepMerge (source: any, target: any) {
            for (const key in source) {
                // eslint-disable-next-line no-prototype-builtins
                if (source.hasOwnProperty(key)) {
                    // eslint-disable-next-line no-prototype-builtins
                    if (!target.hasOwnProperty(key)) {
                        target[key] = source[key];
                    } else if (
                        typeof source[key] === "object" &&
                        typeof target[key] === "object"
                    ) {
                        deepMerge(source[key], target[key]);
                    }
                }
            }
        }
        console.log(deepMerge(normalData, loadedData));
    };

    return { resetData, compileData, decompileData, saveData, exportData, loadData };
};