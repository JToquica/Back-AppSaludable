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
    altura:{
        type: Number,
        required: true
    },
    imc:{
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    antecedentesFamiliares:[{
        enfermedad:{
            type: Schema.Types.ObjectId,
            ref: 'parametro',
        }
    }],
    enfermedadesUsuario:[{
        enfermedad:{
            type: Schema.Types.ObjectId,
            ref: 'parametro',
        }
    }],
    habitosVida:[{
        habito:{
            type: Schema.Types.ObjectId,
            ref: 'parametro',
        }
    }],
    resultadosExamenes:[{
        resultadoExamen:{
            type: Schema.Types.ObjectId,
            ref: 'resultadoExamen',
        }
    }],
    riesgoUsuario:{
        type: Number,
    },
    tipoRiesgo:{
        type: Schema.Types.ObjectId,
        ref: 'riesgo',
    },
    rol:{
        type: Schema.Types.ObjectId,
        ref: 'rol',
        required: true,
        default: '632f2dd26f8c814317209cb6'
    },

});

module.exports = model('usuario', UsuarioSchema)