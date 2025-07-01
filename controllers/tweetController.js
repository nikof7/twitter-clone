const Tweet = require("../models/Tweet");

async function index(req, res) {
  try {
    const tweets = await Tweet.find().sort({ createdAt: -1 }).limit(20);

    res.json({ tweets });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
}

async function show(req, res) {}

async function store(req, res) {
  try {
    const { content, user } = req.body;

    const tweet = new Tweet({ content, user });
    await tweet.save();

    res.json({ msg: "ok" });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
}

async function update(req, res) {
  const userId = req.body.user;
  const tweet = await Tweet.findById(req.params.id);
  const found = tweet.likes.find((likerId) => String(likerId) === userId);

  if (found) {
    tweet.likes = tweet.likes.filter((likerId) => String(likerId) != userId);
    await tweet.save();
    res.json({ tweet });
  }

  tweet.likes.push(userId);
  await tweet.save();
  res.json({ tweet });
}

async function destroy(req, res) {
  try {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.json({ msg: "Deleted" });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
