import { Euler, Group, Mesh } from "three";
import { Vector3 } from "../../../common/Core/Vector3";
import { PROP_MODELS, type PropModelKey } from "../Data/models/PropModels";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { ClientEventBus } from "../ClientEventBus";
import { EventType } from "../../../common/EventTypes";
import { toChunkCoord } from "../../../common/Core/CoordUtils";

export type WorldPropModel = {
    mesh: Group | null;
    position: Vector3;
    rotation: Vector3;
    scale: Vector3;
    id: number;
    initialized: boolean;
}

export class PropsManager {

    private models: Map<number, WorldPropModel> = new Map();
    private cachedMeshProvider: Map<string, Group> = new Map();
    private loader: GLTFLoader = new GLTFLoader();

    private propsChunksTracker: Map<number, Vector3> = new Map();
    private chunksPropsTracker: Map<string, Set<number>> = new Map();

    constructor() {
        this._hookEvents();
    }

    private _hookEvents() {
        ClientEventBus.on(EventType.CLIENT_UNLOAD_CHUNK, data => {
            const chunkPosition = data.position;
            if (!this.chunksPropsTracker.has(chunkPosition.toKey())) {
                console.warn("Cannot untrack chunk: cannot find tracker");
                return;
            }

            const propsList = this.chunksPropsTracker.get(chunkPosition.toKey())!;
            for (const prop of propsList) {
                this.deleteProp(prop);
            }

            console.log("Untracked with unload: ", propsList.size, " props");
        })

        ClientEventBus.on(EventType.CLIENT_PROPS_RECEIVED, data => {

            console.log("Received props");


            const position = data.position;

            if (!this.chunksPropsTracker.has(position.toKey())) {
                this.chunksPropsTracker.set(position.toKey(), new Set());
            }

            const props = data.props;

            console.log("received ", props.length, " props")

            for (const prop of props) {
                this.addModel(prop.modelName as PropModelKey, prop.id, prop.position, prop.rotation, prop.scale);
            }

        })
    }

    private async _loadMesh(path: string) {
        const scene = await this.loader.loadAsync(path);


        return scene.scene;
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

        this._updateMesh(propInstance);

        console.log("prop initialization complete: ", model);

        ClientEventBus.invokeEvent(EventType.CLIENT_ADD_TO_SCENE, {
            object: propMesh
        });
    }

    private _retrackProp(propId: number) {
        if (!this.models.has(propId)) {
            throw new Error("Prop ID does not exist: " + propId);
        }

        const propInstance = this.models.get(propId)!;
        const currentChunkPosition = toChunkCoord(propInstance.position);

        if (this.propsChunksTracker.has(propId)) {
            const lastChunkPosition = this.propsChunksTracker.get(propId)!;
            if (lastChunkPosition.toKey() == currentChunkPosition.toKey()) {
                // nothing changed
                return;
            } else {
                // move it
                // delete the last instance of it

                const propsInChunkList = this.chunksPropsTracker.get(lastChunkPosition.toKey());
                if (!propsInChunkList) {
                    console.warn("chunk list not found");
                    return;
                }
                propsInChunkList.delete(propId);

                // move it to new one

                if (!this.chunksPropsTracker.has(currentChunkPosition.toKey())) {
                    this.chunksPropsTracker.set(currentChunkPosition.toKey(), new Set());
                }

                const propsInNewChunk = this.chunksPropsTracker.get(currentChunkPosition.toKey())!;
                propsInNewChunk.add(propId);

                // set itself to new one
                this.propsChunksTracker.set(propId, currentChunkPosition);

            }
        } else {
            // set list
            if (!this.chunksPropsTracker.has(currentChunkPosition.toKey())) {
                this.chunksPropsTracker.set(currentChunkPosition.toKey(), new Set());
            }

            const propsInCurrentChunk = this.chunksPropsTracker.get(currentChunkPosition.toKey())!;
            propsInCurrentChunk.add(propId);

            // set itself to new one
            this.propsChunksTracker.set(propId, currentChunkPosition);

        }



    }

    private _untrackProp(propId: number) {
        const propInstance = this.models.get(propId);
        if (!propInstance) {
            throw new Error("prop instance not found");
        }

        if (!this.propsChunksTracker.get(propId)) {
            throw new Error("prop does not exist");
        }

        const originalChunk = toChunkCoord(propInstance.position);

        this.propsChunksTracker.delete(propId);
        const propList = this.chunksPropsTracker.get(originalChunk.toKey());
        if (!propList) {
            console.warn("prop list not found");
            return;
        }

        propList.delete(propId);

        // remove mesh
        if (propInstance.mesh) {
            ClientEventBus.invokeEvent(EventType.CLIENT_REMOVE_FROM_SCENE, {
                object: propInstance.mesh
            })
        }



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
        this._retrackProp(id);


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

        this._retrackProp(prop.id);

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
        this._untrackProp(id);
        this.models.delete(id);
    }
}