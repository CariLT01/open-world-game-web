import { BoxGeometry, Euler, Mesh, MeshStandardMaterial, NearestFilter, Object3D, TextureLoader, type Camera } from "three";
import { EventBusEvent } from "../../common/EventTypes";
import { ClientEventBus } from "./ClientEventBus";
import type { ItemStack } from "../../common/ItemStack";
import { ItemData } from "./Data/ItemsData";
import { ItemModels } from "./Data/models/Items";
import { ItemModelTypes } from "./Data/models/ModelTypes";
import { ItemModelLoader } from "./Models/ItemModelLoader";
import { QuadraticSpline } from "../../common/math/QuadraticSpline";
import { Vector3 } from "../../common/Core/Vector3";

export class HeldItem {

    private mesh: Object3D | null = null;
    private geometry: BoxGeometry | null = null;
    private camera: Camera;

    private loader: TextureLoader;

    private attackAnimationFrame: number = 0;
    private ATTACK_ANIMATION_LENGTH: number = 20;
    private attackAnimationActive: boolean = false;

    private baseRotation: Vector3 = Vector3.zero();

    private attackAnimation: QuadraticSpline = new QuadraticSpline(
        [
            {
                x: 0,
                y: 0
            },
            {
                x: 0.5,
                y: -1.4
            },
            {
                x: 0.8,
                y: -0.2
            },
            {
                x: 1,
                y: 0
            }
        ]
    );

    private attackAnimation2: QuadraticSpline = new QuadraticSpline(
        [
            {
                x: 0,
                y: 0
            },
            {
                x: 0.5,
                y: 0.6
            },
            {
                x: 0.8,
                y: 0.1
            },
            {
                x: 1,
                y: 0
            }
        ]
    );

    constructor(camera: Camera) {

        this.loader = new TextureLoader();
        this.camera = camera;

        ClientEventBus.on(EventBusEvent.CLIENT_HANDHELD_ITEM_UPDATE, (data) => {
            this._updateHeldItem(data.stack);
        });

        this._registerEvents();
    }

    private async _updateHeldItem(stack: ItemStack) {

        if (this.mesh) {
            this.camera.remove(this.mesh);
            ClientEventBus.invokeEvent(EventBusEvent.CLIENT_REMOVE_FROM_SCENE, { object: this.mesh });
            this.mesh = null;
        }

        if (this.geometry) {
            this.geometry.dispose();
            this.geometry = null;
        }

        const itemName = stack.getName();
        const itemSprite = ItemModels[itemName];

        if (!itemSprite) {
            console.warn("Couldn't find model for: ", itemName);
            return;
        }


        if (itemSprite.type !== ItemModelTypes.CUSTOM) return;

        const model = await ItemModelLoader.loadItem(itemName, itemSprite.data.texture);

        if (!model) {
            console.warn("Couldn't load model for: ", itemName);
            return;
        }

        // apply transform

        model.position.copy(itemSprite.data.transform.hand.offset);
        model.scale.copy(itemSprite.data.transform.hand.scale);

        this.baseRotation = Vector3.fromThreeVector3(itemSprite.data.transform.hand.rotation);


        model.rotation.copy(new Euler().setFromVector3(this.baseRotation.toThreeVec3()));

        this.camera.add(model);
        // ClientEventBus.invokeEvent(EventBusEvent.CLIENT_ADD_TO_SCENE, { object: model });
        this.mesh = model;

    }

    update() {
        if (this.attackAnimationActive && this.mesh) {
            this.attackAnimationFrame += 1;

            const animatedRotation = this.attackAnimation.evaluate(this.attackAnimationFrame / this.ATTACK_ANIMATION_LENGTH);
            const animatedRotation2 = this.attackAnimation2.evaluate(this.attackAnimationFrame / this.ATTACK_ANIMATION_LENGTH);
            const rotationNew = this.baseRotation.add(new Vector3(animatedRotation, 0, animatedRotation2));

            this.mesh.rotation.copy(new Euler().setFromVector3(rotationNew.toThreeVec3()));

            if (this.attackAnimationFrame > this.ATTACK_ANIMATION_LENGTH) {
                this.attackAnimationActive = false;
                this.attackAnimationFrame = 0;

                this.mesh.rotation.copy(new Euler().setFromVector3(this.baseRotation.toThreeVec3()));
            }
        }
    }

    private _registerEvents() {
        ClientEventBus.on(EventBusEvent.CLIENT_ATTACK, (data) => {
            this.attackAnimationActive = true;
        })
    }
}