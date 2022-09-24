const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');

const { obtenerParametros, crearParametro} = require('../controllers/parametro');

router.get('/', obtenerParametros);

router.post('/create',
    [
        //check('idTipoParametro','El tipo parametro es obligatorio').not().isEmpty(),
        check('nombre','El nombre del parametro es obligatorio').not().isEmpty(),
        check('valorRiesgo','El valor del riesgo es oligatorio').not().isEmpty(),
    ],
    validarCampos,
    crearParametro
);

module.exports = router;