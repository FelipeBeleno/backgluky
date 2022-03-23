const { response, request } = require("express");

const Usuario = require("../models/usuario.model");

const usuariosGet = async (req, res = response) => {
  let usuarios = await Usuario.find();
  res.json(usuarios);
};

const createUser = (req = request, res = response) => {
  try {
    const user = new Usuario({
      ...req.body,
    });
    user
      .save()
      .then((r) => res.json(r))
      .catch((e) => res.json(e));
  } catch (error) {
    res.json(error);
  }
};

const usuariosGetId = async (req = request, res = response) => {
  const { id } = req.params;
  console.log('ESTE ES EL ID',id)
  let user = await Usuario.findOne({ idFirebase: id });
    
  console.log(user)

  let count = await Usuario.count();

  if (user === null) {
    let newUseer = new Usuario({
      name: "no definido",
      password: "no definido",
      email: "no definido" + count,
      identificacion: "no definido",
      rol: "Comercial",
      idFirebase: req.params.id,
      phone: "+57" + req.body.phone,
    });

    let respuesta = await newUseer.save();
    return res.json(respuesta);
  } else {
    return res.json(user);
  }
};

const usuariosPost = async (req = request, res = response) => {
  const { name, password, email, identificacion, rol, idFirebase, phone } =
    req.body;

  let usuario = new Usuario({
    name,
    password,
    email,
    identificacion,
    rol,
    idFirebase,
    phone,
  });

  usuario
    .save()
    .then((resp) => {
      res.json({
        ...resp,
      });
    })
    .catch((error) => {
      res.json({
        ...error,
      });
    });
};

const usuariosUpdate = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    await Usuario.findOneAndUpdate(
      { idFirebase: id },
      {
        ...req.body,
      }
    );
    usuario = await Usuario.findOne({ idFirebase: id });

    res.json({
      respuesta: req.body,
      id,
    });
  } catch (error) {
    res.json(error);
  }
};

const usuariosDelete = async (req = request, res = response) => {
  // const usuario  = await Usuario.findOneAndDelete({ idFirebase: req.params.id });

  const { id } = req.params;

  console.log(id, "ESTE ES EL ID");
  const usuario = await Usuario.findOne({
    idFirebase: id,
  });

  console.log("Este es el ID DEL usuario", usuario._id);

  const respuestaDelete = await Usuario.deleteMany({ _id: usuario._id });
  return res.json({
    ...respuestaDelete,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosUpdate,
  usuariosGetId,
  createUser,
  usuariosDelete,
};
