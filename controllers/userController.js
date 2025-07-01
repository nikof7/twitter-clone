const bcrypt = require("bcrypt");
const User = require("../models/User");
const formidable = require("formidable");

async function show(req, res) {
  try {
    console.log(req.params);
    const user = await User.findOne({ username: req.params.username })
      .select("-password")
      .populate("tweets", ["content", "likes"]);
    res.status(200).json({ user });
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
      console.error("Error al procesar el formulario: ", err);
      return res.status(400).send("Error al procesar el formulario");
    }
    try {
      const { firstname, lastname, username, email } = fields;
      const password = await bcrypt.hash(fields.password, 10);
      const image = files.image.newFilename;
      const user = new User({ firstname, lastname, username, password, email, image });
      await user.save();
      res.status(201).json({ msg: "Usuario creado correctamente" });
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      res.status(500).send("Error interno del servidor");
    }
  });
}

module.exports = {
  show,
  store,
};
