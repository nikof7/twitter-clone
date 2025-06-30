const faker = require("@faker-js/faker").fakerES;
const { mongoose } = require("../config/db");
const User = require("../models/User");

module.exports = async () => {
  await mongoose.connection.dropCollection("users");
  const users = [];

  for (let i = 0; i < 100; i++) {
    users.push({
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      bio: faker.lorem.paragraph(),
    });
  }

  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de User.");
};
