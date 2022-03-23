const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPost,
  usuariosUpdate,
  usuariosGetId,
  createUser,
  usuariosDelete
} = require("../controllers/usuarios");
const { validarJWT } = require("../middlewares/autenticacion.middleware");

const route = Router();

route.get("/", usuariosGet);

route.get("/:id", usuariosGetId);

route.post("/create", createUser);

route.post("/", usuariosPost);

route.put("/:id", usuariosUpdate);

route.delete("/:id", usuariosDelete);


module.exports = route;
