const { response } = require('express');

const Usuario = require('../models/Usuario');
const Parametro = require('../models/Parametro');
const Recomendacion = require('../models/Recomendacion');

const recomendacionesPorSintoma = async (req, resp = response) => {
    try {
        const listRecomendaciones = await Recomendacion.find({idTipoRecomendacion: "633cb4feb71ce1c00491b4f5"})
        .populate('idTipoRecomendacion')
        .populate('idParametro');

        const sintomas = await Parametro.find({idTipoParametro: "632e694a7bab36dbf8f79e4f"}).populate("idTipoParametro");

        var recomendaciones = {};
        sintomas.map((sintoma) => {
            recomendaciones[sintoma.nombre] = listRecomendaciones.filter((recomendacion) => recomendacion.idParametro._id.equals(sintoma._id));
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
        const recomendaciones = await Recomendacion.find().populate('idTipoRecomendacion')
                                                        .populate('idParametro');
                                                        
        resp.status(200).json({
            ok: true,
            msg: 'Lista de recomendaciones',
            recomendaciones
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
        console.log(req.body);
        const recomendacion = new Recomendacion(req.body);
        await recomendacion.save();

        const recomendaciones = await Recomendacion.find().populate('idTipoRecomendacion')
                                                        .populate('idParametro');

        resp.status(200).json({
            ok:true,
            msg: 'Recomendacion creada con exito',
            recomendaciones
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg: "Error al crear la recomendacion",
        })
    }
}

const actualizarRecomendacion = async (req, resp = response) => {
    try {
        const recomendacionId = req.params.id;
        const recomendacion = await Recomendacion.findById(recomendacionId);

        if(!recomendacion){
            return resp.status(201).json({
                ok: false,
                msg: 'El id no corresponde a un ninguna recomendacion',
            });
        }

        await Recomendacion.findByIdAndUpdate(recomendacionId, req.body, {new: true});
        const recomendaciones = await Recomendacion.find().populate('idTipoRecomendacion')
                                                        .populate('idParametro');

        return resp.status(200).json({
            ok: true,
            msg: 'Recomendacion actualizada',
            recomendaciones
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar la recomendacion',
        });
    }
}

const eliminarRecomendacion = async (req, resp = response) => {
    try {
        const recomendacionId = req.params.id;
        const recomendacion = await Recomendacion.findById(recomendacionId);

        if(!recomendacion){
            return resp.status(200).json({
                ok: false,
                msg: 'El id no corresponde a un ninguna recomendación',
            });
        }

        await Recomendacion.findByIdAndDelete(recomendacionId);
        const recomendaciones = await Recomendacion.find().populate('idTipoRecomendacion')
                                                        .populate('idParametro');

        return resp.status(200).json({
            ok: true,
            msg: 'Recomendación eliminada',
            recomendaciones
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al eliminar la recomendación',
        });
    }
}

module.exports = {
    crearRecomendacion,
    obtenerRecomendacion,
    actualizarRecomendacion,
    eliminarRecomendacion,
    recomendacionesPorSintoma,
    recomendacionesPorEnfermedad
}