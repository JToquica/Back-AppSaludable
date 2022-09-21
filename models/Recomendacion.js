const { Schema, model } = require('mongoose');

const RecomendacionSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    recomendacion:{
        type: String,
        required: true
    },
    puntaje:{
        type: Number,
        required: true
    }
},{
    collection: 'recomendaciones'
});

module.exports = model('recomendacion', RecomendacionSchema)