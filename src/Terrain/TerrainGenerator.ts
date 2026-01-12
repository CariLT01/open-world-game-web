
import { SimplexNoise } from "three/examples/jsm/Addons.js";
import { Vector3 } from "../Core/Vector3";
import { Chunk, CHUNK_SIZE } from "./Chunk";
import type { MaterialIndex } from "./ChunkData";

export class TerrainGenerator {

    private simplex: SimplexNoise = new SimplexNoise();

    constructor() {

    }

    generateTerrainOf(chunk: Chunk, chunkPosition: Vector3) {

        const surfaceThickness = 3;

        for (let x = 0; x < CHUNK_SIZE; x++) {
            for (let z = 0; z < CHUNK_SIZE; z++) {



                for (let y = 0; y < CHUNK_SIZE; y++) {


                    const worldPosition = new Vector3(chunkPosition.x * CHUNK_SIZE + x,  chunkPosition.y * CHUNK_SIZE + y, chunkPosition.z * CHUNK_SIZE + z);

                    const noise = this.simplex.noise3d(worldPosition.x / 50, worldPosition.y / 50, worldPosition.z / 50);
                    const worldHeight = noise * 25;

                    const worldY = chunkPosition.y * CHUNK_SIZE + y;

                    if (worldY < worldHeight) {
                        const density = Math.max(0, (worldHeight - worldY) / surfaceThickness);
                        //const density = Math.random();


                        chunk.setDensityAndMaterialAt(new Vector3(x, y, z), density, {
                            material: 1 as MaterialIndex,
                            properties: new Map(),
                            hash: 12938
                        });
                    }
                }


            }
        }
    }
}