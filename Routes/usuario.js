const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, getUsuarioById, loginUsuario } = require('../controllers/usuario');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/profile/:id',
    validarJWT,
    getUsuarioById
);

router.post(
    '/create',
    [
        check('nombre', 'EL nombre es obligatorio').not().isEmpty().trim(),
        check('apellidos', 'EL apellido es obligatorio').not().isEmpty().trim(),
        check('edad', 'La edad es obligatoria y debe tener al maximo 3 caracteres').isLength({ max: 3 }),
        check('sexo', 'El sexo es obligatorio').not().isEmpty(),
        check('fechaNacimiento', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
        check('paisResidencia', 'El pais de residencia es obligatorio').not().isEmpty(),
        check('paisOrigen', 'El pais de origen es obligatorio').not().isEmpty(),
        check('peso', 'El peso es olbigatorio y debe tener maximo 3 caracteres').isLength({ max: 3 }),
        check('altura', 'El peso es obligatorio y debe tener maximo 3 caracteres').isLength({ max: 3 }),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    ],
    validarCampos,
    crearUsuario
);

router.post(
    '/login',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario);

module.exports = router;