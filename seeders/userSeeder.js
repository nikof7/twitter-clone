const faker = require("@faker-js/faker").fakerES;
const { mongoose } = require("../config/db");
const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = async () => {
  await mongoose.connection.dropCollection("users");
  const users = [];
  const hashedPassword = await bcrypt.hash("1234", 10);
  for (let i = 0; i < 100; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const username = (firstname + lastname + faker.number.int({ min: 500, max: 1000 })).replace(
      " ",
      "",
    );
    users.push({
      firstname,
      lastname,
      username,
      //email: username + "@gmail.com",
      email: faker.internet.email(),
      password: hashedPassword,
      bio: faker.lorem.paragraph(),
    });
  }

  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de User.");
};
