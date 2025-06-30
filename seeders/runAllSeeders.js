/*
 * Este archivo se encarga de importar todos los seeders que se hayan definido
 * en el sistema y ejectuarlos.
 *
 * Para ejecutar este archivo se debe correr el comando:
 *
 * 👉 node seeders/runAllSeeders.js
 *
 *
 * Como alternativa, en el artchivo package.json se creó un comando "alias"
 * para que la ejecución sea un poco más corta:
 *
 * 👉 npm run seeders
 */

require("dotenv").config();

async function runAllSeeders() {
  // Seeders:

  await require("./userSeeder")();
  // await require("./tweetSeeder")();
  

  /*
   * Aquí se pueden ejectuar otros seeders que hayan en el sistema.
   * Por ejemplo, si se tuviesen seeders para los estudiantes
   * habría que ejectuar:
   *
   * await require("./studentSeeder")();
   *
   * IMPORTANTE: Presetar mucha atención al orden en que se ejecutan
   * los seeders. No es lo mismo crear primero los usuarios que los
   * artículos. Debe haber una lógica en el orden.
   */

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
  process.exit();
}

runAllSeeders();
