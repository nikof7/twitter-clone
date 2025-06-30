const Tweet = require("../models/Tweet");

// Display a listing of the resource.
async function index(req, res) {
  try {
    const tweets = await Tweet.find().sort({"createdAt": -1}).limit(20).populate("likes" , "username");


    //const hashe;dPassword = await bcrypt.hash(password, 10);

    res.json({tweets});
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
}


// Display the specified resource.
async function show(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const body = req.body;
    //const hashe;dPassword = await bcrypt.hash(password, 10);
    console.log(body);
    const tweet = new Tweet(body);
    await tweet.save()

    res.json({msj : "ok"});
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
