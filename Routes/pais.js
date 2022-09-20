const { Router } = require('express');
const router = Router();

const { crearPais } = require('../controllers/pais');

router.post('/create',crearPais);

module.exports = router;