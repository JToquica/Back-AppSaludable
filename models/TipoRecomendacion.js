const { Schema, model } = require('mongoose');

const TipoRecomendacionSchema = Schema({
    nombre:{
        type: String,
        required: true
    }
},{
    collection: 'tipoRecomendaciones'
});

module.exports = model('tipoRecomendacion', TipoRecomendacionSchema)