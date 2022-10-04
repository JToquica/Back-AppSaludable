const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { AdminRole } = require('../middlewares/validar-roles');

const { obtenerRecomendacion, crearRecomendacion, actulizarRecomendacion } = require('../controllers/recomendacion');
const { ChainCondition } = require('express-validator/src/context-items');


router.get('/', validarJWT, obtenerRecomendacion);


router.post(
    '/create',
    [
        check('idTipoRecomendacion','El tipo recomendacion es obligatorio').not().isEmpty(),
        //check('idParametro','El parametro es ogligatorio').not().isEmpty(),
        check('nombre','El nombre de la recomendacion es obligatorio').not().isEmpty().trim(),
        check('recomendacion','La recomendacion es obligatoria').not().isEmpty().trim(),
        check('puntaje', 'El puntaje de la recomendacion es obligtatoria').not().isEmpty().isLength({max: 3}),
    ],
    validarCampos,
    validarJWT,
    AdminRole,
    crearRecomendacion);

router.put(
    '/update/:id',
    [
        check('idTipoRecomendacion','El tipo recomendacion es obligatorio').not().isEmpty(),
        //check('idParametro','El parametro es ogligatorio').not().isEmpty(),
        check('nombre','El nombre de la recomendacion es obligatorio').not().isEmpty().trim(),
        check('recomendacion','La recomendacion es obligatoria').not().isEmpty().trim(),
        check('puntaje', 'El puntaje de la recomendacion es obligtatoria').not().isEmpty().isLength({max: 3}),
    ],
    validarCampos,
    validarJWT,
    AdminRole,
    actulizarRecomendacion
);

module.exports = router;