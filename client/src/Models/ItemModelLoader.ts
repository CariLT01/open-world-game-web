import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { ItemModels } from "../Data/models/Items";
import { ItemModelTypes } from "../Data/models/ModelTypes";
import { DoubleSide, Mesh, MeshStandardMaterial, SRGBColorSpace, TextureLoader } from "three";
import { MaterialHandler } from "../MaterialHandler";

class ItemModelLoaderClass {

    private gltfLoader: GLTFLoader = new GLTFLoader();
    private textureLoader: TextureLoader = new TextureLoader();

    constructor() {

    }

    async loadItem(name: string, textureData: string) {
        const modelData = ItemModels[name];

        if (!modelData) {
            return null;
        }

        if (modelData.type !== ItemModelTypes.CUSTOM) return null;

        try {
            const [texture, gltf] = await Promise.all([
                this.textureLoader.loadAsync(textureData),
                this.gltfLoader.loadAsync(`${modelData.data.modelName}`)
            ]);

            texture.flipY = false;
            texture.colorSpace = SRGBColorSpace;

            const model = gltf.scene;

            model.traverse((child) => {
                if (child instanceof Mesh) {

                    const itemMaterial = new MeshStandardMaterial({
                        map: texture
                    });

                    MaterialHandler.setupMaterial(itemMaterial);

                    child.material = itemMaterial;
                    
                }
            });

            return model;
        } catch (e) {
            console.error("Failed to load model: ", e);
            return null;
        }
    }
}

export const ItemModelLoader = new ItemModelLoaderClass();