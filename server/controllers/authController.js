const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const db = req.app.get("db");
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);

  const result = await db.signup([username, hash]).catch(err => {
    res.status(400).json("username already exist");
  });
  req.session.user = { username: result[0].username };
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
        username: results[0].username
      };
      console.log(results);
      res.json({ username: results[0].username });
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

module.exports = {
  signup,
  login,
  getUser,
  logout
};
