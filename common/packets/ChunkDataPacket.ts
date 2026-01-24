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

            if (paletteContent.material === null) {
                throw new Error("No material");
            }

            palette.push({
                hash: paletteContent.hash,
                attributes: {},
                materialIndex: paletteContent.material,
            });
        }

        const materialsArray = Array.from(this.chunkData.getMaterialsBuffer());
        const densitiesArray = Array.from(this.chunkData.getDensitiesBuffer());

        console.log("Mat l: ", materialsArray.length, " dens l: ", densitiesArray.length);

        const encodedPacket = game.ChunkData.encode({
            palette: palette,
            materialsData: materialsArray,
            densitiesData: densitiesArray,
            chunkPosition: {
                x: this.position.x,
                y: this.position.y,
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

        if (decodedPacket.chunkPosition.x == null || decodedPacket.chunkPosition.y == null || decodedPacket.chunkPosition.z == null) {
            throw new Error("XYZ of chunk position not defined");
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

        let instancesInvalidPaletteCount = 0;

        for (let i = 0; i < materialsData.length; i++) {
            const density = densitiesData[i] ?? 0;
            const paletteIndex = materialsData[i] ?? 0;
            const paletteEntry = palette[paletteIndex];
            if (!paletteEntry) {
                // console.error(palette);
                //console.warn(
                //    "Could not find palette entry: " + paletteIndex, "; setting voxel to AIR"
                //);
                instancesInvalidPaletteCount++;

                chunkData.setBlockAtIndex(
                    i,
                    0.0,
                    {
                        material: 0 as MaterialIndex,
                        hash: 0,
                        properties: new Map(),
                    },
                    false

                )
                continue;
            }

            if (paletteEntry.materialIndex === undefined) {
                console.warn("No material index at: ", i, " setting to 0 (air)");
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
        if (instancesInvalidPaletteCount > 0) {
            console.warn(`There were ${instancesInvalidPaletteCount} voxels filled with AIR because palette entry could not be found!`);
        }

        this.chunkData = chunkData;
    }
}
