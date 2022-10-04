const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');


const { getRol, crearRol, actualizarRol, eliminarRol } = require('../controllers/rol');
const { AdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');

const { validarCampos } = require('../middlewares/validar-campos');



router.get('/', getRol);

router.post(
    '/create', 
    [
        check('nombre','El nombre del rol es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    AdminRole,
    crearRol);

router.put(
    '/update/:id', 
    [
        check('nombre','El nombre del rol es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    AdminRole,
    actualizarRol);

router.delete('/delete/:id', validarJWT, AdminRole, eliminarRol)

module.exports = router;