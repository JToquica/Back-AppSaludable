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

const actualizarRiesgo = async (req, resp = response) => {
    const riesgoId = req.params.id;

    try {
        const riesgo = await Riesgo.findById(riesgoId);

        if(!riesgo){
            return resp.status(201).json({
                ok: false,
                msg: 'El id no corresponde a ningun riesgo'
            });
        }
        const riesgoActualizado = await Riesgo.findByIdAndUpdate(riesgoId, req.body, {new: true});
        const riesgos = await Riesgo.find();

        return resp.status(201).json({
            ok: true,
            msg: 'Riesgo actualizado',
            riesgos
        });  
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar el riesgo',
        })
    }
}

const eliminarRiesgo = async (req, resp = response) => {
    const riesgoId = req.params.id;

    try {
        const riesgo = await Riesgo.findById(riesgoId);

        if(!riesgo){
            resp.status(404).json({
                ok: false,
                msg: 'El id no corresponde a ningun riesgo',
            });
        }
        await Riesgo.findByIdAndDelete(riesgoId);

        resp.status(201).json({
            ok: true,
            msg: 'Riesgo eliminado'
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: "Error al eliminar el Riesgo"
        });
    }
}

module.exports = {
    obtenerRiesgos,
    crearRiesgo,
    actualizarRiesgo,
    eliminarRiesgo
}