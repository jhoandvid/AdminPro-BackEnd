const {Router}=require('express');
const { check } = require('express-validator');
const { getMedicos, crearMedico, eliminarMedico, actualizarMedico } = require('../controllers/medicos');
const { validarHospitalPorId } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJwt } = require('../middlewares/validar-jwt');


const router=Router();


router.get('/', [validarJwt],getMedicos )


router.post ('/',[validarJwt,   check('nombre', "El nombre del medico es Obligatorio").not().isEmpty(), 
                                check('hospital', "El id no es un id valido").isMongoId(),
                                check('hospital').custom(validarHospitalPorId),
                                   
validarCampos], crearMedico)
router.put ('/:id',[validarJwt,check("nombre", "El nombre es obligatorio").not().isEmpty(), check('hospital', "El id no es un id valido").isMongoId(), validarCampos], actualizarMedico)
router.delete ('/:id', eliminarMedico)



module.exports=router
