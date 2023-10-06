/**
 * @fileOverview Defines a React component for a Pixi.js game using @inlet/react-pixi.
 * @module MyPixiApp
 */
"use strict";

import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Stage, useApp } from "@pixi/react";
import * as PIXI from "pixi.js";

const App = () => {
    const app = useApp();

    useEffect(() => {
    // Your initialization logic goes here

        // Set the background color
        app.renderer.backgroundColor = 0x000000;

        // Create a background
        const background = new PIXI.Graphics();
        background.beginFill(0x000000);
        background.drawRect(0, 0, app.view.width, app.view.height);
        background.endFill();
        app.stage.addChild(background);

        // Set the event mode for the stage
        app.stage.interactive = true;
        app.stage.interactiveChildren = false;

        // Resize event listener
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            // Resize the renderer
            app.renderer.resize(newWidth, newHeight);

            // Resize the background
            background.clear();
            background.beginFill(0x000000);
            background.drawRect(0, 0, newWidth, newHeight);
            background.endFill();
        };

        // Attach the resize event listener
        window.addEventListener("resize", handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [app]);

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            options={{
                background: 0x000000,
                resizeTo: window,
            }}
        >
            {/* Your Pixi.js components go here */}
        </Stage>
    );
};

const root = createRoot(document);
root.render(<App />);