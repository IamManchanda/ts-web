import { UserProps, EventsData, NumOrStr, CallbackFn } from "../ts-utils/";

class User {
  events: EventsData = {};

  constructor(private data: UserProps) {}

  get(propName: string): NumOrStr {
    return this.data[propName];
  }

  set(update: UserProps): void {
    this.data = { ...this.data, ...update };
  }

  on(eventName: string, callback: CallbackFn): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) return;
    handlers.forEach(callback => {
      callback();
    });
  }
}

export default User;
