
type Attrs = {
    [key: string]: string | number | boolean
}

export class ItemStack {

    
    private name: string;
    private count: number;
    private attributes: Attrs;

    constructor(name: string, count: number, attributes?: Attrs) {
        this.name = name;
        this.count = count;
        this.attributes = attributes ?? {};
    }

    static empty() {
        return new ItemStack("", 0);
    }

    isEmpty() {
        return this.name == "" || this.count == 0;
    }

    getName() {
        return this.name;
    }

    getCount() {
        return this.count;
    }

    getAttributes() {
        return this.attributes;
    }

    setName(n: string) {
        this.name = n;
    }

    setCount(c: number) {
        this.count = c;
    }

    addAttribute(key: string, value: string | number | boolean) {
        if (this.attributes[key] !== undefined) {
            throw new Error("Attribute already exists! Call modifyAttribute instead");
        }
        this.attributes[key] = value;
    }

    modifyAttribute(key: string, value: string | number | boolean) {
        if (this.attributes[key] === undefined) {
            throw new Error("Attribute does not exist, call addAttribute instead");
        }

        this.attributes[key] = value;
    }

    removeAttribute(key: string) {
        if (this.attributes[key] === undefined) {
            throw new Error("Cannot remove attribute; does not exist");
        }
        delete this.attributes[key];
    }

    attributeExists(key: string) {
        return this.attributes[key] !== undefined;
    }
}