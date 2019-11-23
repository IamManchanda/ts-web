import UserList from "./views/UserList";
import Collection from "./models/Collection";
import { UserProps } from "./ts-utils";
import { User } from "./models";

const fetchUsersData = (data: UserProps) => User.buildUser(data);
const users = new Collection("http://localhost:3000/users", fetchUsersData);

const handleUsersChange = () => {
  const root = document.getElementById("root");
  if (root) {
    new UserList(root, users).render();
  }
};
users.on("change", handleUsersChange);
users.fetch();
