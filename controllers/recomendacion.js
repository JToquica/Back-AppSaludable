const { response } = require('express');

const Recomendacion = require('../models/Recomendacion');

const crearRecomendacion = async (req, resp = response) => {
    try {
        const recomendacion = new Recomendacion(req.body);
        const recomendacionSave = await recomendacion.save();

        resp.status(201).json({
            ok:true,
            msg: 'Recomendacion creada con exito',
            recomendacionSave
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg: "Error al crear la recomendacion",
        })
    }
}

module.exports = {crearRecomendacion}