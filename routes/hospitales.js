/* 
/api/hospitales
*/
const { check } = require('express-validator');
const {Router}=require('express');
const { getHospitales, crearHospital, editarHospital, eliminarHospital } = require('../controllers/hospitales');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');

const router=Router();


router.get('/', [validarJwt],getHospitales);


 router.post('/', [validarJwt,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
], crearHospital)


router.put('/:id', [validarJwt,check("nombre", "El nombre es obligatorio").not().isEmpty(), validarCampos], editarHospital)


router.delete('/:id',[validarJwt], eliminarHospital) 









module.exports=router


