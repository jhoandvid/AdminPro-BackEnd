
const Medico=require('../models/medico')
const Hospital=require('../models/hospital');



const getMedicosPaginacion=async(req, res)=>{

    const desde=Number(req.query.desde) || 0;
    const [ total, medicos]=await Promise.all([await Medico.countDocuments(), 
    await Medico.find().populate('usuario', 'nombre img').populate('hospital', 'nombre img').skip(desde).limit(5)]);
    res.json({
        total,
        medicos
    })

}

const getMedicos=async(req, res)=>{
    const medicos=await Medico.find().populate("hospital" ,'nombre img');
    res.json({
        medicos
    })

}

const getMedico=async(req, res)=>{

    const id=req.params.id;

    const medico=await Medico.findById(id);

    res.json({
        medico
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
            
            res.status(500).json({
                ok:false,
                msg:'No hemos recibido la petición comuniquese con el administrador'
            })
        }
    }


const actualizarMedico=async(req, res)=>{
    
    const id=req.params.id
    const uid=req.uid;
    const datosRequest=req.body;
    req.body={uid, ...datosRequest};
    const data=req.body;

    try {
        if(req.body.hospital){
            const hospital=await Hospital.findById(data.hospital);
            if(!hospital){
                return  res.status(404).json({
                    ok:false,
                    msg:'El hospital no se encontro'
                })
            }
        }
        const medico=await Medico.findById(id);
       
        if(!medico){
           return  res.status(404).json({
                ok:false,
                msg:'El medico no se encontro'
            })
        }
    
        const medicoActualizado=await Medico.findByIdAndUpdate(id, data,{new:true}).populate('usuario', 'nombre').populate('hospital', 'nombre')
    
        
        res.json({
            ok:'put- todo bien',
            medicoActualizado
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }

    
}

const eliminarMedico=async(req, res)=>{


    try {
        const id=req.params.id;

        const medico=await Medico.findById(id);
    
        if(!medico){
            return res.status(404).json({
                ok:false,
                msg:'No se encontro un medico con ese id'
            })
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg:'Se ha eliminado correctamente'
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }


}



module.exports={
    getMedicosPaginacion,
    crearMedico,
    actualizarMedico,
    eliminarMedico, 
    getMedicos,
    getMedico
    
}