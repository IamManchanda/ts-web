import axios, { AxiosResponse } from "axios";
import { Eventing } from "../systems";

class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  async fetch(): Promise<void> {
    const { data }: AxiosResponse = await axios.get(this.rootUrl);
    const handleDataIteration = (value: K): void => {
      this.models.push(this.deserialize(value));
    };
    data.forEach(handleDataIteration);
    this.trigger("change");
  }
}

export default Collection;
