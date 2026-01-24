import { ChunkData, type MaterialIndex } from "../../common/ChunkData";
import { CHUNK_SIZE } from "../../common/Config";
import { Vector3 } from "../../common/Core/Vector3";
import { Materials } from "../../common/Materials";

export class TerrainGenerator {
    constructor() {}

    generateTerrain(chunkPosition: Vector3) {
        const chunkData = new ChunkData();

        if (chunkData.getIsFrozen()) {
            chunkData.unfreeze();
        }

        for (let x = 0; x < CHUNK_SIZE; x++) {
            for (let z = 0; z < CHUNK_SIZE; z++) {
                const terrainHeight = 15;
                for (let y = 0; y < CHUNK_SIZE; y++) {
                    const currentHeight = chunkPosition.y * CHUNK_SIZE + y;

                    if (currentHeight < terrainHeight) {
                        chunkData.setBlockAt(
                            new Vector3(x, y, z),
                            1.0,
                            {
                                material: 2 as MaterialIndex,
                                hash: 1239,
                                properties: new Map(),
                            },
                            false,
                        );
                    } else {
                        chunkData.setBlockAt(
                            new Vector3(x, y, z),
                            0.0,
                            {
                                material: 0 as MaterialIndex,
                                hash: 3918,
                                properties: new Map(),
                            },
                            false,
                        );
                    }
                }
            }
        }

        chunkData.flushPaletteChanges();

        chunkData.freeze();

        return chunkData;
    }
}
