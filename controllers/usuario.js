
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt=require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios,
        uid:req.uid
    })
}


const crearUsuario = async (req, res = response) => {
    const { email, password} = req.body;

 


    try {
        const exiteEmail=await Usuario.findOne({email});

        if(exiteEmail){
           return res.status(400).json({
                ok:false,
                msg:'El correo ya esta registrado'
            })
        }
    const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt=bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password, salt);


        //Guardar usuario
        await usuario.save();

    
        //Generar JWT
        const token=await generarJWT(usuario.id);
    

        res.json({
            ok: 'Usuario Creado',
            usuario,
            token
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }


}


const actualizarUsuario=async(req, res)=>{

    const uid=req.params.id;

        //TODO: Validar token y comprobar que sea correcto
    

    try {
        const usuarioDB=await Usuario.findById(uid);
    
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                msg:'No se encontro el usuario'
            })
        }

        
        const {password, google, email, ...campos}=req.body;
        if(usuarioDB.email !==email){
   
        }
            const existeEmail=await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un usuario con ese  email'
                })
        }


        //Actualizares

        campos.email=email;

        const usuarioActualizado=await Usuario.findByIdAndUpdate(uid, campos, {new:true});
        res.json({
            ok:true,
            usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg:'Error inesperado'
        })
        
    }

}


const eliminarUsuario=async (req, res)=>{

    //Extraer el id de los parametros

    const {id}=req.params;
    
    try{
        const usuarioDB=await Usuario.findById(id);

        if(!usuarioDB){   
           return res.status(400).json({
                ok:false,
                msg:'El usuario no se encontro',
            })

        }
        await Usuario.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg:'El usuario se elimino correctamente'
        })

      


    }catch(err){
        console.log(err)

        res.status(500).json({
            ok:false,
            msg:'Consulte con el administrador'
        })
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}







