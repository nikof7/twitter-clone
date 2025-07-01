const userRoutes = require("./userRoutes");
const tweetRoutes = require("./tweetRoutes");

module.exports = (app) => {
  app.use("/users", userRoutes);
  app.use("/tweets", tweetRoutes);
};
