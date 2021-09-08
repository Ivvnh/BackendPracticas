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


       res.json({'Mensaje':'se recibio info'});
   }
   else if (nombres&&apellidos&&contrasena&&correo){
       res.json({'Mensaje':'no hay registro'});
   }
   else if (registro&&apellidos&&contrasena&&correo){
        res.json({'Mensaje':'no hay nombres'});
    }
    else if (registro&&nombres&&contrasena&&correo){
        res.json({'Mensaje':'no hay apellidos'});
    }
    else if (registro&&nombres&&apellidos&&correo){
        res.json({'Mensaje':'no hay contraseña'});
    }
    else if (registro&&nombres&&apellidos&&contrasena){
        res.json({'Mensaje':'no hay correo'});
    }
   else{
       res.json({'Mensaje':"no hay datos"});
   }
});

//login
router.post('/login',(req,res)=>{
     //se guarda aqui
     const {registro,contrasena}= req.body;
     //sem muestra en pantlla
     console.log(req.body);
    // se busca en la base de datos
    if(registro=="registro de la db"&&contrasena=="contraseña de la db"){
        res.json({'Mensaje':"Credenciales correctas"});
    }
    else{
        res.json({'Mensaje':"Credenciales incorrectas"});
    }
});

//recuperar contraseña
router.put('/Recuperacion',(req,res)=>{
    //se guarda aqui
    const {registro,correo}= req.body;
    //se muestra en pantlla
    console.log(req.body);
    //Recorrer los usuarios
    //Se busca registro y correo de  cada usuario en la db
    //Si coinciden los datos en el mismo usuario
    if (registro&&correo){
        //Guardar nueva contraseña
        res.json({'Mensaje':'Se Recupero la contraseña'});
    }
    else{
        //No se guarda
        res.json({'Mensaje':'El registro y correo no coinciden, vuelva a ingresar los datos'});
    }
});

//Hacer publicaciones
router.post('/Nuevapub',(req,res)=>{
    //se guarda aqui
    const {usuario,curso,profesor,mensaje,fecha}= req.body;
    //sem muestra en pantlla
    console.log(req.body);
    if(usuario&&curso&&profesor&&mensaje&&fecha){
        //Se guarda en la db
        res.json({'Mensaje':'Se Realizo la publicacion'});
    }
    else {
        //no se guarda la publicacion
        res.json({'Mensaje':'Faltan datos  para  la publicacion'})
    }  
});

//mostrar las publicaciones
router.get('/Publicaciones',(req,res)=>{
    //conecta la db para traer la informacion de las publicaciones
    res.json('publicaciones')
});

//filtros de curso en publicaciones
router.get('/Publicaciones/:curso',(req,res)=>{
    var curso  = req.params.curso
    //conecta la db para traer la informacion de las publicaciones
    //recorrer todas  las publicaciones
    if(curso=='curso de la publicacion'){
        res.json('se muestra la publicacion')
    }
    else{
        //pasa de largo
    }

});
//filtros de profesor en publicaciones
router.get('/Publicaciones/:profesor',(req,res)=>{
    var profesor=req.params.profesor
    //conecta la db para traer la informacion de las publicaciones
    //recorrer todas  las publicaciones
    if(profesor=='profesor de la publicacion '){
        res.json('se muestra la publicacion')
    }
    else{
        //pasa de largo
    }

});
// ver perfil de otros usuarios
router.get('/verperfil/:registro',(req,res)=>{
    //se guarda aqui
    var registro= req.params.registro
    //se muestra en pantlla
    console.log(registro);
    //Recorrer los usuarios
    //Se busca registro  de  cada usuario en la db
    //Si coinciden los datos en el mismo usuario
    if (registro='registro de la db'){
        //se  muestran los datos
        res.json({'Mensaje':'datos del usuario'});
    }
    else{
        //No se muestra
        res.json({'Mensaje':'El usuario no existe'});
    }
});
//Cursos aprobados de otras personas
router.get('/cursos/:registro',(req,res)=>{
    //se guarda aqui
    var registro= req.params.registro
    //se muestra en pantlla
    console.log(registro);
    //Recorrer los usuarios
    //Se busca registro  de  cada usuario en la db
    //Si coinciden los datos en el mismo usuario
    if (registro='registro de la db'){
        //se  muestran los datos
        res.json({'Mensaje':'cursos aprobados del  usuario'});
    }
    else{
        //No se muestra
        res.json({'Mensaje':'El usuario no existe'});
    }
});


//Ver mi propio perfil
router.put('/miperfil/:registro',(req,res)=>{
    //se guarda aqui el registro
    var registro= req.params.registro
    // se guardan los nuevos datos
    const {nombres,apellidos,contrasena,correo}= req.body;
    //se muestra en pantlla
    console.log(registro);
    //Recorrer los usuarios
    //Se busca registro  de  cada usuario en la db
    //Si coinciden los datos en el mismo usuario
    if (registro='registro de la db'){
        //se cambian los datos
        res.json({'Mensaje':'Se actualizaron los datos'});
    }
    else{
        //No se muestra
        res.json({'Mensaje':'El usuario no existe'});
    }
});

//ver mis propios cursos
router.get('/miscursos/:registro',(req,res)=>{
    //se guarda aqui
    var registro= req.params.registro
    //se muestra en pantlla
    console.log(registro);
    //Recorrer los usuarios
    //Se busca registro  de  cada usuario en la db
    //Si coinciden los datos en el mismo usuario
    if (registro='registro de la db'){
        //se  muestran los datos
        res.json({'Mensaje':'mis cursos aprobados'});
    }
    else{
        //No se muestra
        res.json({'Mensaje':'El usuario no existe'});
    }
});

//Poner un curso aprobado
router.post('/agregarcurso',(req,res)=>{
    //se guarda aqui
    const {codigo,nombre,creditos,nota,fecha}= req.body;
    //sem muestra en pantlla
    console.log(req.body);
    if(codigo&&nombre&&creditos&&nota&&fecha){
        //Se guarda en la db
        res.json({'Mensaje':'Se agrego el curso'});
    }
    else {
        //no se guarda la publicacion
        res.json({'Mensaje':'Faltan datos  para  la agregar el curso'})
    }  
});


//Faltan los comentarios


module.exports = router;