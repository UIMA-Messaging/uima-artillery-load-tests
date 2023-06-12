const fs = require("fs");
const faker = require("faker");
const path = require("path");

module.exports = {
  generateSignupData: (requestParams, ctx, ee, next) => {
    const filePath = path.join(__dirname, "./material/exchange-keys.json");
    const file = fs.readFileSync(filePath);
    const displayName = faker.internet.userName().replace("_", "");
    ctx.vars["displayName"] = displayName;
    ctx.vars["exchangeKeys"] = JSON.parse(file);
    return next();
  },
};
