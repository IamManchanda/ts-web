import { User } from "./models";

const user = new User({ id: 1, name: "Mahi", age: 38 });

const handleUserChange = () => {
  console.log(user);
};
user.on("save", handleUserChange);
user.save();
