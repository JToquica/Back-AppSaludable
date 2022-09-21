const { Schema, model } = require('mongoose');

const ResultExamSchema = Schema({
    idUsuario:{
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true,
    },
    nombreExamen:{
        type: String,
        required: true
    },
    resultadoExamen:{
        type: String,
        required: true
    }
},{
    collection: 'resultadoExamenes'
});

module.exports = model('resuoltadoExamen', ResultExamSchema)