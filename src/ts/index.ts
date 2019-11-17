import { UserForm } from "./views";
import { User } from "./models";

const userRoot = document.getElementById("root");
const userData = User.buildUser({
  name: "Mayank Agarwal",
  age: 28,
});
if (userRoot) {
  const userForm = new UserForm(userRoot, userData);
  userForm.render();
} else {
  console.log("Root Element not Found!");
}
