const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');

const { obtenerRiesgos, crearRiesgo} = require('../controllers/riesgo');

router.get('/', obtenerRiesgos);

router.post('/create',
    [
        check('nombre','El nombre del riesgo es obligatorio').not().isEmpty(),
        check('puntaje','El puntaje del riesgo es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    crearRiesgo
);

module.exports = router;