
const Hospital=require('../models/hospital')


const validarHospitalPorId=async(hospital)=>{


    const existeHospital=await Hospital.findById(hospital);
    

    if(!existeHospital){
        throw new Error(`El id: ${hospital} no existe en la base de datos del hospital`)
    }


}


module.exports={
    validarHospitalPorId,
}