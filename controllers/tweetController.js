const Tweet = require("../models/Tweet");

async function index(req, res) {
  try {
    const tweets = await Tweet.find().sort({ createdAt: -1 }).limit(20);
    return res.status(200).json({ tweets });
  } catch (error) {
    console.error("Error al obtener los tweets:", error);
    return res.status(500).send("Error interno del servidor");
  }
}

async function store(req, res) {
  try {
    const userId = req.auth.sub;
    const { content } = req.body;

    if (!content || typeof content !== "string" || content.trim() === "") {
      return res.status(400).json({ error: "El contenido del tweet es obligatorio" });
    }

    if (content.length > 140) {
      return res.status(400).json({ error: "El tweet no puede superar los 140 caracteres" });
    }

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "Debe especificarse un usuario válido" });
    }

    const tweet = await Tweet.create({
      content: content.trim(),
      user: userId,
    });

    return res.status(201).json({ msg: "Tweet creado correctamente", tweet });
  } catch (error) {
    console.error("Error al crear el tweet:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function update(req, res) {
  try {
    const userId = req.auth.sub;
    const tweet = await Tweet.findById(req.params.id);
    const found = tweet.likes.includes(userId);

    if (found) {
      tweet.likes.pull(userId);
    } else {
      tweet.likes.push(userId);
    }

    await tweet.save();
    return res.status(200).json({ tweet });
  } catch (error) {
    res.status(200).json({ msg: error });
    console.log(error);
  }
}

async function destroy(req, res) {
  try {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Tweet eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}

module.exports = {
  index,
  store,
  update,
  destroy,
};
