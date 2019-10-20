import { User } from "./models";
import { CallbackFn } from "./ts-utils";

const user = new User({
  name: "MS Dhoni",
  age: 38,
});

const handleUserChange1: CallbackFn = () => {
  console.log("handleUserChange1");
};
user.on("change", handleUserChange1);

const handleUserChange2: CallbackFn = () => {
  console.log("handleUserChange2");
};
user.on("change", handleUserChange2);

const handleUserClick1: CallbackFn = () => {
  console.log("handleUserClick1");
};
user.on("click", handleUserClick1);

const handleUserClick2: CallbackFn = () => {
  console.log("handleUserClick2");
};
user.on("click", handleUserClick2);

user.trigger("change");
user.trigger("click");
