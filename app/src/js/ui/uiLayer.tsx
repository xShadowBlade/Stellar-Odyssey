/**
 * @file Initiates the ui react layer
 */
// import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

const uiElement = document.createElement("div");
uiElement.style.zIndex = "100";

const uiLayer = createRoot(uiElement);

export { uiLayer };