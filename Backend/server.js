const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { connect } = require("./database/database");
const authRouter = require("./routers/auth.route");
const userInfoRouter = require("./routers/userInfo");
const wpPostsRouter = require("./routers/posts");
const emailRouter = require("./routers/email.route")

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});


// Login routes
app.use("/auth", authRouter);

// Route for handling user data
app.use("/userInfo", userInfoRouter);

// Route for handling WordPress webhooks
app.use("/posts", wpPostsRouter);

// Route for handling emails
app.use("/email", emailRouter)

const port = process.env.PORT || 8080;
app.listen(port, () => {
  connect();
  console.log("Server listening on port " + port);
});

