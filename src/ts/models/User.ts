import { UserProps, EventsData, NumOrStr, CallbackFn } from "../ts-utils/";
import axios, { AxiosResponse } from "axios";

class User {
  events: EventsData = {};

  constructor(private data: UserProps) {}

  get(propName: string): NumOrStr {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
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

  async fetch() {
    try {
      const id = this.get("id");
      const { data }: AxiosResponse = await axios.get(
        `http://localhost:3000/users/${id}`,
      );
      this.set(data);
    } catch (error) {
      console.error(error);
    }
  }

  async save() {
    try {
      const id = this.get("id");
      if (id) {
        await axios.put(`http://localhost:3000/users/${id}`, this.data);
      } else {
        await axios.post("http://localhost:3000/users", this.data);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default User;
