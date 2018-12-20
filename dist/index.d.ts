import { Stream } from "@most/types";
import EventEmitter from "eventemitter3";
export declare type Emit = <T>(value: T) => void;
export interface IUpdate<T> {
    emit: Emit;
    stream: Stream<T>;
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
export declare function fromUpdate<T>(emitter?: EventEmitter): IUpdate<T>;
