const faker = require("@faker-js/faker").fakerES;
const { mongoose } = require("../config/db");
const Follow = require("../models/Follows");
const User = require("../models/User");

module.exports = async () => {
  await mongoose.connection.dropCollection("follows");

  const follows = [];
  const users = await User.find();
  for (let i = 0; i < 500; i++) {
    const follower = users[faker.number.int({ min: 0, max: 99 })];
    const following = users[faker.number.int({ min: 0, max: 99 })];
    follows.push({ follower, following });
  }
  await Follow.create(follows);
  console.log("[Database] Se corrió el seeder de Follow.");
};
