const { Schema, model } = require('mongoose');

const PaisShema = Schema({
    nombre: {
        type: String,
        required: true
    }
},{
    collection: "paises"
});

module.exports = model('pais', PaisShema)