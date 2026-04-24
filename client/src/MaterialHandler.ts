import type { Material } from "three";
import type CSM from "three-csm";


class MaterialHandlerClass {

    private csm: CSM | null = null;

    constructor() {
        this.csm = null;
    }

    setCsm(csm: CSM) {
        this.csm = csm;
    }

    setupMaterial(material: Material) {
        if (!this.csm) {
            throw new Error("CSM not initialized");
        }
        this.csm.setupMaterial(material);
    }
}

export const MaterialHandler = new MaterialHandlerClass();