const fs = require("fs");
const path = require("path");

function generateRandomString(length) {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
}

module.exports = {
  generateSignupData: (requestParams, ctx, ee, next) => {
    const filePath = path.join(__dirname, "./material/exchange-keys.json");
    const file = fs.readFileSync(filePath);
    ctx.vars["displayName"] = generateRandomString(10);
    ctx.vars["exchangeKeys"] = JSON.parse(file);
    return next();
  },
  log: console.log,
  logResponse: (requestParams, response, context, ee, next) => {
    console.log("Response Body:", response.body);
    return next();
  },
};
