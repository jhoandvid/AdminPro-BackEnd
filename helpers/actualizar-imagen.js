const fs=require('fs');

const Usuario=require('../models/usuario');
const Hospital=require('../models/hospital');
const Medico = require('../models/medico');



const actualizarImagen=async(tipo, id, nombreArchivo)=>{

    let pathViejo;

    const borrarImagen=(path)=>{
        if(fs.existsSync(path)){
            //Borrar la imagen anterior
            fs.unlinkSync(path);
        }
    }
    

    switch (tipo) {

        case 'usuarios':

            const usuario = await Usuario.findById(id);

            if (!usuario) {
                return false;
            }

             pathViejo=`./uploads/usuarios/${usuario.img}`
             borrarImagen(pathViejo);
          
           

            usuario.img=nombreArchivo;
            
            await usuario.save();

            return true;

            break;


        case 'hospitales':
            
            const hospital = await Hospital.findById(id);

            if (!hospital) {
                return false;
            }

            pathViejo=`./uploads/hospitales/${hospital.img}`

            borrarImagen(pathViejo);

            hospital.img=nombreArchivo;
            
            await hospital.save();
    
            return true;

            break;

        case 'medicos':

            const medico=await Medico.findById(id);

            if(!medico){
                return false;
            }
            
            pathViejo=`./uploads/medicos/${medico.img}`

            borrarImagen(pathViejo);

            medico.img=nombreArchivo;
            medico.save();

            return true;



    }

    

}






module.exports={
    actualizarImagen
}
