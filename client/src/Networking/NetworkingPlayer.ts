import { BoxGeometry, Euler, Group, Mesh, MeshBasicMaterial, Scene } from "three";
import { Vector3 } from "../../../common/Core/Vector3";
import { ClientEventBus } from "../ClientEventBus";
import { EventType } from "../../../common/EventTypes";
import { ItemModelLoader } from "../Models/ItemModelLoader";
import { ItemModels } from "../Data/models/Items";
import { ItemModelTypes } from "../Data/models/ModelTypes";

export class NetworkingPlayer {
    private username: string;
    private position: Vector3 = new Vector3(0, 0, 0);

    private threeMesh!: Mesh;
    private handheldItem: Group | null = null;

    constructor(username: string) {
        this.username = username;

        this._createMesh();
    }


    private _createMesh() {
        const geometry = new BoxGeometry(1, 2, 1);
        const material = new MeshBasicMaterial({color: 0xff0000});

        this.threeMesh = new Mesh(geometry, material);

        ClientEventBus.invokeEvent(EventType.CLIENT_ADD_TO_SCENE, {object: this.threeMesh});
    }

    updatePosition(newPosition: Vector3) {
        this.position = newPosition;

        this.threeMesh.position.set(this.position.x, this.position.y, this.position.z);
    }

    dispose() {
        ClientEventBus.invokeEvent(EventType.CLIENT_REMOVE_FROM_SCENE, {object: this.threeMesh});
        this.threeMesh.geometry.dispose();
    }

    async setHeldItem(itemName: string) {
        if (this.handheldItem) {
            this.threeMesh.remove(this.handheldItem);
        }

        if (!itemName) return;

        const modelData = ItemModels[itemName];
        if (!modelData) return;

        if (modelData.type != ItemModelTypes.CUSTOM) return;
        
        const texture = modelData.data.texture;

        const itemMesh = await ItemModelLoader.loadItem(itemName, texture);
        if (!itemMesh) return;

        
        this.handheldItem = itemMesh;
        // apply transform

        this.handheldItem.position.copy(modelData.data.transform.hand.offset);
        this.handheldItem.rotation.copy(new Euler().setFromVector3(modelData.data.transform.hand.rotation));
        this.handheldItem.scale.copy(modelData.data.transform.hand.scale);

        // add to scene

        this.threeMesh.add(this.handheldItem);

    }



}