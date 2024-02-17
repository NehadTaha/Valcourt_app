const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
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
