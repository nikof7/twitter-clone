/*
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * Además, en este caso, se está usando una librería llamada Faker
 * (https://fakerjs.dev/) para facilitar la creación de datos ficticios como
 * nombres, apellidos, títulos, direcciones y demás textos.
 *
 * Suele ser común que en los seeders exista un `for` donde se define la
 * cantidad de registros de prueba que se insertarán en la base de datos.
 * En este ejemplo se están insertando 500 artículos con textos ficticios.
 */

const faker = require("@faker-js/faker").fakerES;
const Tweet = require("../models/Tweet");
const User = require("../models/User");
module.exports = async () => {
  const tweets= [];
  const users= User.find()
  for (let i = 0; i < 500; i++) {
    
    tweets.push({
      content:lorem.text.words(70).slice(0, 140),
      user:users[
       faker.number.int({min:0, max:99})
      ],

    });
  }


  await tweets.insertMany(tweets);
  console.log("[Database] Se corrió el seeder de tweets.");
};
