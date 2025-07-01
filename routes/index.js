const userRoutes = require("./userRoutes");
const tweetRoutes = require("./tweetRoutes");
const authRoutes = require("./authRoutes");

module.exports = (app) => {
  app.use("/users", userRoutes);
  app.use("/tweets", tweetRoutes);
  app.use("/tokens", authRoutes);
};
