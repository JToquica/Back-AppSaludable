const { Schema, model } = require('mongoose');

const TipoExamenSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    rangoBueno:{
        type: Number,
        required: true
    },
    rangoRegular:{
        type: Number,
        required: true
    },
    rangoMalo:{
        type: Number,
        required: true
    },
},{
    collection: 'tipoExamenes'
});

module.exports = model('tipoExamen', TipoExamenSchema)