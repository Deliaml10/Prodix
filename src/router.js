import express from 'express';
import * as service from './Service.js';
import * as pruebas from '../public/app.js';

const router = express.Router();


router.get('/', (req, res) => {
    res.render('index',{username:null});
});

router.get('/:id', (req, res) => {
    let user=service.getUser(req.params.id)

    res.render('index', {username: user.name});
});

router.post('/post/new', (req, res) => {

    // Si todos los campos requeridos están presentes, continuar con el procesamiento
    let {name,email,password,foto,ubicación,nacimiento,estudios,trabajos,userType} = req.body;
    if (!pruebas.getValidation(email,name)){
        res.redirect('/');
        
        
    }else{
    let id = service.addUser({name,email,password,foto,ubicación,nacimiento,estudios,trabajos,userType});
    res.redirect(`/user/${id}`);
    }
});

router.post('/post/user', (req, res) => {
    let {email,password}=req.body;
    if (!pruebas.getValidationLogin(email,password)){
        res.redirect('/');        
    
    }else{
    
    let id = service.getUserByCredenciales(email)
    res.redirect(`/user/${id}`);
    }
});

router.get('/user/:id', (req,res)=> {

        let user = service.getUser(req.params.id);
        res.render('miPerfil', {user})

})

export default router;