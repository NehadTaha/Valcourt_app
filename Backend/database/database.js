const { MongoClient } = require("mongodb");
// I changed local host to 0.0.0.0 because it was not working on my machine
const url = "mongodb://0.0.0.0:27017";
const client = new MongoClient(url);

async function connect() {
  await client.connect();
  console.log("Database connection successful");

  return "done.";
}

module.exports = {
  connect,
  client,
};
