const { response } = require('express');

const Usuario = require('../models/Usuario');

const crearUsuario = async (req, resp = response) => {
    try {
        const usuario = new Usuario(req.body);
        const usuarioSave = await usuario.save();

        resp.status(201).json({
            ok:true,
            msg: 'Usuario creado con exito',
            usuarioSave
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg: "Error al crear el usuario",
        })
    }
}

module.exports = {crearUsuario}