const { response } = require('express');

const Parametro = require('../models/Parametro');

const obtenerParametroPorTipo = async (req, resp = response) => {
    try {
        const idTipoParametro = req.params.id;
        console.log("IdTipoParametro:",idTipoParametro);
        const records = await Parametro.find().populate({path:'idTipoParametro', match: {_id: idTipoParametro}});
        console.log("records:",records);
        const parametros = records.filter(parametro => parametro.idTipoParametro)
        console.log("parametros:",parametros);
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

const obtenerParametros = async (req, resp = response) => {
    try {
        const parametros = await Parametro.find().populate('idTipoParametro');
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

const actulizarParametro = async (req, resp = response) => {
    const parametroId = req.params.id;

    try {
        const parametro = await Parametro.findById(parametroId);

        if(!parametro){
            return resp.status(201).json({
                ok: false,
                msg: 'El id no corresponde a un ningun parametro',
            });
        }
        const parametroActualizado = await Parametro.findByIdAndUpdate(parametroId, req.body, {new: true});

        return resp.status(200).json({
            ok: true,
            msg: 'Tipo parametro actualizado',
            parametro: parametroActualizado
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar el parametro',
        });
    }
}

module.exports = {
    obtenerParametros,
    crearParametro,
    actulizarParametro,
    obtenerParametroPorTipo
}