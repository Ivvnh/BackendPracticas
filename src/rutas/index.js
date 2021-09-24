const { Router }= require('express');
const router = Router();

//Conexion a la base de datos
const mysql= require('mysql');
const db_crede = require('./db_cred');
var conn =mysql.createPool(db_crede);




//Principal
router.get('/',(req,res)=>{
    res.send('<h1>El servidor esta corriendo</h1>');
});

//registrarse
router.post('/Registro',(req,res)=>{
    //se guarda aqui
    const {registro,nombres,apellidos,contrasena,correo,cod_carrera}= req.body;
    //sem muestra en pantlla
    console.log(req.body);
    //condicion para verificar datos llenos
   if (registro&&nombres&&apellidos&&contrasena&&correo&&cod_carrera){
        // se guarda en la base de datos
        let consulta = 'INSERT  INTO estudiante (registro_academico, nombre, apellido, password, correo, cod_carrera) VALUES(?, ?, ?, ?, ?, ?)'
        conn.query(consulta,[parseInt(registro), nombres, apellidos, contrasena, correo, parseInt(cod_carrera)],function(erro,result){
            if(erro)
            throw erro;
            res.status(200).json({
                'Mensaje':'se Guardo el usuario'
            })
        })
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
    let consulta = 'select * from estudiante where registro_academico=? and password=?'
    conn.query(consulta,[parseInt(registro),contrasena], (err, response)=>{
    if(err) throw err;
    res.send(response);
    })
});

//recuperar contraseña
router.put('/Recuperacion',(req,res)=>{
    //se guarda aqui
    const {registro,correo}= req.body;
    //se muestra en pantlla
    console.log(req.body);
    let consulta = 'select * from estudiante where password=? and correo=?'
    conn.query(consulta,[parseInt(registro),correo], (err, response)=>{
    if(err) throw err;
    res.send(response);
    })
});

//Hacer publicaciones
router.post('/Nuevapub',(req,res)=>{
    //se guarda aqui
    const {id,fecha,mensaje,usuario,profesor,curso}= req.body;
    //sem muestra en pantlla
    console.log(req.body);
        let consulta = 'INSERT  INTO publicacion (id_publicacion,fecha_hora,descripcion, registro_academico,registro_catedratico, cod_curso) VALUES(?, ?, ?, ?, ?, ?)'
        conn.query(consulta,[id,fecha,mensaje,usuario,profesor,curso],function(erro,result){
            if(erro)
            throw erro;
            res.json({
                'Mensaje':'se realizo la  publicacion'
            })
        })
});

//mostrar las publicaciones
router.get('/Publicaciones',(req,res)=>{
    //conecta la db para traer la informacion de las publicaciones
    let consulta = 'select * from publicacion'
    conn.query(consulta, (err, response)=>{
    if(err) throw err;
    res.send(response);
    })
});

//filtros de curso en publicaciones
router.get('/Publicaciones/:curso',(req,res)=>{
    var curso  = req.params.curso
    //conecta la db para traer la informacion de las publicaciones
    let consulta = 'select * from publicacion where cod_curso=?'
    conn.query(consulta,[curso], (err, response)=>{
    if(err) throw err;
    res.send(response);
    })

});

//filtros de profesor en publicaciones
router.get('/Publicaciones/:profesor',(req,res)=>{
    var profesor=req.params.profesor
    //conecta la db para traer la informacion de las publicaciones
    let consulta = 'select * from publicacion where registro_catedratico=?'
    conn.query(consulta,[profesor], (err, response)=>{
    if(err) throw err;
    res.send(response);
    })

});

// ver perfil de otros usuarios
router.get('/verperfil/:registro',(req,res)=>{
    //se guarda aqui
    var registro= req.params.registro
    //se muestra en pantlla
    console.log(registro);
    let consulta = 'select * from estudiante where registro_academico=?'
    conn.query(consulta,[registro], (err, response)=>{
    if(err) throw err;
    res.send(response);
    })

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
    let consulta = 'UPDATE estudiante SET nombre=?,apellido=?,password=?,correo=? WHERE registro_academico=?' 
    conn.query(consulta,[nombres,apellidos,contrasena,correo,registro], (err, request)=>{
        if(err)
        throw err;
        res.json({
            'Mensaje':'se Actualizo el usuario'
        })
    })

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