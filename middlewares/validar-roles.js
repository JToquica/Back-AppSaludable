const { response } = require('express');

const Rol = require('../models/Rol');

const AdminRole = async (req, res = response, next) => {

    if(req.usuario){
        const {nombre} = req.usuario;
            return res.status(201).json({
                ok: false,
                msg: `${nombre} no es administrador - no puede realizar está acción`
            });
        
    }else{
        if(!req.usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Se quiere validar el rol sin validar el token'
            });
            
        }
    }
    
    const {nombre, rol} = req.usuario;
    const userRol = await Rol.findById(rol)


    if(userRol.nombre !== 'Administrador'){
        return res.status(201).json({
            ok: false,
            msg: `${nombre} no es Administrador - no puede realizar está acción`
        });
    }

    next();
}

module.exports = {
    AdminRole
}