const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos:{
        type: String,
        required: true
    },
    edad:{
        type: Number,
        required: true
    },
    sexo:{
        type: String,
        required: true
    },
    fechaNacimiento:{
        type: Date,
        required: true
    },
    paisResidencia:{
        type: Schema.Types.ObjectId,
        ref: 'pais',
        required: true
    },
    paisOrigen:{
        type: Schema.Types.ObjectId,
        ref: 'pais',
        required: true
    },
    peso:{
        type: Number,
        required: true
    },
    peso:{
        type: Number,
        required: true
    },
    imc:{
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contrasenia:{
        type: String,
        required: true
    },
    anteceFamiliares:[{
        enfermedad:{
            type: Schema.Types.ObjectId,
            ref: 'enfermedad',
        }
    }],
    enfermedadesUsuario:[{
        enfermedad:{
            type: Schema.Types.ObjectId,
            ref: 'enfermedad',
        }
    }],
    habitosVida:[{
        habito:{
            type: Schema.Types.ObjectId,
            ref: 'habito',
        }
    }],
    riesgoUsuario:{
        type: Number,
    },

});

module.exports = model('usuario', UsuarioSchema)