const { response } = require('express');

const TipoParametro = require('../models/TipoParametro');

const obtenerTipoParametro = async (req, resp = response) => {
    try {
        const tipoParametro = await TipoParametro.find();
        resp.status(200).json({
            ok: true,
            msg: 'Lista de tipos de parametros',
            tipoParametro
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al listar los tipos de parametros',
        })
    }
}

const crearTipoParametro = async (req, resp = response) => {
    try {
        const tipoParametro = new TipoParametro(req.body);
        const tipoParametroSave = await tipoParametro.save();

        resp.status(201).json({
            ok: true,
            msg: 'Tipo parametro creado de manera exitosa',
            tipoParametroSave
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al crear el tipo parametro',
        })
    }
}

module.exports = {
    obtenerTipoParametro,
    crearTipoParametro
}