import { Collection } from "./models";

const collection = new Collection("http://localhost:3000/users");
collection.on("change", function handleCollectionChange() {
  console.log(collection);
});
collection.fetch();
