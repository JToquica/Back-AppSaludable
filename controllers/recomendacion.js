const { response } = require('express');

const Recomendacion = require('../models/Recomendacion');
const Usuario = require('../models/Usuario');


const recomendacionesPorEnfermedad = async (req, resp = response) => {
    try {
        const id = req.params.id 

        const listRecomendaciones = await Recomendacion.find({idTipoRecomendacion: "633218cd05abbcd8122d35ad"})
        .populate('idTipoRecomendacion')
        .populate('idParametro');

        const usuario = await Usuario.findById(id).populate("enfermedadesUsuario");

        enfermedadesUsuario = usuario.enfermedadesUsuario;

        var recomendaciones = {};
        enfermedadesUsuario.map((enfermedad) => {
            recomendaciones[enfermedad.nombre] = listRecomendaciones.filter((recomendacion) => recomendacion.idParametro._id.equals(enfermedad._id));
        });

        resp.status(200).json({
            ok: true,
            msg: 'Lista de recomendaciones',
            recomendaciones: recomendaciones
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al listar recomendaciones'
        })
    }
}

const obtenerRecomendacion = async (req, resp = response) => {
    try {
        const recomendacion = await Recomendacion.find().populate('idTipoRecomendacion')
                                                        .populate('idParametro');
        resp.status(201).json({
            ok: true,
            msg: 'Lista de recomendaciones',
            recomendacion
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al lsitar recomendaciones'
        })
    }
}

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

const actulizarRecomendacion = async (req, resp = response) => {
    const recomendacionId = req.params.id;

    try {
        const recomendacion = await Recomendacion.findById(recomendacionId);

        if(!recomendacion){
            return resp.status(201).json({
                ok: false,
                msg: 'El id no corresponde a un ninguna recomendacion',
            });
        }
        const recomendacionActualizado = await Recomendacion.findByIdAndUpdate(recomendacionId, req.body, {new: true});

        return resp.status(200).json({
            ok: true,
            msg: 'Recomendacion actualizado',
            parametro: recomendacionActualizado
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar la recomendacion',
        });
    }
}

module.exports = {
    obtenerRecomendacion,
    crearRecomendacion,
    actulizarRecomendacion,
    recomendacionesPorEnfermedad
}