import { User } from "./models";

const user = new User({ id: 1 });
user.set({ name: "MS Dhoni", age: 38 });
user.save();
