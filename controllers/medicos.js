const { body } = require('express-validator');
const Medico=require('../models/medico')
const Hospital=require('../models/hospital')


const getMedicos=async(req, res)=>{
    const medicos=await Medico.find().populate('usuario', 'nombre img').populate('hospital', 'nombre img')

    res.json({
        medicos

    })

}

    const crearMedico=async(req, res)=>{

        const id=req.uid;

        const { ...body}=req.body;

        try {
            
            const medico=new Medico({
                usuario:id,
                ...body
            })

            const medicoDB=await medico.save();


            res.json({
                ok:true,
                medico:medicoDB
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok:false,
                msg:'No hemos recibido la petición comuniquese con el administrador'
            })

        }





    

    
    }


const actualizarMedico=(req, res)=>{
    res.json({
        ok:'put- todo bien'
    })
}

const eliminarMedico=(req, res)=>{
    res.json({
        ok:'put- todo bien'
    })
}
module.exports={
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
    
}