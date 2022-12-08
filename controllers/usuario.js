const { response } = require('express');
const bcrypt = require('bcryptjs');

const Riesgo = require('../models/Riesgo');
const Usuario = require('../models/Usuario');
const Parametro = require('../models/Parametro');
const { generarJWT } = require('../helpers/generar-jwt');

const getUsuarioById = async (req, resp = response) => {
    try {
        const {id} = req.params;
        const usuario = await Usuario.findById(id);
        resp.status(200).json({
            ok: true,
            msg: 'Usuario',
            usuario
        });
    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'error al listar Usuario',
        });
    }
}

const crearUsuario = async (req, resp = response) => {
    try {
        const { email, password } = req.body;

        let usuario = await Usuario.findOne({ email});
        if(usuario){
            return resp.status(201).json({
                ok: false,
                msg: 'Ya existe un usuario registrado con ese email'
            })
        }
        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        return resp.status(200).json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al crear el usuario'
        })
    }
}

const loginUsuario = async (req, resp = response) => {
    try {
        const { email, password } = req.body;

        let usuario = await Usuario.findOne({ email })
            .populate(['rol', 'tipoRiesgo', 'paisResidencia', 'paisOrigen', 'antecedentesFamiliares', 
            'enfermedadesUsuario'])
            .populate({
                path: 'habitosVida.habito',
                model: 'parametro'
            });

        if (!usuario){
            return resp.status(201).json({
                ok: false,
                msg: 'Usuario o contraseña erradas'
            });
        }

        if(usuario){
            //confirmar contraseña
            const validPassword = bcrypt.compareSync(password, usuario.password);
            
            if (!validPassword) {
                return resp.status(201).json({
                    ok: false,
                    msg: 'Usuario o contraseña erradas'
                });
            }

            const token = await generarJWT(usuario.id);

            return resp.json({
                ok: true,
                usuario,
                token
            });
        }
    } catch(error) {
        return resp.status(500).json({
            ok: false,
            msg: 'Error al autenticar'
        });
    }
}

const actualizarUsuario = async (req, resp = response) => {
    try {
        const usuarioId = req.params.id;
        const data = req.body;
        let usuario = await Usuario.findById(usuarioId);

        if(!usuario) {
            return resp.status(201).json({
                ok: false,
                msg: 'El id no corresponde a un ningun usuario',
            });
        }

        antecedentesFamiliares = await Promise.all(
            data.antecedentesFamiliares.map(async (antecedente) => {
                result = await Parametro.findById(antecedente)
                return result;
            })
        );

        enfermedadesUsuario = await Promise.all(
            data.enfermedadesUsuario.map(async (enfermedad) => {
                result = await Parametro.findById(enfermedad)
                return result;
            })
        );

        valorRiesgoAntecedentesFamiliares = antecedentesFamiliares.reduce((acumulador,valor) => acumulador + valor.valorRiesgo,0);
        valorRiesgoEnfermedadesUsuario = enfermedadesUsuario.reduce((acumulador,valor) => acumulador + valor.valorRiesgo,0);
        valorRiesgoHabitos = data.habitosVida.reduce((acumulador,valor) => acumulador + valor.puntaje,0);

        let valorRiesgo = valorRiesgoAntecedentesFamiliares + valorRiesgoEnfermedadesUsuario + valorRiesgoHabitos;

        const riesgos = await Riesgo.find();

        var tipoRiesgo = "";
        riesgos.forEach((riesgo) => {
            if (valorRiesgo > riesgo.rangoMinimo && valorRiesgo <= riesgo.rangoMaximo) {
                tipoRiesgo = riesgo.id;
            }
        });

        usuario.edad = data.edad;
        usuario.sexo = data.sexo;
        usuario.fechaNacimiento = data.fechaNacimiento;
        usuario.paisResidencia = data.paisResidencia;
        usuario.paisOrigen = data.paisOrigen;
        usuario.peso = data.peso;
        usuario.altura = data.altura;
        usuario.imc = data.imc;
        usuario.antecedentesFamiliares = data.antecedentesFamiliares;
        usuario.enfermedadesUsuario = data.enfermedadesUsuario;
        usuario.habitosVida = data.habitosVida;
        usuario.riesgoUsuario = valorRiesgo;
        usuario.tipoRiesgo = tipoRiesgo;
        usuario.isCompleteData = true;

        await Usuario.findByIdAndUpdate(usuarioId, usuario, {new: true});
        
        usuario = await Usuario.findById(usuarioId).populate(['rol', 'tipoRiesgo', 'paisResidencia', 'paisOrigen', 'antecedentesFamiliares', 
        'enfermedadesUsuario'])
        .populate({
            path: 'habitosVida.habito',
            model: 'parametro'
        });

        const token = await generarJWT(usuario.id);

        return resp.status(200).json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar usuario'
        });
    }
}

const actualizarPassword = async (req, resp = response) => {
    const {password} = req.body;
    const usuarioAutenticado = req.usuario;
    try {
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuarioAutenticado.password = bcrypt.hashSync(password, salt);

        await Usuario.findByIdAndUpdate(usuarioAutenticado.id, usuarioAutenticado, { new: true });

        return resp.status(200).json({
            ok: true,
            msg: 'Contraseña actualizada de manera exitosa',
        });

    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar la contraseña',
        });
    }
}

const renewToken = async(req,res = response) => {
    const usuario = await Usuario.findById(req.usuario.id)
        .populate(['rol', 'tipoRiesgo', 'paisResidencia', 'paisOrigen', 'antecedentesFamiliares', 
        'enfermedadesUsuario'])
        .populate({
            path: 'habitosVida.habito',
            model: 'parametro'
        });

    if (!usuario) {
        return res.status(404).json({
            ok: false,
            msg: "Usuario no encontrado"
        });
    }

    const token = await generarJWT(usuario.id);

    return res.status(200).json({
        ok: true,
        usuario,
        token
    })
}

module.exports = {
    getUsuarioById,
    crearUsuario,
    loginUsuario,
    actualizarUsuario,
    actualizarPassword,
    renewToken
}