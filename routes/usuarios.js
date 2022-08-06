
/* Ruta: /api/usuarios */


const {Router }=require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuario');
const { validarCampos } = require('../middlewares/validar-campos');


const router=Router();


router.get('/', getUsuarios);
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
                    
                    check('nombre','El nombre es obligatorio').not().isEmpty(),
                    check('email', 'El email tiene que ser valido').isEmail(),
                    check('role', 'El role es obligatorio'), 
                    validarCampos
                ],
        actualizarUsuario)

router.delete('/:id',  eliminarUsuario)




module.exports=router;