import { User } from "./models";

const user = new User({ id: 1 });
user.fetch();

setTimeout(() => {
  console.log({ user });
}, 4000);
