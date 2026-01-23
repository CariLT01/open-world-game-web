import type { EventTypePayloads } from "./EventTypePayloads";
import type { EventBusEvent } from "./EventTypes";

type EventCallback = (...args: any[]) => void;

export class EventBus {

    private events: Map<EventBusEvent, EventCallback[]> = new Map();

    private detailedLogging: boolean = false;

    constructor(enableDetailedLogging?: boolean) {
        if (enableDetailedLogging) this.detailedLogging = true;
    }

    registerEventCallback<K extends keyof EventTypePayloads>(eventType: K, eventCallback: (data: EventTypePayloads[K]) => void) {

        if (!this.events.has(eventType)) {

            console.log("Created new event type: ", eventType);

            this.events.set(eventType, []);
        }

        console.log("Register new callback on: ", eventType);

        this.events.get(eventType)!.push(eventCallback);

    }

    fireEvent<K extends keyof EventTypePayloads>(eventType: K, data: EventTypePayloads[K]) {

        if (!this.events.has(eventType)) {
            console.warn("Event not registered: " + eventType);
            return;
        }

        // console.log("Executing subscribers: ", eventType);

        for (const callback of this.events.get(eventType)!) {
            try {
                callback(data);
            } catch (e) {
                console.error("Error occurred in callback: ", e);
            }
            
        }
    }

    // Alias for registerEventCallback
    on<K extends keyof EventTypePayloads>(eventType: K, eventCallback: (data: EventTypePayloads[K]) => void) {
        this.registerEventCallback(eventType, eventCallback);
    }
}