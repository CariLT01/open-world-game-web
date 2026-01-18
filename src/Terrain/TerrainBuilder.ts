import { ISOLEVEL } from "../Config";
import { Vector3, type Vec3Fast } from "../Core/Vector3";
import { Materials, type MaterialData } from "../Materials";
import { CHUNK_SIZE, type Chunk } from "./Chunk";
import type { ChunkData, MaterialIndex } from "./ChunkData";
import { edgeTable, triTable } from "./Data/TriangulationTable";



type Cell = {
    positions: [
        Vec3Fast,
        Vec3Fast,
        Vec3Fast,
        Vec3Fast,
        Vec3Fast,
        Vec3Fast,
        Vec3Fast,
        Vec3Fast
    ];
    values: [number, number, number, number, number, number, number, number];
};


export type Triangle = {
    a: Vec3Fast;
    b: Vec3Fast;
    c: Vec3Fast;
    color: Vec3Fast
};

export class TerrainBuilder {
    constructor() { }

    private addVec3Fast(v1: Vec3Fast, v2: Vec3Fast) {
        return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]] as Vec3Fast;
    }

    private VertexInterp(
        isolevel: number,
        p1: Vec3Fast,
        p2: Vec3Fast,
        valp1: number,
        valp2: number
    ) {
        let mu: number = 0;
        let p: Vec3Fast = [0, 0, 0];

        if (Math.abs(isolevel - valp1) < 0.00001) return p1;
        if (Math.abs(isolevel - valp2) < 0.00001) return p2;
        if (Math.abs(valp1 - valp2) < 0.00001) return p1;
        mu = (isolevel - valp1) / (valp2 - valp1);
        p[0] = p1[0] + mu * (p2[0] - p1[0]);
        p[1] = p1[1] + mu * (p2[1] - p1[1]);
        p[2] = p1[2] + mu * (p2[2] - p1[2]);

        return p;
    }

    private generateCell(cell: Cell, mat: MaterialIndex) {
        let cubeindex = 0;
        if (cell.values[0] < ISOLEVEL) cubeindex |= 1;
        if (cell.values[1] < ISOLEVEL) cubeindex |= 2;
        if (cell.values[2] < ISOLEVEL) cubeindex |= 4;
        if (cell.values[3] < ISOLEVEL) cubeindex |= 8;
        if (cell.values[4] < ISOLEVEL) cubeindex |= 16;
        if (cell.values[5] < ISOLEVEL) cubeindex |= 32;
        if (cell.values[6] < ISOLEVEL) cubeindex |= 64;
        if (cell.values[7] < ISOLEVEL) cubeindex |= 128;

        let vertList: Vec3Fast[] = [];

        const k = edgeTable[cubeindex];
        if (k == undefined) throw new Error("Invalid cube index");

        /* Cube is entirely in/out of the surface */
        if (k == 0) return [];

        /* Find the vertices where the surface intersects the cube */
        if (k & 1)
            vertList[0] = this.VertexInterp(
                ISOLEVEL,
                cell.positions[0],
                cell.positions[1],
                cell.values[0],
                cell.values[1]
            );
        if (k & 2)
            vertList[1] = this.VertexInterp(
                ISOLEVEL,
                cell.positions[1],
                cell.positions[2],
                cell.values[1],
                cell.values[2]
            );
        if (k & 4)
            vertList[2] = this.VertexInterp(
                ISOLEVEL,
                cell.positions[2],
                cell.positions[3],
                cell.values[2],
                cell.values[3]
            );
        if (k & 8)
            vertList[3] = this.VertexInterp(
                ISOLEVEL,
                cell.positions[3],
                cell.positions[0],
                cell.values[3],
                cell.values[0]
            );
        if (k & 16)
            vertList[4] = this.VertexInterp(
                ISOLEVEL,
                cell.positions[4],
                cell.positions[5],
                cell.values[4],
                cell.values[5]
            );
        if (k & 32)
            vertList[5] = this.VertexInterp(
                ISOLEVEL,
                cell.positions[5],
                cell.positions[6],
                cell.values[5],
                cell.values[6]
            );
        if (k & 64)
            vertList[6] = this.VertexInterp(
                ISOLEVEL,
                cell.positions[6],
                cell.positions[7],
                cell.values[6],
                cell.values[7]
            );
        if (k & 128)
            vertList[7] = this.VertexInterp(
                ISOLEVEL,
                cell.positions[7],
                cell.positions[4],
                cell.values[7],
                cell.values[4]
            );
        if (k & 256)
            vertList[8] = this.VertexInterp(
                ISOLEVEL,
                cell.positions[0],
                cell.positions[4],
                cell.values[0],
                cell.values[4]
            );
        if (k & 512)
            vertList[9] = this.VertexInterp(
                ISOLEVEL,
                cell.positions[1],
                cell.positions[5],
                cell.values[1],
                cell.values[5]
            );
        if (k & 1024)
            vertList[10] = this.VertexInterp(
                ISOLEVEL,
                cell.positions[2],
                cell.positions[6],
                cell.values[2],
                cell.values[6]
            );
        if (k & 2048)
            vertList[11] = this.VertexInterp(
                ISOLEVEL,
                cell.positions[3],
                cell.positions[7],
                cell.values[3],
                cell.values[7]
            );

        const triList: Triangle[] = [];
        let ntriang = 0;
        const triIndices = triTable[cubeindex];
        if (!triIndices) return [];

        let color = Materials.get(mat);
        if (!color) {
            console.error("Material not found: ", mat);
            return [];
        };

        for (let i = 0; triIndices[i] !== -1; i += 3) {
            const one = triIndices[i];
            const two = triIndices[i + 1];
            const three = triIndices[i + 2];

            if (one === undefined || two === undefined || three === undefined) {
                throw new Error("Invalid triTable entry");
            }

            // Create a new Triangle and push it immediately

            triList.push({
                a: vertList[three] as Vec3Fast,
                b: vertList[two] as Vec3Fast,
                c: vertList[one] as Vec3Fast,
                color: color.color
            });

            ntriang += 1;
        }

        return triList;
    }



    private _getDensityWith(
        currentChunk: Chunk,
        pos: Vec3Fast,
        neighborPosX: Chunk,
        neighborPosZ: Chunk,
        neighborPosY: Chunk,
        neighborCornerXZ: Chunk,
        neighborCornerXY: Chunk,
        neighborCornerZY: Chunk,
        neighborCornerXYZ: Chunk
    ) {
        let targetChunk = currentChunk;
        let localX = pos[0];
        let localY = pos[1];
        let localZ = pos[2];
        if (
            pos[0] == CHUNK_SIZE &&
            pos[1] == CHUNK_SIZE &&
            pos[2] == CHUNK_SIZE
        ) {
            targetChunk = neighborCornerXYZ;
            localX = 0;
            localY = 0;
            localZ = 0;
        } else if (pos[0] == CHUNK_SIZE && pos[2] == CHUNK_SIZE) {
            targetChunk = neighborCornerXZ;
            localX = 0;
            localZ = 0;
        } else if (pos[0] == CHUNK_SIZE && pos[1] == CHUNK_SIZE) {
            targetChunk = neighborCornerXY;
            localX = 0;
            localY = 0;
        } else if (pos[2] == CHUNK_SIZE && pos[1] == CHUNK_SIZE) {
            targetChunk = neighborCornerZY;
            localZ = 0;
            localY = 0;
        } else if (pos[0] == CHUNK_SIZE) {
            targetChunk = neighborPosX;
            localX = 0;
        } else if (pos[1] == CHUNK_SIZE) {
            targetChunk = neighborPosY;
            localY = 0;
        } else if (pos[2] == CHUNK_SIZE) {
            targetChunk = neighborPosZ;
            localZ = 0;
        }

        if (!targetChunk) {
            throw new Error("Target chunk is null")
        }

        return targetChunk.getDensityAtFast([localX, localY, localZ]);
    }

    private _getBlockWith(
        currentChunk: Chunk,
        pos: Vec3Fast,
        neighborPosX: Chunk,
        neighborPosZ: Chunk,
        neighborPosY: Chunk,
        neighborCornerXZ: Chunk,
        neighborCornerXY: Chunk,
        neighborCornerZY: Chunk,
        neighborCornerXYZ: Chunk
    ) {
        let targetChunk = currentChunk;
        let localX = pos[0];
        let localY = pos[1];
        let localZ = pos[2];
        if (
            pos[0] == CHUNK_SIZE &&
            pos[1] == CHUNK_SIZE &&
            pos[2] == CHUNK_SIZE
        ) {
            targetChunk = neighborCornerXYZ;
            localX = 0;
            localY = 0;
            localZ = 0;
        } else if (pos[0] == CHUNK_SIZE && pos[2] == CHUNK_SIZE) {
            targetChunk = neighborCornerXZ;
            localX = 0;
            localZ = 0;
        } else if (pos[0] == CHUNK_SIZE && pos[1] == CHUNK_SIZE) {
            targetChunk = neighborCornerXY;
            localX = 0;
            localY = 0;
        } else if (pos[2] == CHUNK_SIZE && pos[1] == CHUNK_SIZE) {
            targetChunk = neighborCornerZY;
            localZ = 0;
            localY = 0;
        } else if (pos[0] == CHUNK_SIZE) {
            targetChunk = neighborPosX;
            localX = 0;
        } else if (pos[1] == CHUNK_SIZE) {
            targetChunk = neighborPosY;
            localY = 0;
        } else if (pos[2] == CHUNK_SIZE) {
            targetChunk = neighborPosZ;
            localZ = 0;
        }

        if (!targetChunk) {
            throw new Error("Target chunk is null")
        }

        return targetChunk.getMaterialAtFast([localX, localY, localZ]);
    }

    generateTerrainChunk(
        currentChunk: Chunk,
        neighborPosX: Chunk,
        neighborPosZ: Chunk,
        neighborPosY: Chunk,
        neighborCornerXZ: Chunk,
        neighborCornerXY: Chunk,
        neighborCornerZY: Chunk,
        neighborCornerXYZ: Chunk
    ) {
        const triList: Triangle[] = [];

        for (let rx = 0; rx < CHUNK_SIZE; rx++) {
            console.log("At ", rx);
            for (let ry = 0; ry < CHUNK_SIZE; ry++) {
                for (let rz = 0; rz < CHUNK_SIZE; rz++) {
                    // Build the cell

                    let positionsList: [
                        Vec3Fast,
                        Vec3Fast,
                        Vec3Fast,
                        Vec3Fast,
                        Vec3Fast,
                        Vec3Fast,
                        Vec3Fast,
                        Vec3Fast
                    ] = [
                            [0, 0, 0],
                            [0, 0, 0],
                            [0, 0, 0],
                            [0, 0, 0],
                            [0, 0, 0],
                            [0, 0, 0],
                            [0, 0, 0],
                            [0, 0, 0],
                        ];
                    let densityList: [
                        number,
                        number,
                        number,
                        number,
                        number,
                        number,
                        number,
                        number
                    ] = [0, 0, 0, 0, 0, 0, 0, 0];

                    // Convert to fast vec
                    const blockPosition = new Vector3(rx, ry, rz);

                    let blockPositionFast: Vec3Fast = [rx, ry, rz];
                    positionsList[0] = blockPositionFast;

                    positionsList[1] = this.addVec3Fast(

                        blockPositionFast,

                        [1, 0, 0]

                    );

                    positionsList[2] = this.addVec3Fast(

                        blockPositionFast,

                        [1, 0, 1]

                    );

                    positionsList[3] = this.addVec3Fast(

                        blockPositionFast,

                        [0, 0, 1]

                    );

                    positionsList[4] = this.addVec3Fast(

                        blockPositionFast,

                        [0, 1, 0]

                    );

                    positionsList[5] = this.addVec3Fast(

                        blockPositionFast,

                        [1, 1, 0]

                    );

                    positionsList[6] = this.addVec3Fast(

                        blockPositionFast,

                        [1, 1, 1]

                    );

                    positionsList[7] = this.addVec3Fast(

                        blockPositionFast,

                        [0, 1, 1]

                    );

                    densityList[0] = this._getDensityWith(
                        currentChunk,
                        positionsList[0],
                        neighborPosX,
                        neighborPosZ,
                        neighborPosY,
                        neighborCornerXZ,
                        neighborCornerXY,
                        neighborCornerZY,
                        neighborCornerXYZ
                    );
                    densityList[1] = this._getDensityWith(
                        currentChunk,
                        positionsList[1],
                        neighborPosX,
                        neighborPosZ,
                        neighborPosY,
                        neighborCornerXZ,
                        neighborCornerXY,
                        neighborCornerZY,
                        neighborCornerXYZ
                    );
                    densityList[2] = this._getDensityWith(
                        currentChunk,
                        positionsList[2],
                        neighborPosX,
                        neighborPosZ,
                        neighborPosY,
                        neighborCornerXZ,
                        neighborCornerXY,
                        neighborCornerZY,
                        neighborCornerXYZ
                    );
                    densityList[3] = this._getDensityWith(
                        currentChunk,
                        positionsList[3],
                        neighborPosX,
                        neighborPosZ,
                        neighborPosY,
                        neighborCornerXZ,
                        neighborCornerXY,
                        neighborCornerZY,
                        neighborCornerXYZ
                    );
                    densityList[4] = this._getDensityWith(
                        currentChunk,
                        positionsList[4],
                        neighborPosX,
                        neighborPosZ,
                        neighborPosY,
                        neighborCornerXZ,
                        neighborCornerXY,
                        neighborCornerZY,
                        neighborCornerXYZ
                    );
                    densityList[5] = this._getDensityWith(
                        currentChunk,
                        positionsList[5],
                        neighborPosX,
                        neighborPosZ,
                        neighborPosY,
                        neighborCornerXZ,
                        neighborCornerXY,
                        neighborCornerZY,
                        neighborCornerXYZ
                    );
                    densityList[6] = this._getDensityWith(
                        currentChunk,
                        positionsList[6],
                        neighborPosX,
                        neighborPosZ,
                        neighborPosY,
                        neighborCornerXZ,
                        neighborCornerXY,
                        neighborCornerZY,
                        neighborCornerXYZ
                    );
                    densityList[7] = this._getDensityWith(
                        currentChunk,
                        positionsList[7],
                        neighborPosX,
                        neighborPosZ,
                        neighborPosY,
                        neighborCornerXZ,
                        neighborCornerXY,
                        neighborCornerZY,
                        neighborCornerXYZ
                    );


                    const allInside = densityList.every(v => v < ISOLEVEL);
                    const allOutside = densityList.every(v => v >= ISOLEVEL);

                    if (allInside || allOutside) {
                        continue;
                    }

                    const cell: Cell = {
                        positions: positionsList,
                        values: densityList,
                    };

                    const paletteIndex = currentChunk.getMaterialAtFast([rx, ry, rz]);
                    let material = currentChunk.getMaterialWithPaletteIndex(paletteIndex);
                    
                    if (!material) {
                        console.error(`Material not found: ${paletteIndex}`);
                        return [];
                    }

                    const cellVertList = this.generateCell(cell, material.material);

                    cellVertList.forEach((value) => {
                        triList.push(value);
                    });
                }
            }
        }

        return triList;
    }
}
