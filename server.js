require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const port = process.env.APP_PORT;
const app = express();

// app.use(cors()); // Para habilitar esta línea es necesario instalar la librería `cors`.
app.use(express.static("public"));
app.use(express.json());

routes(app);

app.listen(port, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${port}.`);
  console.log(`[Express] Ingresar a http://localhost:${port}.\n`);
});

process.on("SIGINT", function () {
  const { mongoose } = require("./config/db");
  mongoose.connection.close(function () {
    console.log("Mongoose default connection is disconnected due to application termination.\n");
    process.exit(0);
  });
});
