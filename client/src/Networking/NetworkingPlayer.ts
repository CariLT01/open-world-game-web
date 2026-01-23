import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from "three";
import { Vector3 } from "../../../common/Core/Vector3";
import { ClientEventBus } from "../ClientEventBus";
import { EventBusEvent } from "../../../common/EventTypes";

export class NetworkingPlayer {
    private username: string;
    private position: Vector3 = new Vector3(0, 0, 0);

    private threeMesh!: Mesh;

    constructor(username: string) {
        this.username = username;

        this._createMesh();
    }


    private _createMesh() {
        const geometry = new BoxGeometry(1, 2, 1);
        const material = new MeshBasicMaterial({color: 0xff0000});

        this.threeMesh = new Mesh(geometry, material);

        ClientEventBus.fireEvent(EventBusEvent.CLIENT_ADD_TO_SCENE, {object: this.threeMesh});
    }

    updatePosition(newPosition: Vector3) {
        this.position = newPosition;

        this.threeMesh.position.set(this.position.x, this.position.y, this.position.z);
    }



}