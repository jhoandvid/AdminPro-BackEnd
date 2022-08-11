const { subirArchivo } = require("../helpers/subir-archivos");

const fileUploads=async(req, res)=>{

    const tipo=req.params.tipo;
    const id=req.params.id;

    console.log(tipo);


    const tiposValidos=['usuarios', 'hospitales','medicos'];

    //Validar si es valido
    if(!tiposValidos.includes(tipo)){
        return res.json({
            ok:false,
            msg:`la colección ingresada no es correcta ${tiposValidos}`
        })
    }


    //buscar por id
    


    //Validar imagen
    if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
        ok:false,
        msg:'No se ha subido ninguna imagen'});
    }

  //subir archivo

  try{

    const nombre=await subirArchivo(req.files, undefined, tipo);

    return res.json({
        ok:true,
        msg:'Archivo subido correctamente',
        nombre
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



module.exports={
    fileUploads
}

