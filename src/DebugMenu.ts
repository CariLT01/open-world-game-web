
export class DebugMenu {

    private keys: Map<String, String> = new Map();
    private keysElements: Map<String, HTMLParagraphElement> = new Map();

    private ui!: HTMLDivElement;

    constructor() {
        this.createUi();
    }
    
    createUi() {
        const ui = document.createElement("div");

        ui.style.position = "fixed";
        ui.style.top = "0";
        ui.style.left = "0";
        this.ui = ui;

        document.body.appendChild(ui);
    }

    updateKey(key: string, value: string) {

        if (!this.keys.has(key)) {
            const el = document.createElement("p");
            this.ui.appendChild(el);

            this.keysElements.set(key, el)
        }

        this.keys.set(key, value);
    }

    render() {
        for (const [key, value] of this.keys) {
            const el = this.keysElements.get(key);
            if (el) {
                el.innerText = `${key}: ${value}`
            }
        }
    }

}