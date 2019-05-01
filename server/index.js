require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const authController = require("./middlewares/authController");

const app = express();

const { CONNECTION_STRING, SERVER_PORT, SECRET } = process.env;
app.use(express.json());

app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

massive(CONNECTION_STRING)
  .then(dbInstance => {
    console.log("database hit");
    app.set("db", dbInstance);
  })
  .catch(error => console.log(error));

/////////////// LOGIN ////////////////////////////

app.get("/auth/cookie", authController.getUser);
app.post("/auth/signup", authController.signup);
app.post("/auth/login", authController.login);
app.get("/auth/logout", authController.logout);

app.listen(SERVER_PORT, () => {
  console.log(`listening on port ${SERVER_PORT}`);
});
