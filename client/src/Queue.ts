export class Queue<T> {

    private items: Map<number, T>;
    private head: number;
    private tail: number;


    constructor() {
        this.items = new Map();
        this.head = 0;
        this.tail = 0;
    }

    // Add to the back
    enqueue(element: T) {
        this.items.set(this.tail, element);
        this.tail++;
    }

    // Remove from the front
    dequeue() {
        if (this.isEmpty()) return null;

        const item = this.items.get(this.head);
        this.items.delete(this.head);
        this.head++;
        return item;
    }

    peek() {
        return this.items.get(this.head);
    }

    isEmpty() {
        return this.tail - this.head === 0;
    }

    size() {
        return this.tail - this.head;
    }
}