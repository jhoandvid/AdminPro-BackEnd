
const express=require('express');
require('dotenv').config();
const cors = require('cors')


const {dbConnection}=require('./database/config')



//Crear el servidor de express
const app=express();

//cors
app.use(cors())

//Base de datos 
dbConnection();

//rutas
app.get('/',(req,res)=>{
    res.json({
        mgs:'Respuesta correcta'
    })
})


app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' +3000)
})


