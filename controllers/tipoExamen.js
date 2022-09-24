const { response } =require('express');

const TipoExamen = require('../models/TipoExamen');

const obtenerTiposExamenes = async (req, resp = response) => {
    try {
        const tipoExamen = await TipoExamen.find();
        resp.status(200).json({
            ok: true,
            msg: 'Lista de tipos de examenes',
            TipoExamen
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

module.exports = {
    obtenerTiposExamenes,
    crearTipoExamen
}