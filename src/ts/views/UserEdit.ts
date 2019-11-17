import View from "./View";
import { User } from "../models";
import { UserProps, RegionsMapProps } from "../ts-utils/interfaces";
import UserForm from "./UserForm";
import UserShow from "./UserShow";

class UserEdit extends View<User, UserProps> {
  get regionsMap(): RegionsMapProps {
    return {
      userShow: ".user-show",
      userForm: ".user-form",
    };
  }

  onRender(): void {
    new UserShow(this.regions.userShow, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
  }

  get template(): string {
    return `
      <div style="padding: 0 1rem 1rem;">
        <div class="user-show"></div>
        <div class="user-form"></div>
      </div>
    `;
  }
}

export default UserEdit;
