import { BoxGeometry, Euler, Mesh, MeshStandardMaterial, NearestFilter, Object3D, TextureLoader, type Camera } from "three";
import { EventBusEvent } from "../../common/EventTypes";
import { ClientEventBus } from "./ClientEventBus";
import type { ItemStack } from "../../common/ItemStack";
import { ItemData } from "./Data/ItemsData";
import { ItemModels } from "./Data/models/Items";
import { ItemModelTypes } from "./Data/models/ModelTypes";
import { ItemModelLoader } from "./Models/ItemModelLoader";

export class HeldItem {

    private mesh: Object3D | null = null;
    private geometry: BoxGeometry | null = null;
    private camera: Camera;

    private loader: TextureLoader;

    constructor(camera: Camera) {

        this.loader = new TextureLoader();
        this.camera = camera;

        ClientEventBus.on(EventBusEvent.CLIENT_HANDHELD_ITEM_UPDATE, (data) => {
            this._updateHeldItem(data.stack);
        })
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
        model.rotation.copy(new Euler().setFromVector3(itemSprite.data.transform.hand.rotation));

        this.camera.add(model);
        // ClientEventBus.invokeEvent(EventBusEvent.CLIENT_ADD_TO_SCENE, { object: model });
        this.mesh = model;

        

    }
}