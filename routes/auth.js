/* Ruta: /api/login */


const {Router}=require('express');
const { check } = require('express-validator');
const {login, googleSignIn, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');

const router=Router();

router.post('/',[
                check('email', 'El email es obligatorio').not().isEmpty(),
                check('email', 'No es un email valido').isEmail(),
                check('password', 'El password es obligatorio').not().isEmpty(),
                validarCampos
],  login)


router.post('/google', [check('token', 'El token de google es obligatorio').not().isEmpty(), validarCampos],  googleSignIn)


    router.get('/renew', validarJwt, renewToken);


module.exports=router
