const { Router } = require('express');
const router = Router();

const { crearRecomendacion } = require('../controllers/recomendacion');

router.post('/create',crearRecomendacion);

module.exports = router;