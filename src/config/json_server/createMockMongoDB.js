/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mockData = require("../mockMongoData.js");

const { posts, users } = mockData;
const data = JSON.stringify({ posts, users });
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function(err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
