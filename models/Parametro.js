const { Schema, model } = require('mongoose');

const EnfermedadSchema = Schema({
    idTipoParametro:{
        type: Schema.Types.ObjectId,
        ref: 'tipoParametro',
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    valorRiesgo:{
        type: Number,
        required: true
    }
});

module.exports = model('parametro', EnfermedadSchema)