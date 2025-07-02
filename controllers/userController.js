const bcrypt = require("bcrypt");
const User = require("../models/User");
const formidable = require("formidable");
const Follow = require("../models/Follows");

async function show(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select("-password")
      .populate("tweets", ["content", "likes", "likesCount"]);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
}

async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(fields);
      console.error("Error al procesar el formulario: ", err);
      return res.status(400).json({ msg: "Error interno del servidor" });
    }
    try {
      const { firstname, lastname, username, email, password } = fields;
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) return res.status(400).json({ msg: "Username o email ya en uso" });
      const userData = { firstname, lastname, username, email, password };

      if (files.image) userData.image = files.image.newFilename;

      await User.create(userData);
      return res.status(201).json({ msg: "Usuario creado correctamente" });
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  });
}

async function toggleFollowUser(req, res) {
  const userId = req.auth.sub;
  const followingId = req.params.id;

  if (userId === followingId) return res.json({ msg: "No te podes seguir a vos mismo" });

  const existingFollow = await Follow.findOne({ follower: userId, following: followingId });

  if (existingFollow) {
    await existingFollow.deleteOne();
    return res.status(200).json({ msg: "Lo dejaste de seguir" });
  } else {
    await Follow.create({ follower: userId, following: followingId });
    return res.status(200).json({ msg: "Lo comenzaste a seguir" });
  }
}

module.exports = {
  show,
  store,
  toggleFollowUser,
};
