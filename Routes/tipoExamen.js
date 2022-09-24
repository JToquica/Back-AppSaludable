const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');

const { obtenerTiposExamenes, crearTipoExamen } = require('../controllers/tipoExamen');

router.get('/',obtenerTiposExamenes);

router.post('/create',
    [
        check('nombre','El nombre del tipo examen es obligatorio').not().isEmpty(),
        check('rangoBueno','El rango bueno del examen es obligatorio').not().isEmpty(),
        check('rangoRegular','El rango regular del examen es obligatorio').not().isEmpty(),
        check('rangoMalo','El rango malo del examen es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    crearTipoExamen
);

module.exports = router;