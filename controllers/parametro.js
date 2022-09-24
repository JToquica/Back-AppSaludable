const { response } =require('express');

const Parametro = require('../models/Parametro');

const obtenerParametros = async (req, resp = response) => {
    try {
        const parametros = await Parametro.find();
        resp.status(200).json({
            ok: true,
            msg: 'Lista de parametros',
            parametros
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al listar parametros',
        })
    }
}

const crearParametro = async (req, resp = response) => {
    try {
        const parametro = new Parametro(req.body);
        const parametroSave = await parametro.save();

        resp.status(201).json({
            ok: true,
            msg: 'Parametro creado de manera exitosa',
            parametroSave
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al crear parametro',
        })
    }
}

module.exports = {
    obtenerParametros,
    crearParametro
}