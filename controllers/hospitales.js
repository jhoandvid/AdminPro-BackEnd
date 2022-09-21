
const { findById } = require('../models/hospital');
const Hospital = require('../models/hospital');
const usuario = require('../models/usuario');


const getHospitales = async (req, res) => {

    const desde=Number(req.query.desde)||0;

    const [total, hospitales]=await Promise.all([Hospital.countDocuments(), 
        await Hospital.find().populate('usuario', 'nombre img').skip(desde).limit(5) ])

    res.json({
        ok:true,
        total,
        hospitales
    })

}


const crearHospital = async (req, res) => {


    const id = req.uid;
    const hospital = new Hospital({
        usuario: id,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();
        res.json({
            hospital: hospitalDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const editarHospital = async(req, res) => {

  try {
    const {nombre}=req.body;
    const uid=req.uid;
    const id=req.params.id;

    const hospital=await Hospital.findById(id);

    if(!hospital){
        return res.status(404).josn({
            ok:false,
            msg:'El hospital no existe'
        })
    }


    data={
        nombre,
        usuario:uid
    }

    const actHospital=await Hospital.findByIdAndUpdate(id, {...data}, {new:true});

    res.json({
        actHospital
    })
    

  } catch (error) {
    res.status(500).json({
        ok:false,
        msg:'A ocurrido un error hable con el administrador'
    })
  }

}


const eliminarHospital = async(req, res) => {

    const id=req.params.id;


    try {
    const hospital=await Hospital.findById(id);

    if(!hospital){
       return res.status(404).json({
            ok:false,
            msg:'El hospital a eliminar no existe'
        })
    }



    await Hospital.findByIdAndRemove(id);


    res.json({
        ok:'true',
        msg:'Hospital eliminado'
        
    })



    } catch (error) {  
        res.status(500).json({
            ok: 'A ocurrido un error hable con el administrador'
        })
    }




}




module.exports = {

    getHospitales,
    crearHospital,
    editarHospital,
    eliminarHospital
}




