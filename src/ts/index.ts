import { UserEdit } from "./views";
import { User } from "./models";

const userRoot = document.getElementById("root");
const userData = User.buildUser({
  name: "Mayank Agarwal",
  age: 28,
});

if (userRoot) {
  const userEdit = new UserEdit(userRoot, userData);
  userEdit.render();
} else {
  console.log("Root Element not Found!");
}
