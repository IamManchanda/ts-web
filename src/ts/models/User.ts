import { UserProps } from "../ts-utils/";
import { Eventing, Syncing, Attributing } from "../systems";
import Model from "./Model";
import Collection from "./Collection";

const rootUrl = "http://localhost:3000/users";

class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributing<UserProps>(attrs),
      new Eventing(),
      new Syncing<UserProps>(rootUrl),
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      "http://localhost:3000/users",
      function handleDeserialize(json: UserProps): User {
        return User.buildUser(json);
      },
    );
  }

  setName(name: string): void {
    this.setAttr({ name });
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.setAttr({ age });
  }
}

export default User;
