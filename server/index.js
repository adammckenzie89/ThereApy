require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const app = express();

const { CONNECTION_STRING, SERVER_PORT, SECRET } = process.env;
app.use(express.json());

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
  })
);

massive(CONNECTION_STRING)
  .then(dbInstance => {
    console.log("database hit");
    app.set("db", dbInstance);
  })
  .catch(error => console.log(error));

app.listen(SERVER_PORT, () => {
  console.log(`listening on port ${SERVER_PORT}`);
});
