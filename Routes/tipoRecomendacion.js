const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { AdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');

const { obtenerTipoRecomendacion, crearTipoRecomendacion, actulizarTipoRecomendacion } = require('../controllers/tipoRecomendacion');

router.get('/', validarJWT, obtenerTipoRecomendacion);

router.post('/create',
    [
        check('nombre', 'El nombre del tipo recomendacion es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    AdminRole,
    crearTipoRecomendacion
);

router.put(
    '/update/:id',
    [
        check('nombre', 'El nombre del tipo recomendacion es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    AdminRole,
    actulizarTipoRecomendacion

);

module.exports = router;