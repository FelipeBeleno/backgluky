const { Schema, model } = require("mongoose");

const usuarioSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es requerida"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "El numero es obligatorio"],
  },
  identificacion: {
    type: String,
    required: [true, "La identificacion es obligatoria"],
  },
  rol: {
    type: String,
  enum: ["Administrador", "Desarrollador", "Comercial", "Call center"],
    default: "Comercial",
  },
  idFirebase: {
    type: String,
    required: [true, "El id de firebase es necesario"],
  },
});

usuarioSchema.methods.toJSON = function () {
  const { _id, password, ...usuario } = this.toObject();
  usuario.id = _id;
  return usuario;
};

module.exports = model("Usuario", usuarioSchema);
