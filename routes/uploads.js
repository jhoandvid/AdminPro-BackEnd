const Router=require('express');
const { fileUploads, retornaImagen } = require('../controllers/uploads');
const { validarJwt } = require('../middlewares/validar-jwt');
const expressFileUpload = require('express-fileupload');


const router=Router();

//fileUpload
router.use(expressFileUpload())
 

router.put('/:tipo/:id', validarJwt, fileUploads)

router.get('/:tipo/:foto', validarJwt, retornaImagen)


module.exports=router