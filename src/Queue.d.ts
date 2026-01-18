export declare class Queue<T> {
    private items;
    private head;
    private tail;
    constructor();
    enqueue(element: T): void;
    dequeue(): T | null | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    size(): number;
}
//# sourceMappingURL=Queue.d.ts.map