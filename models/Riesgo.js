const { Schema, model } = require('mongoose');

const RiesgoSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    puntaje:{
        type: Number,
        required: true
    },
    recomendaciones:[{
        recomendacion:{
            type: Schema.Types.ObjectId,
            ref: 'recomendacion',
        }
    }],
});

module.exports = model('riesgo',RiesgoSchema)