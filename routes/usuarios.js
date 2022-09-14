
/* Ruta: /api/usuarios */


const {Router }=require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario, actualizarRole } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');


const router=Router();


router.get('/',validarJwt ,getUsuarios);
router.post('/',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseeña es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio ').not().isEmpty(),
        check('email', 'El email tiene que ser valido').isEmail(),
        validarCampos
        
    ],
 crearUsuario);

 router.put('/:id',[
                    validarJwt,
                    check('nombre','El nombre es obligatorio').not().isEmpty(),
                    check('email', 'El email tiene que ser valido').isEmail(),
                    check('role', 'El role es obligatorio').not().isEmpty(), 
                    validarCampos
                ],
        actualizarUsuario)


router.put('/:id/role', [validarJwt, check('role', 'El role es obligatorio').not().isEmpty(), validarCampos], actualizarRole);

router.delete('/:id',validarJwt, eliminarUsuario)




module.exports=router;
