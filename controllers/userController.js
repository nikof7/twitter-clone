const bcrypt = require("bcrypt");
const User = require("../models/User");
const formidable = require("formidable");

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
      const { firstname, lastname, username, email } = fields;

      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser)
        return res.status(400).json({ error: "El email o el nombre de usuario ya está en uso" });
      const password = await bcrypt.hash(fields.password, 10);
      const userData = { firstname, lastname, username, email, password };
      console.log(files);
      if (files.image) userData.image = files.image.newFilename;

      await User.create(userData);
      return res.status(201).json({ msg: "Usuario creado correctamente" });
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  });
}

module.exports = {
  show,
  store,
};
