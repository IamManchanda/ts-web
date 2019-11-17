import { EventsMapProps, UserProps } from "../ts-utils/interfaces";
import View from "./View";
import { User } from "../models";

class UserForm extends View<User, UserProps> {
  get eventsMap(): EventsMapProps {
    return {
      "click:.set-name": this.onSetName,
      "click:.set-random-age": this.onSetRandomAge,
    };
  }

  onSetName = (): void => {
    const input = this.parent.querySelector("input");
    if (input) {
      const newName = input.value;
      this.model.setName(newName);
    }
  };

  onSetRandomAge = (): void => {
    this.model.setRandomAge();
  };

  template(): string {
    return `
      <div style="padding: 0 1rem 1rem;">
        <h2>User Form</h2>
        <div>User Name: ${this.model.getAttr("name")}</div>
        <div>User Age: ${this.model.getAttr("age")}</div>
        <br />
        <input />
        <button class="set-name">Set Name</button>
        <br /><br />
        <button class="set-random-age">Set Random Age</button>
      </div>
    `;
  }
}

export default UserForm;
