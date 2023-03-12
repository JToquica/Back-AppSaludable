const { response } = require('express');

const Parametro = require('../models/Parametro');
const Recomendacion = require('../models/Recomendacion');
const Usuario = require('../models/Usuario');
const Riesgo = require('../models/Riesgo');

const obtenerParametroPorTipo = async (req, resp = response) => {
    try {
        const idTipoParametro = req.params.id;
        const records = await Parametro.find().populate({path:'idTipoParametro', match: {_id: idTipoParametro}});
        const parametros = records.filter(parametro => parametro.idTipoParametro)

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
        await parametro.save();

        const parametros = await Parametro.find().populate('idTipoParametro');

        if ( req.body.idTipoParametro != "632e694a7bab36dbf8f79e4f") {
            const enfermedades = parametros.filter((parametro) => parametro.idTipoParametro.nombre == "Enfermedad");
            const habitos = parametros.filter((parametro) => parametro.idTipoParametro.nombre == "Habito");

            sumatoriaEnfermedades = enfermedades.reduce((acumulador,valor) => acumulador + valor.valorRiesgo,0);

            habitosPositivo = habitos.filter((habito) => habito.valorRiesgo > 0);
            habitosNegativo = habitos.filter((habito) => habito.valorRiesgo < 0);

            habitosSuman = habitosPositivo.reduce((acumulador,valor) => acumulador + valor.valorRiesgo,0);
            habitosRestan = habitosNegativo.reduce((acumulador,valor) => acumulador + valor.valorRiesgo,0);

            let max = (sumatoriaEnfermedades * 2) + (habitosSuman * 3) + 1;
            let min = (habitosRestan * 3) - 1;

            divisor = max / 3;
            divisorPor2 = divisor * 2; 

            await Riesgo.findByIdAndUpdate("632e7731fcd6235d4451dd19", {rangoMinimo: min, rangoMaximo: divisor});
            await Riesgo.findByIdAndUpdate("633cc0c1296b83b04d237505", {rangoMinimo: divisor, rangoMaximo: divisorPor2});
            await Riesgo.findByIdAndUpdate("635dc5a6c0753da44da9c3b7", {rangoMinimo: divisorPor2, rangoMaximo: max});
        }

        resp.status(200).json({
            ok: true,
            msg: 'Parametro creado de manera exitosa',
            parametros
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

        await Parametro.findByIdAndUpdate(parametroId, req.body, {new: true});
        const parametros = await Parametro.find().populate('idTipoParametro');

        return resp.status(200).json({
            ok: true,
            msg: 'Parametro actualizado',
            parametros
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar el parametro',
        });
    }
}

const eliminarParametro = async (req, resp = response) => {
    try {
        const parametroId = req.params.id;
        console.log("id: ",parametroId);
        const parametro = await Parametro.findById(parametroId);
        console.log("parametro: ",parametro);

        if(!parametro){
            return resp.status(200).json({
                ok: false,
                msg: 'El id no corresponde a un ningun parametro',
            });
        }

        if ( parametro.idTipoParametro != "632e694a7bab36dbf8f79e4f") {
            let usuariosPorAntecedentes = await Usuario.find({antecedentesFamiliares: parametroId});
            console.log("usuarios por antecedentes: ", usuariosPorAntecedentes);

            for (const recomendacion of usuariosPorAntecedentes) {
                recomendacion.antecedentesFamiliares.pull(parametroId);
                await recomendacion.save();
            }

            let usuariosPorEnfermedades = await Usuario.find({enfermedadesUsuario: parametroId});
            console.log("usuarios por enfermedades: ", usuariosPorEnfermedades);

            for (const recomendacion of usuariosPorEnfermedades) {
                recomendacion.enfermedadesUsuario.pull(parametroId);
                await recomendacion.save();
            }

            let usuariosPorHabitosVida = await Usuario.find({"habitosVida.habito": parametroId});
            console.log("usuarios por habitos: ", usuariosPorHabitosVida);

            for (const recomendacion of usuariosPorHabitosVida) {
                recomendacion.habitosVida.habito.pull(parametroId);
                await recomendacion.save();
            };
        }

        let recomendaciones = await Recomendacion.find({idParametro: parametroId});
        console.log("recomendaciones: ", recomendaciones);

        for (const recomendacion of recomendaciones) {
            await recomendacion.remove();
        }

        await Parametro.findByIdAndDelete(parametroId);
        const parametros = await Parametro.find().populate('idTipoParametro');

        if ( parametro.idTipoParametro != "632e694a7bab36dbf8f79e4f") {
            const enfermedades = parametros.filter((parametro) => parametro.idTipoParametro.nombre == "Enfermedad");
            const habitos = parametros.filter((parametro) => parametro.idTipoParametro.nombre == "Habito");

            sumatoriaEnfermedades = enfermedades.reduce((acumulador,valor) => acumulador + valor.valorRiesgo,0);

            habitosPositivo = habitos.filter((habito) => habito.valorRiesgo > 0);
            habitosNegativo = habitos.filter((habito) => habito.valorRiesgo < 0);

            habitosSuman = habitosPositivo.reduce((acumulador,valor) => acumulador + valor.valorRiesgo,0);
            habitosRestan = habitosNegativo.reduce((acumulador,valor) => acumulador + valor.valorRiesgo,0);

            let max = (sumatoriaEnfermedades * 2) + (habitosSuman * 3) + 1;
            let min = (habitosRestan * 3) - 1;

            divisor = max / 3;
            divisorPor2 = divisor * 2; 

            await Riesgo.findByIdAndUpdate("632e7731fcd6235d4451dd19", {rangoMinimo: min, rangoMaximo: divisor});
            await Riesgo.findByIdAndUpdate("633cc0c1296b83b04d237505", {rangoMinimo: divisor, rangoMaximo: divisorPor2});
            await Riesgo.findByIdAndUpdate("635dc5a6c0753da44da9c3b7", {rangoMinimo: divisorPor2, rangoMaximo: max});
        }

        return resp.status(200).json({
            ok: true,
            msg: 'Parametro eliminado',
            parametros
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al eliminar el parametro',
        });
    }
}

module.exports = {
    obtenerParametros,
    crearParametro,
    actulizarParametro,
    eliminarParametro,
    obtenerParametroPorTipo
}