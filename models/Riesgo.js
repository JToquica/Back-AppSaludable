const { Schema, model } = require('mongoose');

const RiesgoSchema = Schema({
    nombre:{
        type: String,
        required: true,
        unique: true
    },
    rangoMinimo:{
        type: Number,
        required: true
    },
    rangoMaximo:{
        type: Number,
        required: true
    },
    recomendaciones:[{
        type: String,
        required: true
    }],
});

module.exports = model('riesgo',RiesgoSchema)