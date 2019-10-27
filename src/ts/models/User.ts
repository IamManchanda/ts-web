import { UserProps } from "../ts-utils/";
import { Eventing, Syncing, Attributing } from "../systems";
import { AxiosResponse } from "axios";

const rootUrl = "http://localhost:3000/users";

class User {
  private attributes: Attributing<UserProps>;
  private events: Eventing = new Eventing();
  private sync: Syncing<UserProps> = new Syncing<UserProps>(rootUrl);

  constructor(attrs: UserProps) {
    this.attributes = new Attributing<UserProps>(attrs);
  }

  get getAttr() {
    return this.attributes.getAttr;
  }

  setAttr(update: UserProps) {
    this.attributes.setAttr(update);
    this.events.trigger("change");
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  async fetch(): Promise<void> {
    const id = this.getAttr("id");
    if (typeof id !== "number") {
      throw new Error("Can not fetch without an Id");
    }
    try {
      const { data }: AxiosResponse = await this.sync.fetch(id);
      this.setAttr(data);
    } catch (error) {
      console.error(error);
    }
  }

  async save(): Promise<void> {
    try {
      const response: AxiosResponse = await this.sync.save(
        this.attributes.getAllAttrs(),
      );
      this.trigger("save");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}

export default User;
