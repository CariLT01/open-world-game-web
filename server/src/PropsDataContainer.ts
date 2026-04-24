import type { StatelessProp } from "./ServerPropsManager";

/*
A container to be able to give to terrain generator for it to
add props into this container
*/
export class PropsDataContainer {

    private props: Set<StatelessProp>;

    constructor() {
        this.props = new Set();
    }

    addProp(prop: StatelessProp) {
        this.props.add(prop);
    }

    deleteProp(prop: StatelessProp) {
        this.props.delete(prop);
    }

    readProps() {
        return this.props;
    }

    clear() {
        this.props.clear();
    }


}