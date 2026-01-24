import WebSocket, { WebSocketServer } from "ws";
import { PacketProcessor } from "./packets/PacketProcessing";
import { ServerEventBus } from "./ServerEventBus";
import { EventBus } from "../../common/EventBus";
import { EventBusEvent } from "../../common/EventTypes";
import type { IPacket } from "../../common/packets/IPacket";

type PacketEntry = {
    ws: WebSocket,
    data: Uint8Array
}

export class NetworkHandler {

    private wss!: WebSocketServer;
    private packetProcessor!: PacketProcessor;

    private queuedPackets: PacketEntry[] = [];

    private sockets: Map<string, WebSocket> = new Map();


    constructor() {
        this._create();
        this._registerEvent();
    }

    private _registerEvent() {
        ServerEventBus.on(EventBusEvent.SEND_PACKET, (data) => {
            const packetBuffer = data.packet.serialize();
            const finalBuffer = new Uint8Array(1 + packetBuffer.byteLength);
            finalBuffer[0] = data.packet.packetType;
            finalBuffer.set(packetBuffer, 1)

            for (const client of this.wss.clients) {
                client.send(finalBuffer);
            }
        });

        ServerEventBus.on(EventBusEvent.SEND_PACKET_TO_CONNECTION, (data) => {

            const packetBuffer = data.packet.serialize();
            const finalBuffer = new Uint8Array(1 + packetBuffer.byteLength);
            finalBuffer[0] = data.packet.packetType;
            finalBuffer.set(packetBuffer, 1)

            data.connection.send(finalBuffer);
        })
    }

    private _create() {

        const getUuid = (len = 8) => Math.random().toString(36).substring(2, 2 + len);

        this.packetProcessor = new PacketProcessor();

        this.wss = new WebSocketServer({ port: 5500 });

        this.wss.on("connection", (ws) => {
            console.log("Client connected");

            const uuid = getUuid();
            this.sockets.set(uuid, ws);


            ws.on("close", () => {
                console.log("Client disconnected");

                if (this.sockets.has(uuid)) {
                    this.sockets.delete(uuid);
                }

                ServerEventBus.fireEvent(EventBusEvent.SERVER_PLAYER_LEFT_WS, {ws: ws});
            })

            ws.on("message", (data) => {
                // console.log("I have received: ", data, ", but I have no idea what it means :(");


                let uint8Array: Uint8Array;

                if (Array.isArray(data)) {
                    // If it's an array of buffers, concatenate them first
                    uint8Array = new Uint8Array(Buffer.concat(data));
                } else if (data instanceof ArrayBuffer) {
                    // If it's a raw ArrayBuffer
                    uint8Array = new Uint8Array(data);
                } else {
                    // It's already a Buffer (which is a Uint8Array)
                    uint8Array = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
                }

                this.queuedPackets.push({
                    ws: ws,
                    data: uint8Array
                });
            })
        })
    }

    tick() {
        for (const packet of this.queuedPackets) {
            this.packetProcessor.processPacket(packet.data, packet.ws);
        }
        this.queuedPackets.length = 0;
    }
}