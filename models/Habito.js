const { Schema, model } = require('mongoose');

const HabitoSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    valorRiesgo:{
        type: Number,
        required: true
    }
});

module.exports = model('habito', HabitoSchema)