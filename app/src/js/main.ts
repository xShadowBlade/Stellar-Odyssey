/*
Handling of:
Loop Events
Saving/loading
*/
/**
 * Event system for managing intervals and timeouts.
 * @namespace
 */

import eMath from "emath.js";
import Game from "./game.js";

const { E } = eMath;

interface Event {
    name: string;
    type: "interval" | "timeout";
    delay: E;
    callbackFn: () => void;
    timeCreated: E;
    intervalLast?: E;
}

const eventSystem = {
    /**
     * An array to store events.
     * @type {Array<object>}
     */
    events: [] as Event[],

    /**
     * Adds a new event to the event system.
     *
     * @param {string} name - The name of the event.
     * @param {string} type - The type of the event, either "interval" or "timeout".
     * @param {number|E} delay - The delay in milliseconds before the event triggers.
     * @param {function} callbackFn - The callback function to execute when the event triggers.
     */
    addEvent: function (name: string, type: "interval" | "timeout", delay: number | E, callbackFn: () => void) {
        const event: Event = {
            name,
            type,
            delay: E(delay),
            callbackFn,
            timeCreated: E(Date.now()),
        };

        if (type === "interval") event.intervalLast = E(Date.now());

        this.events.push(event);
    },
};

Game.PIXI.app.ticker.add(function () {
    const currentTime = E(Date.now());
    for (let i = 0; i < eventSystem.events.length; i++) {
        const event = eventSystem.events[i];

        if (event.type === "interval" && ((currentTime.sub(event.intervalLast!)).gte(event.delay))) {
            event.callbackFn();
            event.intervalLast = currentTime;
        } else if (event.type === "timeout" && ((currentTime.sub(event.timeCreated)).gte(event.delay))) {
            event.callbackFn();
            eventSystem.events.splice(i, 1);
            i--;
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
    dt = E(dt).plus(Game["data"].playtime.timewarp); // Time since last update (scale factor)
    Game["data"].playtime.timewarp = E(); // reset timewarp

    Game["static"].playtime.tActive.gain(dt);
    Game["static"].playtime.tPassive.gain(dt);
    Game["static"].playtime.active.gain(dt);
    Game["static"].playtime.passive.gain(dt);
    Game["static"].playtime.points.gain(dt);
});

export { eventSystem };