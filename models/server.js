const express = require("express");
var cors = require("cors");
const { dbConection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // paths
    this.usuariosPath = "/api/usuarios";
    this.auth = "/api/auth";

    // conectar a la base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas app
    this.routes();
  }

  async conectarDB() {
    await dbConection();
  }

  middlewares() {
    // Cors
    this.app.use(
      cors({
        origin:
          "http://localhost:3001" ||
          "https://mmaompe.appspot.com " ||
          "http://localhost:4200" ||
          "http://localhost:4200/" ||
          "**",
      })
    );

    //parseo del body
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuario.route"));
    this.app.use(this.auth, require("../routes/auth.route"));
  }

  started() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en ", this.port);
    });
  }
}

module.exports = Server;
