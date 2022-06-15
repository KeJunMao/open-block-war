import EventEmitter from "events";

export const relayEvent = Symbol("relay");

export class NiceEventEmitter extends EventEmitter {
  emit(eventName: string | symbol, ...params: any[]) {
    super.emit(eventName, ...params);
    super.emit(relayEvent, eventName, ...params);
    return true;
  }
}
