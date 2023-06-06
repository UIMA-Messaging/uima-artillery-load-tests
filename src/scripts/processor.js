const fs = require("fs");

const userIndex = 0;
const users = JSON.parse(fs.readFileSync("./src/scripts/material/users.json"));

module.exports = {
  setUserAsBody: (requestParams, context, events, next) => {
    const user = users[userIndex];
    console.log(user);
    context.vars.requestBody = JSON.stringify(user);
    userIndex += 1;
    return next();
  },
};
