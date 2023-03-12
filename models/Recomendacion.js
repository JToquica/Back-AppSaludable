const { Schema, model } = require('mongoose');

const RecomendacionSchema = Schema({
    idTipoRecomendacion: {
        type: Schema.Types.ObjectId,
        ref: 'tipoRecomendacion',
        required: true
    },
    idParametro: {
        type: Schema.Types.ObjectId,
        ref: 'parametro',
        required: true
    },
    recomendacion: {
        type: String,
        required: true
    },
    prioridad: {
        type: Number,
        required: true
    }
},{
    collection: 'recomendaciones'
});

module.exports = model('recomendacion', RecomendacionSchema)