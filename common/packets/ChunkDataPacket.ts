import { ChunkData, type MaterialIndex, type PaletteIndex } from "../ChunkData";
import { Vector3 } from "../Core/Vector3";
import { game } from "../generated/proto";
import type { IPacket } from "./IPacket";
import { PacketTypes } from "./PacketTypes";

type PaletteType = {
    attributes: { [k: string]: { type: string; value: string } };
    materialIndex: MaterialIndex;
    hash: number;
};

export class ChunkDataPacket implements IPacket {
    chunkData?: ChunkData;
    position?: Vector3;
    packetType = PacketTypes.CHUNK_DATA_PACKET;

    serialize() {
        if (!this.chunkData) {
            throw new Error("No chunk data");
        }
        if (!this.position) {
            throw new Error("No chunk position");
        }

        const wasFrozen = this.chunkData.getIsFrozen();

        if (wasFrozen) {
            this.chunkData.unfreeze();
        }

        const palette: PaletteType[] = [];
        const paletteIndices: number[] = [];

        for (const [paletteIndex, content] of this.chunkData.getPalette()) {
            paletteIndices.push(paletteIndex);
        }
        paletteIndices.sort();

        for (const paletteIndex of paletteIndices) {
            const paletteContent = this.chunkData
                .getPalette()
                .get(paletteIndex as PaletteIndex)!;

            palette.push({
                hash: paletteContent.hash,
                attributes: {},
                materialIndex: paletteContent.material,
            });
        }

        const encodedPacket = game.ChunkData.encode({
            palette: palette,
            materialsData: Array.prototype.slice.call(
                this.chunkData.getMaterialsBuffer(),
            ),
            densitiesData: Array.prototype.slice.call(
                this.chunkData.getDensitiesBuffe(),
            ),
            chunkPosition: {
                x: this.position.x,
                y: this.position.z,
                z: this.position.z,
            },
        }).finish();

        if (wasFrozen) {
            this.chunkData.freeze();
        }

        return encodedPacket;
    }

    deserialize(data: Uint8Array): void {
        const decodedPacket = game.ChunkData.decode(data);

        if (!decodedPacket.chunkPosition) {
            throw new Error("No chunk position");
        }

        this.position = new Vector3(
            decodedPacket.chunkPosition.x ?? 0,
            decodedPacket.chunkPosition.y ?? 0,
            decodedPacket.chunkPosition.z ?? 0,
        );

        const materialsData = decodedPacket.materialsData;
        if (!materialsData) {
            throw new Error("No mats");
        }
        const densitiesData = decodedPacket.densitiesData;
        if (!densitiesData) {
            throw new Error("No densities");
        }
        const palette = decodedPacket.palette;
        if (!palette) {
            throw new Error("No paleette");
        }

        const chunkData = new ChunkData();

        for (let i = 0; i < materialsData.length; i++) {
            const density = densitiesData[i] ?? 0;
            const paletteIndex = materialsData[i] ?? 0;
            const paletteEntry = palette[paletteIndex];
            if (!paletteEntry) {
                throw new Error(
                    "Could not find palette entry: " + paletteIndex,
                );
            }

            chunkData.setBlockAtIndex(
                i,
                density,
                {
                    material: (paletteEntry.materialIndex ??
                        0) as MaterialIndex,
                    hash: paletteEntry.hash ?? 0,
                    properties: new Map(),
                },
                false,
            );
        }
        
        chunkData.flushPaletteChanges();

        this.chunkData = chunkData;
    }
}
