import { ModelAttributes, ModelEvents, ModelSync, HasId } from "../ts-utils";
import { AxiosResponse } from "axios";

class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: ModelEvents,
    private sync: ModelSync<T>,
  ) {}

  getAttr = this.attributes.getAttr;
  on = this.events.on;
  trigger = this.events.trigger;

  setAttr(update: T) {
    this.attributes.setAttr(update);
    this.events.trigger("change");
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

export default Model;
