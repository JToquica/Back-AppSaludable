const { Router } = require('express');
const router = Router();

const { crearResultado } = require('../controllers/resultadoExamen');

router.post('/create', crearResultado);

module.exports = router;