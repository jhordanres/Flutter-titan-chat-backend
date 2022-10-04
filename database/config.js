const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        //Conecxion a la db
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB online');

    }catch (error){
        console.log(error);
        throw new Error('Error en la base de datos, hable con el admin');
    }
}

module.exports = {
    dbConnection
}