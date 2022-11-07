const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { AdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');

const { obtenerParametros, crearParametro, actulizarParametro, obtenerParametroPorTipo } = require('../controllers/parametro');

router.get('/', obtenerParametros);
router.get('/tipo/:id', obtenerParametroPorTipo);

router.post('/create',
    [
        check('idTipoParametro', 'El tipo parametro es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre del parametro es obligatorio').not().isEmpty(),
        check('valorRiesgo', 'El valor del riesgo es oligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    AdminRole,
    crearParametro
);

router.put('/update/:id',
    [
        check('idTipoParametro', 'El tipo parametro es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre del parametro es obligatorio').not().isEmpty(),
        check('valorRiesgo', 'El valor del riesgo es oligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    AdminRole,
    actulizarParametro
);

module.exports = router;