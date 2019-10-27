import { UserProps } from "../ts-utils/";
import { Eventing, Syncing, Attributing } from "../systems";
import Model from "./Model";

const rootUrl = "http://localhost:3000/users";

class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributing<UserProps>(attrs),
      new Eventing(),
      new Syncing<UserProps>(rootUrl),
    );
  }
}

export default User;
