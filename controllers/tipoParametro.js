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

const actulizarTipoParametro = async (req, resp = response) => {
    const tipoParametroId = req.params.id;

    try {
        const tipoParametro = await TipoParametro.findById(tipoParametroId);

        if(!tipoParametro){
            return resp.status(201).json({
                ok: false,
                msg: 'El id no corresponde a un ningun tipo parametro',
            });
        }
        const tipoParametroActualizado = await TipoParametro.findByIdAndUpdate(tipoParametroId, req.body, {new: true});

        return resp.status(200).json({
            ok: true,
            msg: 'Tipo parametro actualizado',
            tipoParametro: tipoParametroActualizado
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar el tipo parametro',
        });
    }
}

module.exports = {
    obtenerTipoParametro,
    crearTipoParametro,
    actulizarTipoParametro
}