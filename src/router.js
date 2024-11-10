import express from 'express';
import * as service from './Service.js';
import * as pruebas from '../public/app.js';

const router = express.Router();


router.get('/', (req, res) => {
    res.render('index',{username:null, id:null,foto:null,type:null});
});

router.get('/course-grid', (req, res) => {
    res.render('course-grid');
});


router.get('/faq/:id?', (req, res) => {
    if (req.params.id===undefined){
        res.render('faq',{id:null})
    
    }else{
    let user=service.getUser(req.params.id)
    res.render('faq',{id: user.id});
    }
});

router.get('/:id', (req, res) => {
    let user=service.getUser(req.params.id)

    res.render('index', {username: user.name, id:user.id, foto:user.foto, type:user.userType});
});

router.get('/delete/:id', (req, res) => {

    service.deleteUser(req.params.id);
    res.render('index', { 
        username:null, id:null ,foto:null,type:null
    });
});

router.post('/post/new', (req, res) => {

    
    let {name,email,password,foto,ubicación,nacimiento,estudios,trabajos,userType} = req.body;
  
    if (!pruebas.getValidation(email,name)){
        return res.send(`
            <script>
                alert("Registro fallido. Usuario ya registrado.");
                window.location.href = "/";
            </script>
        `);
          
    }else{
    let id = service.addUser({name,email,password,foto,ubicación,nacimiento,estudios,trabajos,userType});
    res.redirect(`/user/${id}`);
    }
});

router.post('/post/user', (req, res) => {
    let {email,password}=req.body;
    if (!pruebas.getValidationLogin(email,password)){
        return res.send(`
            <script>
                alert("Inicio fallido. Verifica tus credenciales.");
                window.location.href = "/";
            </script>
        `);      
    
    }else{
    
    let id = service.getUserByCredenciales(email)
    res.redirect(`/user/${id}`);
    }
});

router.get('/user/:id?', (req,res)=> {
   
   
    if (!req.params.id){

        console.log("Usuario no encontrado, redirigiendo a la página de inicio...");
        res.redirect('/');

    
    }else{

        let user = service.getUser(req.params.id);
        res.render('miPerfil', {user})
    }
})

export default router;