import { EventBusEvent } from "../../common/EventTypes";
import type { IPacket } from "../../common/packets/IPacket";
import { ClientEventBus } from "./ClientEventBus";
import { ClientPacketProcessor } from "./Networking/ClientPacketProcessor";

export class ClientNetworkingHandler {

    private socket: WebSocket | null = null;
    private connected: boolean = false;

    private queuedPackets: Uint8Array[] = [];

    private packetProcessor: ClientPacketProcessor = new ClientPacketProcessor();

    constructor() {
        this.socket = null;


        this._registerEvents();
    }

    connect() {

        console.log("Connecting to the server...");

        this.socket = new WebSocket("ws://localhost:5500");
        this.socket.binaryType = "arraybuffer";
        this.socket.addEventListener("open", () => {
            this.connected = true;
            console.log("Connected to server");

            ClientEventBus.fireEvent(EventBusEvent.CLIENT_SOCKET_CONNECTED, {});
        });

        this.socket.addEventListener("error", (e) => {
            throw new Error("Failed to connect to server");
        })

        this.socket.onmessage = (event) => {
            if (event.data instanceof ArrayBuffer) {
                const buffer = new Uint8Array(event.data);
                this.queuedPackets.push(buffer);
            } else {
                console.warn("Received non-binary message:", event.data);
            }
        }
    }

    private _registerEvents() {
        ClientEventBus.on(EventBusEvent.SEND_PACKET, (data) => {
            if (!this.connected) {
                throw new Error("Could not send while not connected");
            }

            if (!this.socket) {
                throw new Error("No socket");
            }

            const packetBuffer = data.packet.serialize();
            const finalBuffer = new Uint8Array(1 + packetBuffer.byteLength);
            finalBuffer[0] = data.packet.packetType;
            finalBuffer.set(packetBuffer, 1)


            this.socket.send(finalBuffer);
        })
    }

    tick() {

        for (const packet of this.queuedPackets) {
            this.packetProcessor.processPacket(packet);
        }
        this.queuedPackets.length = 0;
    }
}