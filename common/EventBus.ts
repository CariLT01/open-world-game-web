import type { EventBusEvent } from "./EventTypes";

type EventCallback = (...args: any[]) => void;

export class EventBus {

    private events: Map<EventBusEvent, EventCallback[]> = new Map();

    private detailedLogging: boolean = false;

    constructor(enableDetailedLogging?: boolean) {
        if (enableDetailedLogging) this.detailedLogging = true;
    }

    registerEventCallback(eventType: EventBusEvent, eventCallback: EventCallback) {

        if (!this.events.has(eventType)) {

            console.log("Created new event type: ", eventType);

            this.events.set(eventType, []);
        }

        console.log("Register new callback on: ", eventType);

        this.events.get(eventType)!.push(eventCallback);

    }

    fireEvent(eventType: EventBusEvent, ...args: any[]) {

        if (!this.events.has(eventType)) {
            console.warn("Event not registered: " + eventType);
            return;
        }

        console.log("Executing subscribers: ", eventType);

        for (const callback of this.events.get(eventType)!) {
            try {
                callback(...args);
            } catch (e) {
                console.error("Error occurred in callback: ", e);
            }
            
        }
    }

    // Alias for registerEventCallback
    on(eventType: EventBusEvent, eventCallback: EventCallback) {
        this.registerEventCallback(eventType, eventCallback);
    }
}