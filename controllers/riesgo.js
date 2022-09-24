const { response } =require('express');

const Riesgo = require('../models/Riesgo');

const obtenerRiesgos = async (req, resp = response) => {
    try {
        const riesgos = await Riesgo.find();
        resp.status(200).json({
            ok: true,
            msg: 'Lista de riesgos',
            riesgos
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al listar los riesgos',
        })
    }
}

const crearRiesgo = async (req, resp = response) => {
    try {
        const riesgo = new Riesgo(req.body);
        const riesgoSave = await riesgo.save();

        resp.status(201).json({
            ok: true,
            msg: 'Riesgo creado de manera exitosa',
            riesgoSave
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al crear el riesgo',
        })
    }
}

module.exports = {
    obtenerRiesgos,
    crearRiesgo
}