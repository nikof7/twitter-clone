const Tweet = require("../models/Tweet");

async function index(req, res) {
  try {
    const tweets = await Tweet.find().sort({ createdAt: -1 }).limit(20);
    res.status(200).json({ tweets });
  } catch (error) {
    console.error("Error al obtener los tweets:", error);
    res.status(500).send("Error interno del servidor");
  }
}

async function store(req, res) {
  try {
    const { content, user } = req.body;

    if (!content || typeof content !== "string" || content.trim() === "") {
      return res.status(400).json({ error: "El contenido del tweet es obligatorio" });
    }

    if (content.length > 140) {
      return res.status(400).json({ error: "El tweet no puede superar los 140 caracteres" });
    }

    if (!user || typeof user !== "string") {
      return res.status(400).json({ error: "Debe especificarse un usuario válido" });
    }

    const tweet = new Tweet({
      content: content.trim(),
      user,
      createdAt: new Date(),
      likes: 0,
    });

    await tweet.save();

    res.status(201).json({ msg: "Tweet creado correctamente", tweet });
  } catch (error) {
    console.error("Error al crear el tweet:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function update(req, res) {
  const userId = req.body.user;
  const tweet = await Tweet.findById(req.params.id);
  const found = tweet.likes.find((likerId) => String(likerId) === userId);

  if (found) {
    tweet.likes = tweet.likes.filter((likerId) => String(likerId) != userId);
    await tweet.save();
    res.status(200).json({ tweet });
  }

  tweet.likes.push(userId);
  await tweet.save();
  res.status(200).json({ tweet });
}

async function destroy(req, res) {
  try {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Tweet eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

module.exports = {
  index,
  store,
  update,
  destroy,
};
