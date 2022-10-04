const express = require('express');
const path = require('path');
require('dotenv').config();

//Db config
require('./database/config').dbConnection();

//App de express
const app = express();

//Lectura y parseo de una petición http que vienen en el Body
app.use(express.json());

//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket.js');



//Path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//Mis rutas
app.use('/api/login', require('./routes/auth'));

server.listen(process.env.PORT, (err) => {
    if (err) throw Error(err);

    console.log('Servidor corriendo en el puerto: ', process.env.PORT);
});