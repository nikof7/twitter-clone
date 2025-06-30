const faker = require("@faker-js/faker").fakerES;
const { mongoose } = require("../config/db");
const Tweet = require("../models/Tweet");
const User = require("../models/User");

module.exports = async () => {
  await mongoose.connection.dropCollection("tweets");
  const tweets = [];

  const users = await User.find();

  for (let i = 0; i < 500; i++) {
    tweets.push({
      content: faker.lorem.text(70).slice(0, 140),
      user: users[faker.number.int({ min: 0, max: 99 })],
      likes: faker.helpers.arrayElements(users, { min: 0, max: 40 }),
    });
  }

  await Tweet.insertMany(tweets);
  console.log("[Database] Se corrió el seeder de Tweet.");
};
