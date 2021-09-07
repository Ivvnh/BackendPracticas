const { Router }= require('express');
const router = Router();

//Principal
router.get('/',(req,res)=>{
    res.send('<h1>El servidor esta corriendo</h1>');
});

//registrarse
router.post('/Registro',(req,res)=>{
    //se guarda aqui
    const {registro,nombres,apellidos,contrasena,correo}= req.body;
    //sem muestra en pantlla
    console.log(req.body);
    //condicion para verificar datos llenos
   if (registro&&nombres&&apellidos&&contrasena&&correo){
        // se guarda en la base de datos


       res.json('se recibio info');
   }
   else if (nombres&&apellidos&&contrasena&&correo){
       res.json('no hay registro');
   }
   else if (registro&&apellidos&&contrasena&&correo){
        res.json('no hay nombres');
    }
    else if (registro&&nombres&&contrasena&&correo){
        res.json('no hay apellidos');
    }
    else if (registro&&nombres&&apellidos&&correo){
        res.json('no hay contraseña');
    }
    else if (registro&&nombres&&apellidos&&contrasena){
        res.json('no hay correo');
    }
   else{
       res.json("no hay datos");
   }
});

//recuperar contraseña
router.post('/Recuperacion',(req,res)=>{
    //se guarda aqui
    const {registro,correo}= req.body;
    //se muestra en pantlla
    console.log(req.body);
    //Recorrer los usuarios
    if (registro&&correo){
        //Guardar nueva contraseña
        res.json('Se Recupero la contraseña')
    }
    else{
        res.json('Los datos no coinciden')
    }
});
module.exports = router;