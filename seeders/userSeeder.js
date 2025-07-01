const faker = require("@faker-js/faker").fakerES;
const { mongoose } = require("../config/db");
const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = async () => {
  await mongoose.connection.dropCollection("users");
  const users = [];

  for (let i = 0; i < 100; i++) {
    users.push({
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: await bcrypt.hash("1234", 10),
      bio: faker.lorem.paragraph(),
    });
  }

  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de User.");
};
