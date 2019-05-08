require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const app = express();
app.use(express.json());

const { CONNECTION_STRING, SERVER_PORT, SECRET } = process.env;

const {
  getUser,
  signup,
  login,
  logout,
  editProfile
} = require("./controllers/authController");

const { userLocation } = require("./controllers/mapsController");

const {
  addFavorite,
  joinFavorites,
  makePosts,
  joinPosts,
  deletePost,
  deleteFavorite
} = require("./controllers/favController");

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

/////////////// LOGIN ENDPOIONTS////////////////////////////

app.get("/auth/cookie", getUser);
app.post("/auth/signup", signup);
app.post("/auth/login", login);
app.get("/auth/logout", logout);
app.put("/auth/editProfile", editProfile);

/////////////// MAPS ENDPOINTS /////////////////////////////
app.post("/api/location", userLocation);

/////////////// FAVORITES ///////////////////////////
app.post("/api/addFavorite", addFavorite);
app.get("/api/addFavorites", joinFavorites);
app.post("/api/makePosts", makePosts);
app.get("/api/joinPosts", joinPosts);
app.delete("/api/removePost/:id", deletePost);
app.delete("/api/deleteFavorite/:id", deleteFavorite);
app.listen(SERVER_PORT, () => {
  console.log(`listening on port ${SERVER_PORT}`);
});
