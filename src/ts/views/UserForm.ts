import { EventsMapProps, UserProps } from "../ts-utils/interfaces";
import View from "./View";
import { User } from "../models";

class UserForm extends View<User, UserProps> {
  get eventsMap(): EventsMapProps {
    return {
      "click:.set-name": this.onSetName,
      "click:.set-random-age": this.onSetRandomAge,
      "click:.save-user-model": this.onSaveUserModel,
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

  onSaveUserModel = (): void => {
    this.model.save();
  };

  template(): string {
    return `
      <div style="padding: 0 1rem 1rem;">
        <input placeholder="${this.model.getAttr("name")}" />
        <button class="set-name">Set Name</button>
        <br /><br />
        <input placeholder="${this.model.getAttr("age")}" disabled />
        <button class="set-random-age">Set Random Age</button>
        <br /><br />
        <button class="save-user-model">Save User</button>
      </div>
    `;
  }
}

export default UserForm;
