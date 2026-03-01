import { Ray, type World } from "@dimforge/rapier3d-compat";
import { Vector3 } from "../../common/Core/Vector3";

export type RayParams = {
    origin: Vector3;
    direction: Vector3;
    maxDistance: number;
}

export type RayHit = {
    position: Vector3;
    normal: Vector3;
    distance: number;
}

export class RaycasterClass {

    private world?: World;

    constructor() {
        
    }

    setWorld(world: World) {
        this.world = world;
    }

    raycast(ray: RayParams) : RayHit | undefined {
        if (!this.world) {
            throw new Error("No world set");
        }

        const solid = true;
        

        const rRay = new Ray(ray.origin.toRapierVec3(), ray.direction.toRapierVec3());
        const hit = this.world.castRayAndGetNormal(rRay, ray.maxDistance, solid);
        
        if (!hit) {
            return;
        }

        const hitPoint = rRay.pointAt(hit.timeOfImpact);

        return {
            position: Vector3.fromRapierVec3(hitPoint),
            normal: Vector3.fromRapierVec3(hit.normal),
            distance: hit.timeOfImpact
        }
    }
}

export const Raycaster = new RaycasterClass();