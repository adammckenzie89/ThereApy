const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const db = req.app.get("db");
  const { username, password, email } = req.body;
  const hash = await bcrypt.hash(password, 12);

  const result = await db.signup([username, hash, email]).catch(err => {
    res.status(400).json("username already exist");
  });
  req.session.user = { username: result[0].username, id: result[0].id };
  res.json(result);
};
const login = async (req, res) => {
  const db = req.app.get("db");

  const results = await db.login(req.body.username);
  if (results[0]) {
    const isMatch = await bcrypt.compare(
      req.body.password,
      results[0].password
    );
    if (isMatch) {
      req.session.user = {
        username: results[0].username,
        id: results[0].id
      };
      console.log(results);
      res.json(req.session.user);
    } else {
      res.status(403).json("Error: Wrong password");
    }
  } else {
    res.status(403).json("Error: Wrong username.");
  }
};
const getUser = function(req, res, next) {
  const { session } = req;
  if (!session.user) {
    session.user = { username: "" };
  }
  res.json(session.user);
  next();
};
const logout = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
  console.log(req.session);
};

const editProfile = async (req, res) => {
  const db = req.app.get("db");
  const { session, username, email } = req.body;
  const result = db.editProfile([session, username, email]).catch(error => {
    res.status(400).json("edit failed");

    req.session.user = { username: result[0].username };
    res.json(req.session.user);
  });
};

module.exports = {
  signup,
  login,
  getUser,
  logout,
  editProfile
};
