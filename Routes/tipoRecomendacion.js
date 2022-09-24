const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');

const {obtenerTipoRecomendacion, crearTipoRecomendacion} = require('../controllers/tipoRecomendacion');

router.get('/',obtenerTipoRecomendacion);

router.post('/create',
    [
        check('nombre','El nombre del tipo recomendacion es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    crearTipoRecomendacion
);

module.exports = router;