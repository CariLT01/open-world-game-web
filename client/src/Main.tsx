import { createRoot } from "react-dom/client";
import { Game } from "./Game";
import React from "react";
import { App } from "./Components/App";

async function onLoad() {


    const root = createRoot(document.getElementById("root")!);
    root.render(
        <React.StrictMode>
            <App></App>
        </React.StrictMode>
    )

    const g = new Game();
    await g.initialize();
    await g.renderLoop();
}

window.onload = onLoad;