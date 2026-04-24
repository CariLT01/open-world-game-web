import { Euler, Mesh } from "three";
import { Vector3 } from "../../../common/Core/Vector3";
import { PROP_MODELS, type PropModelKey } from "../Data/models/PropModels";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { ClientEventBus } from "../ClientEventBus";
import { EventType } from "../../../common/EventTypes";

export type WorldPropModel = {
    mesh: Mesh | null;
    position: Vector3;
    rotation: Vector3;
    scale: Vector3;
    id: number;
    initialized: boolean;
}

export class ModelManager {

    private models: Map<number, WorldPropModel> = new Map();
    private cachedMeshProvider: Map<string, Mesh> = new Map();
    private loader: GLTFLoader = new GLTFLoader();



    constructor() {

    }

    private async _loadMesh(path: string) {
        const scene = await this.loader.loadAsync(path);

        let firstMesh: Mesh | null = null;

        scene.scene.traverse((child) => {
            if (child instanceof Mesh) {
                if (firstMesh === null) {
                    firstMesh = child as Mesh
                } else {
                    console.warn("prop loader ignored other object in gltf scene");
                }
            }
        })

        if (!firstMesh) {
            throw new Error("No model found in GLTF file");
        }

        return firstMesh as Mesh;
    }

    private async _getModel(model: PropModelKey) {
        const modelPath = PROP_MODELS[model];
        if (this.cachedMeshProvider.has(modelPath)) {
            console.log("Serving model from mem cache: ", model);
            return this.cachedMeshProvider.get(modelPath)!.clone(true)
        } else {
            console.log("Downloading model: ", model)
            const loadedMesh = await this._loadMesh(modelPath);
            this.cachedMeshProvider.set(modelPath, loadedMesh);
            return loadedMesh.clone(true);
        }
    }

    private async _propInitAsync(model: PropModelKey, id: number) {
        const propMesh = await this._getModel(model);
        if (!this.models.has(id)) {
            console.warn("model deleted after loading complete");
            return;
        }

        const propInstance = this.models.get(id)!;
        propInstance.mesh = propMesh;
        propInstance.initialized = true;
        console.log("prop initialization complete: ", model);

        ClientEventBus.invokeEvent(EventType.CLIENT_ADD_TO_SCENE, {
            object: propMesh
        });
    }

    private _initializeProp(model: PropModelKey, id: number, position: Vector3, rotation: Vector3, scale: Vector3) {

        if (this.models.has(id)) {
            console.warn("ignored prop with same id: ", id);
            return;
        }

        // first create
        const newProp: WorldPropModel = {
            "id": id,
            "initialized": false,
            "mesh": null,
            "position": position,
            "rotation": rotation,
            "scale": scale
        }

        this.models.set(id, newProp);
        
        // run async init
        // runs the deferred initialization for downloading things
        this._propInitAsync(model, id);
        
        
    }

    addModel(model: PropModelKey, id: number, position: Vector3, rotation: Vector3, scale: Vector3) {
        console.log("streamed prop: ", id);
        this._initializeProp(model, id, position, rotation, scale);
    }

    private _updateMesh(prop: WorldPropModel) {
        if (!prop.initialized) {
            return;
        }

        if (!prop.mesh) {
            console.warn("no prop mesh, but marked as initialized");
            return;
        }

        const eulerRotation = new Euler(prop.rotation.x, prop.rotation.y, prop.rotation.z);

        prop.mesh.position.copy(prop.position.toThreeVec3());
        prop.mesh.rotation.copy(eulerRotation);
        prop.mesh.scale.copy(prop.scale.toThreeVec3());

    }

    updatePropState(id: number, position: Vector3, rotation: Vector3, scale: Vector3) {
        if (!this.models.has(id)) {
            console.warn("received packet for prop id that does not exist on client: ", id);
            return;
        }

        const propInstance = this.models.get(id)!;
        
        propInstance.position = position;
        propInstance.rotation = rotation;
        propInstance.scale = scale;

        this._updateMesh(propInstance);
    }

    deleteProp(id: number) {
        if (!this.models.has(id)) {
            console.warn("cannot delete non-existent prop model id: ", id);
            return;
        }
        this.models.delete(id);
    }
}