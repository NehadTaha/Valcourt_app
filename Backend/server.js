const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
