const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');

const { obtenerTipoParametro, crearTipoParametro, actulizarTipoParametro, eliminarTipoParametro } = require('../controllers/tipoParametro');
const { validarJWT } = require('../middlewares/validar-jwt');
const { AdminRole } = require('../middlewares/validar-roles');
const { eliminarTipoExamen } = require('../controllers/tipoExamen');

router.get('/', obtenerTipoParametro);

router.post('/create',
    [
        check('nombre', 'El nombre del parametro es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    AdminRole,
    crearTipoParametro
);

router.put('/update/:id',
    [
        check('nombre', 'El nombre del parametro es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    AdminRole,
    actulizarTipoParametro
);

router.delete('/delete/:id', validarJWT, AdminRole, eliminarTipoParametro);

module.exports = router;