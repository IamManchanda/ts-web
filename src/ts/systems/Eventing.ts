import { CallbackFn, EventsData } from "../ts-utils";

class Eventing {
  private events: EventsData = {};

  on = (eventName: string, callback: CallbackFn): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) return;
    handlers.forEach(callback => {
      callback();
    });
  };
}

export default Eventing;
