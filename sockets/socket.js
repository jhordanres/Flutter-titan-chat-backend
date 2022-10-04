const {io} = require('../index.js');



//Mensajes de Sockets y conectar
io.on('connection', client => {
    console.log('Cliente conectado');

    //Para desconectar al usuario del server
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    /*
    //Para recibir (escuchar) el mensaje emitido del lado del servidor
    client.on('mensaje', (payload) =>{
        console.log('Mensaje',payload);

        //Para que el servidor reciva el mensaje emitido y lo muestre en todos los usuarios conectados
        io.emit('mensaje',{admin:'Nuevo mensaje'});

    });
    */

    
  });