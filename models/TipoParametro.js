const { Schema, model } = require('mongoose');

const TipoParametroSchema = Schema({
    nombre:{
        type: String,
        required: true
    }
});

module.exports = model('tipoParametro', TipoParametroSchema)