import View from "./View";
import { User } from "../models";
import { UserProps } from "../ts-utils/interfaces";

class UserShow extends View<User, UserProps> {
  get template(): string {
    return `
      <div>
        <h2>User Detail</h2>
        <p>User Name: ${this.model.getAttr("name")}</p>
        <p>User Age: ${this.model.getAttr("age")}</p>
      </div>
    `;
  }
}

export default UserShow;
