const userRoutes = require("./userRoutes");
const tweetRoutes = require("./tweetRoutes");
const authRoutes = require("./authRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use("/users", userRoutes);
  app.use("/tweets", tweetRoutes);
  app.use("/tokens", authRoutes);
};
