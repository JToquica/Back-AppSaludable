const { response } =require('express');

const Pais = require('../models/Pais');

const crearPais = async (req, resp = response) => {
    try {
        const pais = new Pais(req.body);
        const paisSave = await pais.save();

        resp.status(201).json({
            ok: true,
            msg: 'Pais creado con exito',
            paisSave
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Erro al crear el pais',
        })
    }
}

module.exports = {crearPais}