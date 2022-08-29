const Usuario=require('../models/usuario');
const bcryptjs=require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { response } = require('express');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn=async (req, res=response)=>{

    try {
        const {email, name, picture }=await googleVerify(req.body.token);

        const usuarioDB=await Usuario.findOne({email});
        let usuario;

        if(!usuarioDB){
            usuario= new Usuario({
                nombre:name,
                email,
                password:'@@@',
                img:picture,
                google:true
            })
        }else{
            usuario=usuarioDB;
            usuario.google=true;
        }
        
        //Guardar usuario
        await usuario.save();

        //Generar el token -JWT
        const token=await generarJWT(usuario.id);

        res.json({
            ok:true,
            email, 
            name, 
            picture,
            token
        })
    } catch (error) {

        console.log(error);
        res.status(400).json({
            ok:false,
            msg: 'Token de google no es correcto'
        })
    }

}


const renewToken=async(req, res=response)=>{
    
    const uid=req.uid;
    const token=await generarJWT(uid);

    const usuario=await Usuario.findById(uid)
    
    res.json({
        ok:true,
        token,
        usuario
    })

}

module.exports={
    login,
    googleSignIn,
    renewToken
}