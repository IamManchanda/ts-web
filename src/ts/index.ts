import { Collection, User } from "./models";
import { UserProps } from "./ts-utils";

const collection = new Collection<User, UserProps>(
  "http://localhost:3000/users",
  function handleDeserialize(json: UserProps): User {
    return User.buildUser(json);
  },
);
collection.on("change", function handleCollectionChange(): void {
  console.log(collection);
});
collection.fetch();
