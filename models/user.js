const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    }
});

//Para decirle que propiedades quiero que no me muestre de la bd
//y para renombra una propiedad en este caso el _id a uid
UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('User', UserSchema)