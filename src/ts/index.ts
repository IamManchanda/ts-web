import { User } from "./models";

const user = User.buildUser({ id: 1, name: "MS Dhoni", age: 38 });

const handleUserChange = () => {
  console.log(user);
};
user.on("change", handleUserChange);
user.fetch();
user.save();
