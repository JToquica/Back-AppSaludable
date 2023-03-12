const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { AdminRole } = require('../middlewares/validar-roles');

const { obtenerRecomendacion, crearRecomendacion, actualizarRecomendacion, recomendacionesPorEnfermedad, recomendacionesPorSintoma, eliminarRecomendacion } = require('../controllers/recomendacion');


router.get('/', obtenerRecomendacion);
router.get('/sintomas', recomendacionesPorSintoma);
router.get('/usuario/:id', validarJWT, recomendacionesPorEnfermedad);

router.post(
    '/create',
    [
        check('idTipoRecomendacion','El tipo recomendacion es obligatorio').not().isEmpty(),
        check('recomendacion','La recomendacion es obligatoria').not().isEmpty().trim(),
        check('prioridad', 'La prioridad de la recomendacion es obligtatoria').not().isEmpty().isLength({max: 3}),
    ],
    validarCampos,
    validarJWT,
    AdminRole,
    crearRecomendacion);

router.put(
    '/update/:id',
    [
        check('idTipoRecomendacion','El tipo recomendacion es obligatorio').not().isEmpty(),
        check('recomendacion','La recomendacion es obligatoria').not().isEmpty().trim(),
        check('prioridad', 'La prioridad de la recomendacion es obligtatoria').not().isEmpty().isLength({max: 3}),
    ],
    validarCampos,
    validarJWT,
    AdminRole,
    actualizarRecomendacion
);

router.delete(
    '/delete/:id',
    validarJWT,
    AdminRole,
    eliminarRecomendacion
);

module.exports = router;