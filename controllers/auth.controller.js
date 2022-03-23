const { response, request } = require('express')

const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario.model');
const { validationResult } = require('express-validator');
const generarJWT = require('../helpers/generarJSW');



// inicio de sesion
const usuariosLogin = async (req = request, res = response) => {

    // Middelware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    // transformar entrada a lower case por que todos los correos esta en lower case
    let { email, password } = req.body
    email = email.toLowerCase()

    // validacion de usuario
    const usuario = await Usuario.findOne({ email })

    // si el usuario es null 
    if (!usuario) return res.status(400).json({
        ok: false,
        msg: "Email o contraseña invalida"
    })

    // validacion si el usuario esta validado
    if (usuario.verificado) return res.status(400).json({
        ok: false,
        msg: "El correo aun no esta validado"
    })

    // validacion de contraseña
    const validationPass = bcryptjs.compareSync(password, usuario.password)
    if (!validationPass) return res.status(400).json({
        ok: false,
        msg: "Email o contraseña invalida"
    })

    // generacion del JWT
    const token = await generarJWT(usuario.id)
    res.json({
        usuario,
        token,
        msg: "full"
    })
}


module.exports = {
    usuariosLogin
}