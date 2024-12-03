import express from 'express';
import * as service from './Service.js';
import * as pruebas from '../public/app.js';

const router = express.Router();

function validateUser(id) {
    return service.getUser(id);
}

router.get('/', (req, res) => {
    let posts = [service.getPost("3"), service.getPost("7"), service.getPost("2"), service.getPost("5") , service.getPost("0"), service.getPost("9")];
    let posts_e = [service.getPoste("3"), service.getPoste("7"), service.getPoste("2"), service.getPoste("5") , service.getPoste("0"), service.getPoste("9")];
    res.render('index', { username:null, id:null,foto:null,type:null,  posts , posts_e });
});

router.get('/course-grid/:id?', (req, res) => {
    let posts = service.getPosts();
    const id = req.params.id;

    if (id === undefined) {
        res.render('course-grid', {  username:null, id:null,foto:null,type:null, posts });
    } else {
        let user = validateUser(id); 
        
        if (user) {
            res.render('course-grid', { username: user.name, id:user.id, foto:user.foto, type:user.userType, posts });
        } else {
            res.render('course-grid', { username:null, id:null,foto:null,type:null, posts });
        }
    }
});

//estudiantes

router.get('/course-grid-e/:id?', (req, res) => {
    let posts = service.getPostse();
    const id = req.params.id;

    if (id === undefined) {
        res.render('course-grid-e', {  username:null, id:null,foto:null,type:null, posts, isTrue:false });
    } else {
        let user = validateUser(id); // Verificamos la existencia del usuario
        if (user) {
            res.render('course-grid-e', { username: user.name, id:user.id, foto:user.foto, type:user.userType , posts, isTrue:false });
        } else {
            res.render('course-grid-e', { username:null, id:null,foto:null,type:null, posts ,isTrue:false});
        }
    }
});

//estudiante

router.get('/course-details-e/:pid/:id?', (req, res) => {
    
    const id = req.params.id || null; 

    const pid = req.params.pid;

    let post = service.getPoste(pid);

    
    if (id!==null){
        let user = validateUser(id); // Verificamos la existencia del usuario
        res.render('course-details-e', {  username: user.name, id:user.id, foto:user.foto, type:user.userType, post });
    }else{

    res.render('course-details-e', { id, post });
    }
});



router.get('/course-details/:pid/:id?', (req, res) => {
    
    const id = req.params.id || null; 

    const pid = req.params.pid;

    let post = service.getPost(pid);
    
    if (id!==null){
        let user = validateUser(id); // Verificamos la existencia del usuario
        res.render('course-details', {  username: user.name, id:user.id, foto:user.foto, type:user.userType, post });
    }else{

    res.render('course-details', { id, post });
    }
});

router.post('/course-details/:pid/:id?', (req, res) => {
    let { cname, asunto, comment } = req.body;
    const postId = req.params.pid;
    const id = req.params.id || null;

    let post = service.getPost(postId);
   

    cname = cname.toLowerCase();
    cname = cname.charAt(0).toUpperCase() + cname.slice(1);
    asunto = asunto.charAt(0).toUpperCase() + asunto.slice(1);

    if (id!==null){
        let user = validateUser(id); // Verificamos la existencia del usuario
        service.addComment(postId, { cname:user.name, asunto, comment, foto:user.foto});
        res.render('course-details', {  username: user.name, id:user.id, foto:user.foto, type:user.userType, post });
    }else{
    service.addComment(postId, { cname, asunto, comment, foto:'/assets/img/user/3686930.png' });
    res.render('course-details', { id, post });
    }

    
});

//nuevo post estudiante

router.get('/add-course-e/:id', (req, res) => {
    let id = req.params.id || null;  
    
    res.render('add-course-e', { id });
      
});

router.post('/add-course-e/:id', (req, res) => {
    
    const id = req.params.id || null;  
    
    
    let { full_name, email, phone, location, profile_picture_url, education, work_experience, skills, languages, title } = req.body;
    
    full_name = full_name.charAt(0).toUpperCase() + full_name.slice(1);
    email = email.toLowerCase();
    let user=service.getUser(id);
    service.addPoste({ full_name, email, phone, location, profile_picture_url, education, work_experience, skills, languages, title, id });

    let posts = [service.getPost("3"), service.getPost("7"), service.getPost("2"), service.getPost("5") , service.getPost("0"), service.getPost("9")];
    let posts_e = [service.getPoste("3"), service.getPoste("7"), service.getPoste("2"), service.getPoste("5") , service.getPoste("0"), service.getPoste("9")];

    res.render('index', {username: user.name, id:user.id, foto:user.foto, type:user.userType, posts, posts_e});
});

//nuevo post empresa

router.get('/add-course/:id', (req, res) => {
    const id = req.params.id || null;  
    res.render('add-course', { id });  
});

router.post('/add-course/:id', (req, res) => {
    const id = req.params.id || null;  

    let { company_name, job_title, job_subtitle, salary, job_category, job_description, image_url, job_requirements, location, job_duration, posting_date } = req.body;
    salary = parseFloat(salary).toFixed(2);   
    company_name = company_name.charAt(0).toUpperCase() + company_name.slice(1);
    let user=service.getUser(id);
    service.addPost({ company_name, job_title, job_subtitle, salary, job_category, job_description, image_url, job_requirements, location, job_duration, posting_date, id },null);
    
    let posts = [service.getPost("3"), service.getPost("7"), service.getPost("2"), service.getPost("5") , service.getPost("0"), service.getPost("9")];
    let posts_e = [service.getPoste("3"), service.getPoste("7"), service.getPoste("2"), service.getPoste("5") , service.getPoste("0"), service.getPoste("9")];
    res.render('index', {username: user.name, id:user.id, foto:user.foto, type:user.userType, posts, posts_e});
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
    let posts = [service.getPost("3"), service.getPost("7"), service.getPost("2"), service.getPost("5") , service.getPost("0"), service.getPost("9")];
    let posts_e = [service.getPoste("3"), service.getPoste("7"), service.getPoste("2"), service.getPoste("5") , service.getPoste("0"), service.getPoste("9")];
    res.render('index', {username: user.name, id:user.id, foto:user.foto, type:user.userType, posts, posts_e});
});

router.get('/delete/:id', (req, res) => {
    service.deleteUser(req.params.id);
    let posts = [service.getPost("3"), service.getPost("7"), service.getPost("2"), service.getPost("5") , service.getPost("0"), service.getPost("9")];
    let posts_e = [service.getPoste("3"), service.getPoste("7"), service.getPoste("2"), service.getPoste("5") , service.getPoste("0"), service.getPoste("9")];
    res.render('index', { 
        username:null, id:null ,foto:null,type:null, posts, posts_e
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
    let posts = [service.getPost("3"), service.getPost("7"), service.getPost("2"), service.getPost("5") , service.getPost("0"), service.getPost("9")];
    let posts_e = [service.getPoste("3"), service.getPoste("7"), service.getPoste("2"), service.getPoste("5") , service.getPoste("0"), service.getPoste("9")];
    res.render('index', {username: user.name, id:user.id, foto:user.foto, type:user.userType, posts, posts_e});
});

router.get('/delete/:id', (req, res) => {
    let posts = [service.getPost("3"), service.getPost("7"), service.getPost("2"), service.getPost("5") , service.getPost("0"), service.getPost("9")];
    let posts_e = [service.getPoste("3"), service.getPoste("7"), service.getPoste("2"), service.getPoste("5") , service.getPoste("0"), service.getPoste("9")];
    service.deleteUser(req.params.id);
    res.render('index', { 
        username:null, id:null ,foto:null,type:null, posts, posts_e
    });
});

router.get('/history/:id?', (req, res) => {
    const id = req.params.id;
    let posts = service.getUserPosts(id);
    let hasPosts = false; 

    let user = validateUser(id); 
    if (user) {
        let hasPost = posts.some(post => post.hasOwnProperty('company_name'));
        let hasPoste = posts.some(post => post.hasOwnProperty('full_name'));

        if (hasPost && hasPoste) {
            res.render('course-grid', { username: user.name, id:user.id, foto:user.foto, type:user.userType, posts, isTrue:false }); 
            hasPosts = true;
        } else if (hasPost) {
            res.render('course-grid', { username: user.name, id:user.id, foto:user.foto, type:user.userType, posts ,isTrue:true});
            hasPosts = true;
        } else if (hasPoste) {
            res.render('course-grid-e', { username: user.name, id:user.id, foto:user.foto, type:user.userType, posts, isTrue:true }); 
            hasPosts = true;
        } 
    }
    if (!hasPosts) {
    res.redirect(`/${user ? user.id : ''}`); 
    }
});


router.post('/update-profile/:id', (req, res) => {
   
    let id=req.params.id
   let {name,email,password,foto,ubicación,nacimiento,estudios,trabajos,userType} = req.body;
    let user= service.editUser(id,{name,email,password,foto,ubicación,nacimiento,estudios,trabajos,userType});
 

    res.render('miPerfil', { user });

});


router.post('/update-course-e/:id', (req, res) => {
   
    let posts = [service.getPost("3"), service.getPost("7"), service.getPost("2"), service.getPost("5") , service.getPost("0"), service.getPost("9")];
    let posts_e = [service.getPoste("3"), service.getPoste("7"), service.getPoste("2"), service.getPoste("5") , service.getPoste("0"), service.getPoste("9")];
    let { pid,full_name, email, phone, location, profile_picture_url, education, work_experience, skills, languages, title } = req.body;
    let id=req.params.id
    full_name = full_name.charAt(0).toUpperCase() + full_name.slice(1);
    email = email.toLowerCase();
    service.editPoste(pid,{ full_name, email, phone, location, profile_picture_url, education, work_experience, skills, languages, title, id });
    let user = service.getUser(id);
    res.render('index', {username: user.name, id:user.id, foto:user.foto, type:user.userType, posts, posts_e});
 
 });

 
router.post('/update-course/:id', (req, res) => {
    let posts = [service.getPost("3"), service.getPost("7"), service.getPost("2"), service.getPost("5") , service.getPost("0"), service.getPost("9")];
    let posts_e = [service.getPoste("3"), service.getPoste("7"), service.getPoste("2"), service.getPoste("5") , service.getPoste("0"), service.getPoste("9")];

    let id=req.params.id
    let { pid,company_name, job_title, job_subtitle, salary, job_category, job_description, image_url, job_requirements, location, job_duration, posting_date } = req.body;
    salary = parseFloat(salary).toFixed(2);   
    company_name = company_name.charAt(0).toUpperCase() + company_name.slice(1);
    service.editPost(pid,{ company_name, job_title, job_subtitle, salary, job_category, job_description, image_url, job_requirements, location, job_duration, posting_date, id });

    let user = service.getUser(id);
    res.render('index', {username: user.name, id:user.id, foto:user.foto, type:user.userType, posts, posts_e}); 
 
 });
 
 

export default router;


