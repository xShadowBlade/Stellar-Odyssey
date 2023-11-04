/*
Handling of:
Loop Events
Saving/loading
*/
/**
 * Event system for managing intervals and timeouts.
 * @namespace
 */

import { E } from "emath.js";
import Game from "./game";

interface Event {
    name: string;
    type: "interval" | "timeout";
    delay: E;
    callbackFn: () => void;
    timeCreated: E;
}

interface intervalEvent extends Event {
    type: "interval";
    intervalLast: E;
}

interface timeoutEvent extends Event {}

const eventSystem = {
    /**
     * An array to store events.
     * @type {Array<object>}
     */
    events: [] as (intervalEvent | timeoutEvent)[],

    /**
     * Adds a new event to the event system.
     *
     * @param {string} name - The name of the event.
     * @param {string} type - The type of the event, either "interval" or "timeout".
     * @param {number|E} delay - The delay in milliseconds before the event triggers.
     * @param {function} callbackFn - The callback function to execute when the event triggers.
     */
    addEvent: function (name: string, type: "interval" | "timeout", delay: number | E, callbackFn: () => void) {
        this.events.push((() => {switch (type) {
        case "interval": {
            const event: intervalEvent = {
                name,
                type,
                delay: E(delay),
                callbackFn,
                timeCreated: E(Date.now()),
                intervalLast: E(Date.now()),
            };
            return event;
        // eslint-disable-next-line no-unreachable
        }; break;
        case "timeout":
        default: {
            const event: timeoutEvent = {
                name,
                type,
                delay: E(delay),
                callbackFn,
                timeCreated: E(Date.now()),
            };

            return event;
        }
        }})());
    },
};

Game.PIXI.app.ticker.add(function () {
    const currentTime = E(Date.now());
    for (let i = 0; i < eventSystem.events.length; i++) {
        const event = eventSystem.events[i];

        if (event.type === "interval") {
            // If interval
            if (((currentTime.sub(((event as intervalEvent)).intervalLast)).gte(event.delay))) {
                event.callbackFn();
                (event as intervalEvent).intervalLast = currentTime;
            }
        } else if (event.type === "timeout") {
            // If timeout
            if (((currentTime.sub(event.timeCreated)).gte(event.delay))) {
                event.callbackFn();
                eventSystem.events.splice(i, 1);
                i--;
            }
        }
    }
});

// Example usage:
// eventSystem.addEvent("IntervalEvent", "interval", 2000, () => {
//     console.log("Interval event executed.");
// });

// eventSystem.addEvent("TimeoutEvent", "timeout", 5000, () => {
//     console.log("Timeout event executed.");
// });

Game.PIXI.app.ticker.add(function (dt: number) {
    Game["data"].playtime.timewarp = E(); // reset timewarp

    Game["static"].playtime.tActive.gain(dt);
    Game["static"].playtime.tPassive.gain(dt);
    Game["static"].playtime.active.gain(dt);
    Game["static"].playtime.passive.gain(dt);
    Game["static"].playtime.points.gain(dt);
});

export { eventSystem };