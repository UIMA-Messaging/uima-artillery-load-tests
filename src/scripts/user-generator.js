const faker = require("faker");
const fs = require("fs");

const generateRandomUser = () => {
  const displayName = faker.internet.userName();
  const image = faker.image.imageUrl();
  const userId = faker.datatype.uuid();
  const identityKey = faker.datatype.uuid().replace(/-/g, "");
  const signedPreKey = faker.datatype.uuid().replace(/-/g, "");
  const oneTimePreKeys = Array.from({ length: 200 }, () => faker.datatype.uuid().replace(/-/g, ""));
  const signature = faker.datatype.uuid().replace(/-/g, "");

  return {
    displayName,
    image,
    exchangeKeys: {
      userId,
      identityKey,
      signedPreKey,
      oneTimePreKeys,
      signature,
    },
  };
};

const generateRandomUsers = numUsers => {
  const users = Array.from({ length: numUsers }, generateRandomUser);
  return users;
};

const numUsers = 1000;
const users = generateRandomUsers(numUsers);

fs.writeFile("./src/scripts/material/users.json", JSON.stringify(users, null, 2), err => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("users.json has been saved successfully.");
});
