const { response } = require("express");
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require("../helpers/jws");
const user = require("../models/user");

//Controlador para el registro del usuario
const crearUsuario = async (req, res = response ) => {

    const { email, password } = req.body;

    try {

        //condicional para preguntar si existe un email
        const existsEmail = await User.findOne({email});
        if( existsEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'Este correo ya existe'
            });
        }

        const user = new User(req.body);

        //Encriotar contraseña con bcrypt
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //Para grabar la nueva instancia de mi modelo en la bd
        await user.save();
        
        //Generar mi JWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Controlador para login del usuario 
const login = async (req, res =  response) =>{

    const { email, password } = req.body;

    try{

        //Validamos si el email existe

        const userDB = await User.findOne({email});

        if( !userDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Correo invalido'
            });
        }

        //Validamos si existe el password
        const validatePassword = bcrypt.compareSync(password, userDB.password);
        if( !validatePassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña invalida'
            });
        }

        //Despues de validar el email y el pass pasamos a generar el JWT
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            user: userDB,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
    
}

//Creo un controlador para renovar el token del usuario
const renewToken = async (req, res = response) => {

    //Primero recupero el uid del usuario
    const uid = req.uid;

    //Luego me genero un nuevo JWT
    const token = await generateJWT(uid);

    // Ahora obtengo el usuario por el UID
    const user = await User.findById(uid);

    res.json({
        ok: true,
        user,
        token
    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}