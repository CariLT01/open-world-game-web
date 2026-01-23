import { NetworkHandler } from "./NetworkHandler";
import { PlayersManager } from "./PlayersManager";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class Server {

    private networkingHandler!: NetworkHandler;
    private playersManager!: PlayersManager;

    constructor() {
        this._createServer();
    }   

    private _createServer() {
        console.log("Server initializing...");
        this.networkingHandler = new NetworkHandler();
        this.playersManager = new PlayersManager();
        console.log("Server initialized!");
    }

    async tick() {
        this.networkingHandler.tick();
        this.playersManager.tick();
    }

    async run() {
        console.log("Server running");

        while (true) {
            await this.tick();
            await sleep(50);
        }
    }

}