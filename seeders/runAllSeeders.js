require("dotenv").config();

async function runAllSeeders() {
  await require("./userSeeder")();
  await require("./tweetSeeder")();
  await require("./followsSeeder")();

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
  process.exit();
}

runAllSeeders();
