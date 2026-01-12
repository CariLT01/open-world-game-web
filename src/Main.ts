import { Game } from "./Game";

async function onLoad() {
    const g = new Game();
    await g.initialize();
    await g.renderLoop();
}

window.onload = onLoad;