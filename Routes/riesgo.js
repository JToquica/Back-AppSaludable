const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { AdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');

const { obtenerRiesgos, crearRiesgo} = require('../controllers/riesgo');

router.get('/', obtenerRiesgos);

router.post('/create',
    [
        check('nombre','El nombre del riesgo es obligatorio').not().isEmpty(),
        check('puntaje','El puntaje del riesgo es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    AdminRole,
    crearRiesgo
);

module.exports = router;