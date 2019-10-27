import { User } from "./models";

const collection = User.buildUserCollection();
collection.on("change", function handleCollectionChange(): void {
  console.log(collection);
});
collection.fetch();
