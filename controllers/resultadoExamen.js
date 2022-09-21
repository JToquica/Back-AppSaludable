const { response } = require('express');

const Resultado = require('../models/ResultadoExamen');

const crearResultado = async (req, resp = response) =>{
    try {
        const resultado = new Resultado(req.body);
        const resultadoSave = await resultado.save();

        resp.status(201).json({
            ok: true,
            msg: 'Resultado creado con exito',
            resultadoSave
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg: 'Error al crear el resultado',
        })
        
    }
}

module.exports = {crearResultado}