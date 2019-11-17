import View from "./View";
import { User } from "../models";
import { UserProps } from "../ts-utils/interfaces";

class UserShow extends View<User, UserProps> {
  template(): string {
    return `
      <div>
        <h1>User Detail</h1>
        <h1>User Name: ${this.model.getAttr("name")}</h1>
        <h1>User Age: ${this.model.getAttr("age")}</h1>
      </div>
    `;
  }
}

export default UserShow;
