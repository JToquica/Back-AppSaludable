const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');

const { crearPais } = require('../controllers/pais');

router.post('/create',
    [
        check('nombre','El nombre del pais es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    crearPais
);

module.exports = router;