import axios, { AxiosResponse } from "axios";
import { User } from ".";
import { Eventing } from "../systems";
import { UserProps } from "../ts-utils";

class Collection {
  models: User[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  async fetch(): Promise<void> {
    const { data }: AxiosResponse = await axios.get(this.rootUrl);
    const handleDataIteration = (value: UserProps) => {
      const user = User.buildUser(value);
      this.models.push(user);
    };
    data.forEach(handleDataIteration);
    this.trigger("change");
  }
}

export default Collection;
