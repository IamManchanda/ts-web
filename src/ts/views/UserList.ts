import CollectionView from "./CollectionView";
import { User } from "../models";
import { UserProps } from "../ts-utils";
import UserShow from "./UserShow";

class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, itemParent: Element): void {
    new UserShow(itemParent, model).render();
  }
}

export default UserList;
