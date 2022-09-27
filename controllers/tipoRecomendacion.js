const { response } =require('express');

const TipoRecomendacion = require('../models/TipoRecomendacion');

const obtenerTipoRecomendacion = async (req, resp = response) => {
    try {
        const tipoRecomendacion = await TipoRecomendacion.find();
        resp.status(200).json({
            ok: true,
            msg: 'Lista de tipos de recomendaciones',
            tipoRecomendacion
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al listar los tipos de recomendaciones',
        })
    }
}

const crearTipoRecomendacion = async (req, resp = response) => {
    try {
        const tipoRecomendacion = new TipoRecomendacion(req.body);
        const tipoRecomendacionSave = await tipoRecomendacion.save();

        resp.status(201).json({
            ok: true,
            msg: 'Tipo recomendacion creado de manera exitosa',
            tipoRecomendacionSave
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al crear el tipo de recomendacion',
        })
    }
}

module.exports = {
    obtenerTipoRecomendacion,
    crearTipoRecomendacion
}