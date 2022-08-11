
const Hospital = require('../models/hospital')


const getHospitales = async (req, res) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre img');
    res.json({
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


const editarHospital = (req, res) => {
    res.json({
        ok: 'Todo bien'
    })
}


const eliminarHospital = (req, res) => {
    res.json({
        ok: 'Todo bien'
    })
}




module.exports = {

    getHospitales,
    crearHospital,
    editarHospital,
    eliminarHospital
}




