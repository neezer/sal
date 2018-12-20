"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@most/core");
const scheduler_1 = require("@most/scheduler");
const eventemitter3_1 = __importDefault(require("eventemitter3"));
class Update {
    constructor(emitter, event) {
        this.emitter = emitter;
        this.event = event;
    }
    run(sink, scheduler) {
        const send = (value) => tryEvent(scheduler_1.currentTime(scheduler), value, sink);
        const dispose = () => {
            this.emitter.removeListener(this.event, send);
        };
        this.emitter.on(this.event, send);
        return { dispose };
    }
}
function tryEvent(t, x, sink) {
    try {
        sink.event(t, x);
    }
    catch (e) {
        sink.error(t, e);
    }
}
/**
 * Returns a stream bound to the given EventEmitter and a pre-bound emit
 * function. This emit function will only ever emit the event defined by the
 * `UPDATE` constant, pushing the new event onto the stream.
 *
 * We've multicasted the stream here too, since we'll be adding lots of
 * subscriptions down the road and we want to efficiently share this stream
 * among them.
 *
 * @param EventEmitter
 */
function fromUpdate(emitter = new eventemitter3_1.default()) {
    const emit = emitter.emit.bind(emitter, "update");
    const stream = new Update(emitter, "update");
    return { stream: core_1.multicast(stream), emit };
}
exports.fromUpdate = fromUpdate;
