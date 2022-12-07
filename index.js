
const express=require('express');
require('dotenv').config();
const cors = require('cors')

const path=require('path')


const {dbConnection}=require('./database/config');
const usuarios = require('./routes/usuarios');
const hospitales = require('./routes/hospitales');
const medicos = require('./routes/medicos');
const auth = require('./routes/auth');
const busqueda = require('./routes/busquedas');
const uploads = require('./routes/uploads');



//Crear el servidor de express
const app=express();

//Capeta public
//app.use(express.static('public'))

//cors
app.use(cors());

//Base de datos 
dbConnection();

//Lectura y parseo del body
app.use(express.json());



//rutas
app.use('/api/login', auth);
app.use('/api/hospitales', hospitales);
app.use('/api/medicos', medicos);
app.use('/api/todo', busqueda);
app.use('/api/upload',uploads );
app.use('/api/usuarios', usuarios);


app.get('*', (req, res)=>{
    res.sendFile( path.resolve(__dirname, 'public/index.html') )
})


app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' + 3000)
})


