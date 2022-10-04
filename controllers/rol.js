const { response } = require('express');
const Rol = require('../models/Rol');


const getRol = async (req, resp = response) => {
    try {

        const rol = await Rol.find().populate('nombre');
        resp.status(200).json({
            ok: true,
            msg: 'Lista de roles',
            rol
        });
        
    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'error al listar roles',
        });
    }
}


const crearRol = async (req, resp) => {

    const rol = new Rol(req.body);

    try {
        const rolSave = await rol.save();
        resp.status(201).json({
            ok: true,
            msg: 'Rol creado de manera exitosa',
            rolSave
        });

    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'error al crear rol',
        });
    }
}

const actualizarRol = async (req, resp = response) => {

    const rolId = req.params.id;

    try {
        
        const rol = await Rol.findById(rolId);

        if(!rol) {
            resp.status(201).json({
                ok: false,
                msg: 'El id del rol no coincide con ningun elemento en la base de datos',
            });
        }

        const rolActualizado = await Rol.findByIdAndUpdate(rolId, req.body, { new: true });

        resp.status(200).json({
            ok: true,
            msg: 'Rol actualizado de manera exitosa',
            rol: rolActualizado
        });


    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'error al actualizar el rol',
        });
    }
}

const eliminarRol = async (req, resp = response) => {
    const rolId = req.params.id;

    try {
        const rol = await Rol.findById(rolId);

        if(!rol){
            resp.status(404).json({
                ok: false,
                msg: 'El id no corresponde a ningun rol',
            });
        }
        await Rol.findByIdAndDelete(rolId);

        resp.status(201).json({
            ok: true,
            msg: 'Rol eliminado'
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: "Error al eliminar el rol"
        });
    }
}

module.exports = {
    getRol,
    crearRol,
    actualizarRol,
    eliminarRol
};