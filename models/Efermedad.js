const { Schema, model } = require('mongoose');

const EnfermedadSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    valorRiesgo:{
        type: Number,
        required: true
    }
},{
    collection: 'enfermedades'
});

module.exports = model('enfermedad', EnfermedadSchema)