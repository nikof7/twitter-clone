const faker = require("@faker-js/faker").fakerES;
const { mongoose } = require("../config/db");
const Tweet = require("../models/Tweet");
const User = require("../models/User");

module.exports = async () => {
  await mongoose.connection.dropCollection("tweets");

  const users = await User.find();

  const tweets = [];

  for (let i = 0; i < 500; i++) {
    const randomUser = users[faker.number.int({ min: 0, max: 99 })];

    const tweet = new Tweet({
      content: faker.lorem.text(70).slice(0, 140),
      user: randomUser._id,
      likes: faker.helpers.arrayElements(users, { min: 0, max: 40 }),
    });

    tweets.push(tweet);
    randomUser.tweets.push(tweet.id);
    await randomUser.save();
  }

  await Tweet.insertMany(tweets);
  console.log("[Database] Se corrió el seeder de Tweet.");
};
