
const express=require('express');
require('dotenv').config();
const cors = require('cors')


const {dbConnection}=require('./database/config');
const usuarios = require('./routes/usuarios');
const auth = require('./routes/auth');



//Crear el servidor de express
const app=express();

//cors
app.use(cors());

//Base de datos 
dbConnection();

//Lectura y parseo del body
app.use(express.json());


//rutas
app.use('/api/usuarios', usuarios);
app.use('/api/login', auth);


app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' +3000)
})


