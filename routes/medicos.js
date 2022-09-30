const {Router}=require('express');
const { check } = require('express-validator');
const { crearMedico, eliminarMedico, actualizarMedico, getMedicosPaginacion, getMedicos, getMedico } = require('../controllers/medicos');
const { validarHospitalPorId } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJwt } = require('../middlewares/validar-jwt');


const router=Router();


router.get('/paginacion', [validarJwt], getMedicosPaginacion )
router.get('/:id', [validarJwt], getMedico )
router.get('/', [validarJwt], getMedicos )


router.post ('/',[validarJwt,   check('nombre', "El nombre del medico es Obligatorio").not().isEmpty(), 
                                check('hospital', "El id no es un id valido").isMongoId(),
                                check('hospital').custom(validarHospitalPorId),
                                   
validarCampos], crearMedico)
router.put ('/:id',[validarJwt,check("nombre", "El nombre es obligatorio").not().isEmpty(), check('hospital', "El id no es un id valido").isMongoId(), validarCampos], actualizarMedico)
router.delete ('/:id',[validarJwt], eliminarMedico)



module.exports=router
