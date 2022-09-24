const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');

const { crearRecomendacion } = require('../controllers/recomendacion');

//router.get('/',obtenerRecomendaciones);
router.post('/create',crearRecomendacion);

module.exports = router;