/*

    path: api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Me creo la ruta para el enpoint de registrar y le agegro un arreglo de
//midelware para que se ejecute si vienen todos los campos 
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario);

//Creo la ruta para el login y hago un check si son validos o no  tanto el correo como pass
router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
], login)

//Me creo una nueva ruta para valider el JWTK 
router.get('/renew',validateJWT ,renewToken);



module.exports = router;