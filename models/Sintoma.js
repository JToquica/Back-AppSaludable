const { Schema, model } = require('mongoose');

const SintomaSchema = Schema({
    nombre:{
        type: String,
        required: true
    }
});

module.exports = model('Sintomas', SintomaSchema)