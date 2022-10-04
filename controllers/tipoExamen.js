const { response } =require('express');

const TipoExamen = require('../models/TipoExamen');

const obtenerTiposExamenes = async (req, resp = response) => {
    try {
        const tipoExamen = await TipoExamen.find();
        resp.status(200).json({
            ok: true,
            msg: 'Lista de tipos de examenes',
            tipoExamen
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al listar tipos de examenes',
        })
    }
}

const crearTipoExamen = async (req, resp = response) => {
    try {
        const tipoExamen = new TipoExamen(req.body);
        const tipoExamenSave = await tipoExamen.save();

        resp.status(201).json({
            ok: true,
            msg: 'Tipo examen creado de manera exitosa',
            tipoExamenSave
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al crear el tipo examen',
        })
    }
}

const actualizarTipoExamen = async (req, resp = response) => {
    const tipoExamenId = req.params.id;

    try {
        const tipoExamen = await TipoExamen.findById(tipoExamenId);

        if(!tipoExamen){
            return resp.status(201).json({
                ok: false,
                msg: 'El id no corresponde a ningun tipo examen'
            });
        }
        const tipoExmamenActualizado = await TipoExamen.findByIdAndUpdate(tipoExamenId, req.body, {new: true});

        return resp.status(201).json({
            ok: true,
            msg: 'Tipo exmamen actualizado',
            tipoExamen: tipoExmamenActualizado
        });  
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar el tipo examen',
        })
    }
}

const eliminarTipoExamen = async (req, resp = response) => {
    const tipoExamenId = req.params.id;

    try {
        const tipoExamen = await TipoExamen.findById(tipoExamenId);

        if(!tipoExamen){
            resp.status(404).json({
                ok: false,
                msg: 'El id no corresponde a ningun tipo examen',
            });
        }
        await TipoExamen.findByIdAndDelete(tipoExamenId);

        resp.status(201).json({
            ok: true,
            msg: 'Tipo examen eliminado'
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: "Error al eliminar el tipo examen"
        });
    }
}

module.exports = {
    obtenerTiposExamenes,
    crearTipoExamen,
    actualizarTipoExamen,
    eliminarTipoExamen
}