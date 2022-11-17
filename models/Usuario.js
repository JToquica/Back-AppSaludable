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
        type: Number
    },
    sexo:{
        type: String
    },
    fechaNacimiento:{
        type: Date
    },
    paisResidencia:{
        type: Schema.Types.ObjectId,
        ref: 'pais'
    },
    paisOrigen:{
        type: Schema.Types.ObjectId,
        ref: 'pais'
    },
    peso:{
        type: Number
    },
    altura:{
        type: Number,
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
        },
        puntaje: {
            type: Number,
            required: true
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
    isCompleteData: {
        type: Boolean,
        default: false,
    }
});

UsuarioSchema.method('toJSON', function() {
    const {__v, password, ...object} = this.toObject();
    return object;
});

module.exports = model('usuario', UsuarioSchema)