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


router.put('/:id', [], editarHospital)


router.delete('/:id', eliminarHospital) 









module.exports=router


