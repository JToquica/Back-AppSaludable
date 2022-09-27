const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { AdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');

const { obtenerPais, crearPais } = require('../controllers/pais');

router.get('/', obtenerPais)

router.post('/create',
    [
        check('nombre','El nombre del pais es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    AdminRole,
    crearPais
);

module.exports = router;