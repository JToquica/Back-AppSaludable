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

const actulizarTipoRecomendacion = async (req, resp = response) => {
    const tipoRecomendacionId = req.params.id;

    try {
        const tipoRecomendacion = await TipoRecomendacion.findById(tipoRecomendacionId);

        if(!tipoRecomendacion){
            return resp.status(201).json({
                ok: false,
                msg: 'El id no corresponde a ningun tipo recomendacion',
            });
        }
        const tipoRecomendacionActualizado = await TipoRecomendacion.findByIdAndUpdate(tipoRecomendacionId, req.body, {new: true});

        return resp.status(201).json({
            ok: true,
            msg: 'Tipo recomendacion actualizada',
            tipoRecomendacion: tipoRecomendacionActualizado
        });

    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar el tipo recomendacion',
        });
    }
}

module.exports = {
    obtenerTipoRecomendacion,
    crearTipoRecomendacion,
    actulizarTipoRecomendacion
}