const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

async function login(req, res) {
  let user;

  if (req.body.email) {
    user = await User.findOne({ email: req.body.email });
  } else if (req.body.username) {
    user = await User.findOne({ username: req.body.username });
  }

  if (!user) return res.json({ msg: "Credenciales inválidas" });

  const isValidPassword = await bcrypt.compare(req.body.password, user.password);

  if (!isValidPassword) return res.json({ msg: "Credenciales inválidas" });

  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET);
  return res.json({ token });
}

module.exports = {
  login,
};
