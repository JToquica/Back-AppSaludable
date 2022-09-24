const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');

const {obtenerTipoParametro,  crearTipoParametro} = require('../controllers/tipoParametro');

router.get('/',obtenerTipoParametro);

router.post('/create',
    [
        check('nombre','El nombre del parametro es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    crearTipoParametro
);

module.exports = router;