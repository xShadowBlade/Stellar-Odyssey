Game.dataManagement = (function () {
    const compileData = (data = Game["data"]) => LZString144.compressToBase64(JSON.stringify(data));
    const decompileData = (data = localStorage.getItem("data")) => JSON.parse(LZString144.decompressFromBase64(data));
    const saveData = function () {
        if (!Game["data"]) {return} //check if data exists
        Game["data"].playtime.timeLastPlayed = Date.now();
        localStorage.setItem("data", compileData());
        console.log("Game Saved");
    }
    const exportData = function () { 
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
    }
    const loadData = function (loadedData = decompileData()) {
        if (!Game["data"]) {return} //check if data exists
        // if (Game["data"].playtime.timeLastPlayed != 0) {Game["data"].playtime.passive += Date.now() - Game["data"].playtime.timeLastPlayed;}
        
        // let loadedData = decompileData();
        console.log(loadedData);

        // if (localStorage.getItem("data")) console.log(decompileData(localStorage.getItem("data")));

        // Sample function E()
        // function E(value) {
        //     // Replace this with your implementation of function E()
        //     return `Processed: ${value}`;
        // }

        // Recursive function to process object properties
        function processObject(obj) {
            for (const prop in obj) {
                if (typeof obj[prop] === 'string') {
                    try {
                        const processedValue = E(obj[prop]);
                        obj[prop] = processedValue.process;
                    } catch (error) {
                        // Handle any errors from function E()
                        console.error(`Error processing value: ${obj[prop]}`);
                    }
                } else if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                    processObject(obj[prop]); // Recurse into nested objects
                }
            }
        }

        // Example object

        // Process the object
        processObject(loadedData);

        console.log(loadedData);  
    }
    return { compileData, decompileData, saveData, exportData, loadData }
})();