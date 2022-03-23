const { Router } = require('express')
const { check } = require('express-validator');
const { usuariosLogin } = require('../controllers/auth.controller');


const route = Router()


route.post('/login',[
    check('email', 'El email es necesario para la autenticación').isEmail(),
    check('password', 'El password es necesario para la autenticación').not().isEmpty()
], usuariosLogin )





module.exports = route;