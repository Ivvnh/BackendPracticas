const express = require('express');
const app =  express();
const morgan =require('morgan');
const mysql = require('mysql');
const cors = require('cors')
app.use(cors());

//configuraciones
app.set('port',process.env.PORT ||3000);
app.set('json spaces',2);
//middlewres
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Rutas
app.use(require('./rutas/index'))







// Inicio del servidor
app.listen(app.get('port'),()=>{
    console.log("Si funciona");
});