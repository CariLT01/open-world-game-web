import { AmbientLight, Color, DirectionalLight, Euler, PerspectiveCamera, Scene, ShaderMaterial, Vector3, WebGLRenderer, WebGLRenderTarget } from "three";
import { ItemModels } from "../Data/models/Items";
import { ItemModelTypes } from "../Data/models/ModelTypes";
import { ItemModelLoader } from "./ItemModelLoader";

const BAKE_RESOLUTION = 256;

const HalfLambertShader = {
    uniforms: {
        u_texture: { value: null }, // The 1x1 texture
        u_lightDir: { value: new Vector3(1, 1, 1).normalize() },
        u_ambient: { value: 0.15 } // Base brightness for shadows
    },
    vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D u_texture;
        uniform vec3 u_lightDir;
        uniform float u_ambient;
        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
            vec4 texColor = texture2D(u_texture, vUv);
            vec3 n = normalize(vNormal);
            vec3 l = normalize(u_lightDir);
            
            // Half-Lambert: (N dot L * 0.5 + 0.5)^2
            float halfLambert = dot(n, l) * 0.5 + 0.5;
            halfLambert = pow(halfLambert, 2.0);
            
            // Combine texture color with lighting and ambient boost
            vec3 finalColor = texColor.rgb * (halfLambert + u_ambient);
            gl_FragColor = vec4(finalColor, texColor.a);
        }
    `
};

class ItemThumbnailBakeryClass {

    private bakedThumbnails: Map<string, string> = new Map();



    constructor() {

    }

    private async _bakeScene(itemName: string) {
        const itemData = ItemModels[itemName];
        if (!itemData) {
            return;
        }
        if (itemData.type != ItemModelTypes.CUSTOM) return;

        const mesh = await ItemModelLoader.loadItem(itemName, itemData.data.texture);
        if (!mesh) {
            console.error("Failed to bake: failed to load mesh for: ", itemName);
            return;
        }

        mesh.traverse((child) => {
            if ((child as any).isMesh) {
                const meshChild = child as any;
                const originalMaterial = meshChild.material;

                // Clone the shader for this specific mesh instance
                const material = new ShaderMaterial({
                    uniforms: {
                        u_texture: { value: originalMaterial.map }, // Pass the 1x1 texture here
                        u_lightDir: { value: new Vector3(0.5, 0.5, 1).normalize() }, // Light from camera side
                        u_ambient: { value: 0.2 }
                    },
                    vertexShader: HalfLambertShader.vertexShader,
                    fragmentShader: HalfLambertShader.fragmentShader,
                    transparent: true // Matches standard item behavior
                });

                meshChild.material = material;
            }
        });


        const tempScene = new Scene();
        // tempScene.background = new Color(0x00000000);
        const camera = new PerspectiveCamera(50, BAKE_RESOLUTION / BAKE_RESOLUTION, 0.1, 1000);
        camera.position.set(0, 0, -5);
        camera.lookAt(0, 0, 0);

        mesh.position.copy(itemData.data.transform.thumbnail.position);
        mesh.rotation.copy(new Euler().setFromVector3(itemData.data.transform.thumbnail.rotation));
        mesh.scale.copy(itemData.data.transform.thumbnail.scale);

        tempScene.add(mesh);

        // Lighting
        const light = new DirectionalLight(0xffffff, 5);
        light.position.set(1, 1, 1);
        tempScene.add(light);

        const ambient = new AmbientLight(0xffffff, 2);
        tempScene.add(ambient);

        const renderTarget = new WebGLRenderTarget(BAKE_RESOLUTION, BAKE_RESOLUTION);
        const renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, alpha: true });
        renderer.setSize(BAKE_RESOLUTION, BAKE_RESOLUTION);
        renderer.setClearColor(0x000000, 0);

        renderer.compile(tempScene, camera);

        renderer.setRenderTarget(renderTarget);
        renderer.render(tempScene, camera);

        const buffer = new Uint8Array(BAKE_RESOLUTION * BAKE_RESOLUTION * 4);
        renderer.readRenderTargetPixels(renderTarget, 0, 0, BAKE_RESOLUTION, BAKE_RESOLUTION, buffer);

        const canvas = document.createElement('canvas');
        canvas.width = BAKE_RESOLUTION;
        canvas.height = BAKE_RESOLUTION;
        const context = canvas.getContext('2d');

        if (context) {
            const imageData = context.createImageData(BAKE_RESOLUTION, BAKE_RESOLUTION);
            // Correct the vertical flip (WebGL is bottom-to-top, Canvas is top-to-bottom)
            for (let y = 0; y < BAKE_RESOLUTION; y++) {
                for (let x = 0; x < BAKE_RESOLUTION; x++) {
                    const i = (y * BAKE_RESOLUTION + x) * 4;
                    const revI = ((BAKE_RESOLUTION - 1 - y) * BAKE_RESOLUTION + x) * 4;
                    imageData.data[i] = buffer[revI]!;
                    imageData.data[i + 1] = buffer[revI + 1]!;
                    imageData.data[i + 2] = buffer[revI + 2]!;
                    imageData.data[i + 3] = buffer[revI + 3]!;
                }
            }
            context.putImageData(imageData, 0, 0);
        }

        const base64 = canvas.toDataURL('image/png');

        // Cleanup to prevent memory leaks
        renderTarget.dispose();
        renderer.dispose();

        return base64;


    }

    async getThumbnail(itemName: string) {
        if (!this.bakedThumbnails.get(itemName)) {
            console.log("Baking: ", itemName);
            const data = await this._bakeScene(itemName);
            if (!data) {
                console.error("Failed to bake");
                return "";
            }
            this.bakedThumbnails.set(itemName, data);
        } else {
            return this.bakedThumbnails.get(itemName);
        }
    }
}

export const ItemThumbnailBakery = new ItemThumbnailBakeryClass();