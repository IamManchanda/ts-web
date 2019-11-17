import View from "./View";
import { User } from "../models";
import { UserProps } from "../ts-utils/interfaces";

class UserShow extends View<User, UserProps> {
  template(): string {
    return `
      <div style="padding: 0 1rem 1rem;">
        <div class="user-show"></div>
        <div class="user-form"></div>
      </div>
    `;
  }
}

export default UserShow;
