const bcrypt = require("bcrypt");
const User = require("../models/User");

async function index(req, res) {}

async function show(req, res) {
  try {
    console.log(req.auth);
    const user = await User.findOne({ username: req.params.username }).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
}

async function store(req, res) {
  try {
    let { firstname, lastname, username, password, email } = req.body;
    password = await bcrypt.hash(password, 10);
    const user = new User({ firstname, lastname, username, password, email });
    await user.save();

    res.status(201).json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
}

async function update(req, res) {}

async function destroy(req, res) {}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
