import { Vector3 } from "../../../common/Core/Vector3";

export type TreeSpawnData = {
    shouldSpawn: boolean;
    position?: Vector3;
    rotation?: Vector3;
    scale?: Vector3;
}

const TREE_GRID_SIZE = 12;

export class TreesManager {
    private occupied: Set<string> = new Set();

    constructor() {

    }

    getKey(x: number, y: number) {
        return `${x}-${y}`
    }

    occupy(x: number, y: number) {
        this.occupied.add(this.getKey(x, y));
    }

    isOccupied(x: number, y: number) {
        return this.occupied.has(this.getKey(x, y));
    }

    shouldSpawn(cx: number, cz: number): boolean {

        const toTreeCoordsX = Math.floor(cx / TREE_GRID_SIZE);
        const toTreeCoordsY = Math.floor(cz / TREE_GRID_SIZE);

        if (this.isOccupied(toTreeCoordsX, toTreeCoordsY)) {
            return false;
        }
        return true;
    }

    occupyReal(cx: number, cz: number) {
        const toTreeCoordsX = Math.floor(cx / TREE_GRID_SIZE);
        const toTreeCoordsY = Math.floor(cz / TREE_GRID_SIZE);

        this.occupy(toTreeCoordsX, toTreeCoordsY)
    }

}