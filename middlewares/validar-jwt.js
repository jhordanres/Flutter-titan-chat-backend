const { response } = require('express');
const jwt = require('jsonwebtoken');

//Creo mi función para validar el JWT
const validateJWT = (req, res, next) =>{

    //Primero leo el token
    const token = req.header('x-token');

    //Luego pregunto en la condicional si viene algun token
    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    //Luego si si tiene un token entonces hago un try y catch
    //Esto para continuar con el proceso y capturar el error si existe
    try {
        
        //Primero extraigo el uid del payload del token
        const { uid } = jwt.verify( token, process.env.JWT_KEY);
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }


}

module.exports = {
    validateJWT
}