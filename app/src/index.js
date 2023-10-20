// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";

// // import reportWebVitals from "./reportWebVitals";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//     <App />,
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

/**
 * @fileOverview Defines a React component for a Pixi.js game using
 * @module MyPixiApp
 */
import React, { useEffect, useState } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { Stage, useApp } from "@pixi/react";
import * as PIXI from "pixi.js";
import Loader from "./loader";

import "./css/index.css";
import "./css/loading.css";

const App = () => {
    // const app = useApp();

    // useEffect(() => {
    // // Your initialization logic goes here

    //     // Set the background color
    //     app.renderer.backgroundColor = 0x000000;

    //     // Create a background
    //     const background = new PIXI.Graphics();
    //     background.beginFill(0x000000);
    //     background.drawRect(0, 0, app.view.width, app.view.height);
    //     background.endFill();
    //     app.stage.addChild(background);

    //     // Set the event mode for the stage
    //     app.stage.interactive = true;
    //     app.stage.interactiveChildren = false;

    //     // Resize event listener
    //     const handleResize = () => {
    //         const newWidth = window.innerWidth;
    //         const newHeight = window.innerHeight;

    //         // Resize the renderer
    //         app.renderer.resize(newWidth, newHeight);

    //         // Resize the background
    //         background.clear();
    //         background.beginFill(0x000000);
    //         background.drawRect(0, 0, newWidth, newHeight);
    //         background.endFill();
    //     };

    //     // Attach the resize event listener
    //     window.addEventListener("resize", handleResize);

    //     // Cleanup on unmount
    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, [app]);
    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            options={{
                background: 0x000000,
                resizeTo: window,
            }}
        />
    );
};
const rootElem = document.createElement("div");
document.body.appendChild(rootElem);
const root = createRoot(rootElem);
root.render(<App />);