const path=require('path');
const fs=require('fs')

const { actualizarImagen } = require("../helpers/actualizar-imagen");
const { subirArchivo } = require("../helpers/subir-archivos");


const fileUploads=async(req, res)=>{

    const tipo=req.params.tipo;


    //TODO:validar id que sea correcto
    const id=req.params.id;




    const tiposValidos=['usuarios', 'hospitales','medicos'];

    //Validar si es valido
    if(!tiposValidos.includes(tipo)){
        return res.json({
            ok:false,
            msg:`la colección ingresada no es correcta ${tiposValidos}`
        })
    }


    //Validar imagen
    if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
        ok:false,
        msg:'No se ha subido ninguna imagen'});
    }


 

  try{

    const [uploadPath, nombreArchivo]=await subirArchivo(req.files, undefined, tipo);


   const actualizar=await actualizarImagen(tipo, id, nombreArchivo );

   if(!actualizar){
    return res.json({
        ok:false,
        msg:`no existe ningun ${tipo} con ese id`
    })
   }

    return res.json({
        ok:true,
        msg:'Archivo subido correctamente',
        nombreArchivo,
        uploadPath
        
    })

  }catch(err){
    console.log(err)

    res.status(500).json({
        ok: 'false',
        msg:'A ocurrido un error, consulte con el administrador'
    })
  }

    if(!tiposValidos){
        return res.status(400).json({
            ok:false,
            msg:'No es un medico, hospital u medico'
        })
    }


     res.json({
        ok:true,
        msg:'fileUpload'
    })
}



const retornaImagen=(req, res)=>{
    const tipo=req.params.tipo;
    const foto=req.params.foto;

    const pathImg=path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //imagen por defecto

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg=path.join(__dirname, `../uploads/no-img.jpg`); 
        res.sendFile(pathImg);
    }

   
}

module.exports={
    fileUploads,
    retornaImagen,

}

