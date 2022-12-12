const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { AdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');

const { obtenerRiesgos, crearRiesgo, actualizarRiesgo, eliminarRiesgo} = require('../controllers/riesgo');
const { route } = require('./tipoExamen');

router.get('/', obtenerRiesgos);

router.post('/create',
    [
        check('nombre','El nombre del riesgo es obligatorio').not().isEmpty(),
        check('rangoMinimo','El valor del rango minimo es obligatorio').not().isEmpty(),
        check('rangoMaximo','El valor del rango maximo es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    AdminRole,
    crearRiesgo
);

router.put(
    '/update/:id',
    [
        check('nombre','El nombre del riesgo es obligatorio').not().isEmpty(),
        check('rangoMinimo','El valor del rango minimo es obligatorio').not().isEmpty(),
        check('rangoMaximo','El valor del rango maximo es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    AdminRole,
    actualizarRiesgo
);

router.delete('/delete/:id', validarJWT, AdminRole, eliminarRiesgo);

module.exports = router;