const Usuario=require('../models/usuario');
const bcryptjs=require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login=async(req, res )=>{

    try{
        const {email, password}=req.body;


        //Validamos si existe el correo 
        const usuarioDB=await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                msg:'Email/Password no son correctos - email'
        })
        }
    
        //Verificar la contraseña
        const validPassword=bcryptjs.compareSync(password, usuarioDB.password);
    
        if(!validPassword){
            return res.status(400).json({
                msg:'Email/Password no son correctos - password '
            })
        }

        //Generar Token -JWT

        const token=await generarJWT(usuarioDB.id);



        res.json({
                ok:true,
                token
            
        })


    }catch(err){
        console.log(err);
        res.status(500).json({
            msg:'Hable con el administrador'
        })  
    }    
}

module.exports={
    login
}