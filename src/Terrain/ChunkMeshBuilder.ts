import { BufferAttribute, BufferGeometry, Mesh, MeshPhysicalMaterial, MeshStandardMaterial } from "three";
import { CHUNK_SIZE, type Chunk } from "./Chunk";
import type { TerrainBuilder, Triangle } from "./TerrainBuilder";
import type { Vector3 } from "../Core/Vector3";
import type { ChunkData } from "./ChunkData";
import { RAPIER } from "../RapierInstance";
import type { ColliderDesc } from "@dimforge/rapier3d-compat";

type ChunkMeshBuilderReturnType = {
    mesh?: Mesh;
    colliderDesc?: ColliderDesc;
}

export class ChunkMeshBuilder {

    private terrainBuilder: TerrainBuilder;

    constructor(terrainMeshBuilder: TerrainBuilder) {

        this.terrainBuilder = terrainMeshBuilder;

    }


    buildChunkMesh(chunk: Chunk, position: Vector3, neighborPosX: Chunk, neighborPosZ: Chunk, neighborPosY: Chunk, neighborCornerXZ: Chunk,  neighborCornerXY: Chunk, neighborCornerZY: Chunk, neighborCornerXYZ: Chunk) : ChunkMeshBuilderReturnType {
        
        if (!neighborPosX) throw new Error("Neighbor chunk X is null");
        if (!neighborPosY) throw new Error("Neighbor chunk Y is null");
        if (!neighborPosZ) throw new Error("Neighbor chunk Z is null");

        const triList: Triangle[] = this.terrainBuilder.generateTerrainChunk(chunk, neighborPosX, neighborPosZ, neighborPosY, neighborCornerXZ, neighborCornerXY, neighborCornerZY, neighborCornerXYZ);
        const geometry = new BufferGeometry();
        
        let geometryList: number[] = [];
        let colorList: number[] = [];

        for (const tri of triList) {
            geometryList.push(tri.a[0], tri.a[1], tri.a[2]);
            geometryList.push(tri.b[0], tri.b[1], tri.b[2]);
            geometryList.push(tri.c[0], tri.c[1], tri.c[2]);
            colorList.push(tri.color[0] / 255, tri.color[1] / 255, tri.color[2] / 255);
            colorList.push(tri.color[0] / 255, tri.color[1] / 255, tri.color[2] / 255);
            colorList.push(tri.color[0] / 255, tri.color[1] / 255, tri.color[2] / 255);

        }

        console.log("Vertex list has: ", triList.length, " items");

        if (triList.length == 0) {
            return {}
        }

        const vertices = new Float32Array(geometryList);
        const colors = new Float32Array(colorList);
        geometry.setAttribute("position", new BufferAttribute(vertices, 3));
        geometry.setAttribute("color", new BufferAttribute(colors, 3));
        geometry.computeVertexNormals();



        // Mesh

        const mesh = new Mesh(geometry, new MeshStandardMaterial({color: 0xffffff, vertexColors: true, wireframe: false}));
        mesh.position.set(
            position.x * (CHUNK_SIZE),
            position.y * (CHUNK_SIZE),
            position.z * (CHUNK_SIZE)
        );

        // Create indices list
        const indices = new Uint32Array(triList.length * 3);
        for (let i = 0; i < triList.length * 3; i++) {
            indices[i] = i;
        }

        const colliderDesc = RAPIER.ColliderDesc.trimesh(vertices, indices);
        

        // colliderDesc.setTranslation(position.x * (CHUNK_SIZE), position.y * CHUNK_SIZE, position.z * CHUNK_SIZE);

        return {
            mesh: mesh,
            colliderDesc: colliderDesc
        };

    }
}
