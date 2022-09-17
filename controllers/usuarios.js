
const { response, json } = require('express');
const Usuario = require('../models/usuario');
const bcrypt=require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { body } = require('express-validator');

const getUsuarios = async (req, res) => {

    const desde=Number(req.query.desde)|| 0;


   const [total, usuarios]= await Promise.all([ Usuario.countDocuments(),
    Usuario.find({}, 'nombre email role google img').skip(desde).limit(5)])

    res.json({
        ok: true,
        total,
        usuarios,
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

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }


}


const actualizarRole=async(req, res)=>{

    const uid=req.params.id;

    const role=req.body.role;

    try {
        const usuario=await Usuario.findById(uid);

        if(!usuario){
            res.status(404).json({
                ok:false,
                msg:'El usuario no existe'
            })
        }

    
        const usuarioDB=await Usuario.findByIdAndUpdate(uid, {role}, {new:true})

        res.json({
            ok:true,
            usuarioDB
    
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Consulte con el administrador'
        })
    }
}

const actualizarUsuario=async(req, res)=>{

    const uid=req.params.id;

    try {
        const usuarioDB=await Usuario.findById(uid);
    
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                msg:'No se encontro el usuario'
            })
        }

        
        const {password, google, email, ...campos}=req.body;
        if(usuarioDB.email===email){

            return res.json({
                ok:true
            })
        
   
        }
        const existeEmail=await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un usuario con ese  email'
                })
        }


        //Actualizares

        if(!usuarioDB.google){
            campos.email=email;
        }else if(usuarioDB.email!==email){
            res.status(400).json({
                ok:false,
                msg:"Usuarios google no pueden actualizar correo"
            })
        }

        const usuarioActualizado=await Usuario.findByIdAndUpdate(uid, campos, {new:true});
        res.json({
            ok:true,
            usuarioActualizado
        })
        
    } catch (error) {


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
    eliminarUsuario,
    actualizarRole
}







