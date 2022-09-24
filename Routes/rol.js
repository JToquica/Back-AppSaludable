const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');


const { getRol, crearRol, actualizarRol } = require('../controllers/rol');

const { validarCampos } = require('../middlewares/validar-campos');



router.get('/', getRol);

router.post(
    '/create', 
    [
        check('nombre','El nombre del rol es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearRol);

router.put(
    '/update/:id', 
    [
        check('nombre','El nombre del rol es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarRol);

module.exports = router;