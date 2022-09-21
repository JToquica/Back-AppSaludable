const { Router } = require('express');
const router = Router();

const { crearUsuario } = require('../controllers/usuario');

router.post('/create',crearUsuario);

module.exports = router;