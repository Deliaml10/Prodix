export const users= new Map();
let nextId = 0;

export function addUser(user){
    let id= nextId++;
    user.id=id.toString();
    user.posts = []; // Agregar un array vacío para almacenar los posts del usuario
    user.subscriptions= []
    users.set(user.id,user);
    return user.id;
}

export function getUsers(){
    let values=[...users.values()];
    return values;
}

export function getUser(id){
    return users.get(id);
}

export function deleteUser(id){
    return users.delete(id);

}

export function getUserByCredenciales(email) {
    for (let [id, user] of users) {  
        if (user.email === email) {   
            return id;                
        }
    }
    return null;  
}

//POSTS
const posts = new Map();
let postId = 0;
const posts_e = new Map();
let postId_e = 0;

export function addPost(post) {
    let pid = postId++;
    post.comments = [];
    post.pid = pid.toString();
    posts.set(post.pid, post);
    let user = getUser(post.id);
    if (user) {
        user.posts.push(post); 
    }
    return pid
}

export function addSubscription(user, post) {
    user.subscriptions.push(post);
}

export function getsubscriptions(id) {
    return getUser(id).subscriptions
}

export function getUserPosts(id) {
    return getUser(id).posts; 
}

export function deletePost(pid){
    posts.delete(pid);
}

export function getPosts(){
    return [...posts.values()];
}

export function getPost(pid){
    return posts.get(pid);
}


export function addComment(pid, comment) {
    let post = getPost(pid);
    post.comments.push(comment);   
}

///////estudiantes
export function addPoste(poste) {
    let pid = postId_e++;
    poste.pid = pid.toString();
    posts_e.set(poste.pid, poste);
    let user = getUser(poste.id);
    if (user) {
        user.posts.push(poste); 
    }
    return pid
}

export function deletePoste(pid){
    posts_e.delete(pid);
}

export function getPostse(){
    return [...posts_e.values()];
}

export function getPoste(pid){
    return posts_e.get(pid);
}

addPost({
    company_name: "DevSolutions",
    job_title: "Desarrollador de Software Junior",
    job_subtitle: "Únete a nuestro equipo y ayuda a construir soluciones innovadoras",
    job_description: "Estamos buscando un Desarrollador Junior para unirse a nuestro equipo de desarrollo. El candidato ideal debe tener conocimientos básicos en lenguajes de programación y estar dispuesto a aprender tecnologías nuevas.",
    salary: 45000.00,
    job_category: "Desarrollador de Software",
    job_requirements: "Conocimientos en JavaScript, HTML, CSS. Deseable experiencia en frameworks como React o Angular.",
    location: "Remoto",
    job_duration: "Tiempo Completo",
    posting_date: "2024-11-11",
    image_url: "https://oregoom.com/wp-content/uploads/2024/04/etiqueta-img-en-html.webp"
});

addPost({
    company_name: "TechInnovate",
    job_title: "Ingeniero de Datos",
    job_subtitle: "Impulsa la toma de decisiones mediante datos precisos y procesables",
    job_description: "Estamos en busca de un Ingeniero de Datos para diseñar, construir y mantener canalizaciones de datos que permitan a nuestros analistas y científicos de datos acceder a información de calidad. Experiencia en SQL, Python y Spark es deseable.",
    salary: 65000.00,
    job_category: "Ingeniería de Datos",
    job_requirements: "Conocimientos en SQL, Python, ETL y herramientas de big data. Experiencia con bases de datos como MySQL o PostgreSQL.",
    location: "Híbrido - Ciudad de México",
    job_duration: "Tiempo Completo",
    posting_date: "2024-11-11",
    image_url: "https://media.licdn.com/dms/image/v2/C4E12AQFLBrRef2OcwQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1568670195970?e=2147483647&v=beta&t=JtgKexab0CQSXUnQm38hwV8dOO0Fy8o-Jo0bmg227DA"
});

addPost({
    company_name: "GreenEnergy Solutions",
    job_title: "Analista de Energía Renovable",
    job_subtitle: "Colabora en proyectos de energía limpia y sostenible",
    job_description: "Buscamos un Analista de Energía Renovable para apoyar en el análisis de datos de producción y consumo de energía, contribuyendo a optimizar la eficiencia de nuestros proyectos de energía limpia. Conocimientos en energía solar y eólica son un plus.",
    salary: 55000.00,
    job_category: "Análisis de Energía",
    job_requirements: "Experiencia en análisis de datos y conocimiento en energías renovables. Familiaridad con software de análisis de datos y simulación.",
    location: "Presencial - Bogotá",
    job_duration: "Tiempo Completo",
    posting_date: "2024-11-11",
    image_url: "https://www.bbva.com/wp-content/uploads/2021/03/energi%CC%81a_renovable_apertura-paneles-sostenible-panel-solar-eolica-molinos-medioambiente-1024x629.jpg"
});

addPost({
    company_name: "HealthTech Labs",
    job_title: "Desarrollador Full Stack",
    job_subtitle: "Desarrolla aplicaciones innovadoras en el sector de salud",
    job_description: "Únete a nuestro equipo como Desarrollador Full Stack y ayuda a crear aplicaciones web para mejorar la experiencia de los pacientes y el personal médico. Buscamos a alguien con experiencia en desarrollo frontend y backend.",
    salary: 72000.00,
    job_category: "Desarrollo Web",
    job_requirements: "Conocimientos en JavaScript, Node.js, React y bases de datos NoSQL. Experiencia en desarrollo de aplicaciones de salud es una ventaja.",
    location: "Remoto",
    job_duration: "Tiempo Completo",
    posting_date: "2024-11-11",
    image_url: "https://d2ms8rpfqc4h24.cloudfront.net/Guide_to_Full_Stack_Development_000eb0b2d0.jpg"
});

addPoste({
    full_name: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "+34 612 345 678",
    location: "Madrid, España",
    profile_picture_url: "https://media.istockphoto.com/id/639805094/es/foto/hombre-feliz.jpg?s=612x612&w=0&k=20&c=dAXM6152vs5VrUPEQs2a7iozp8alzFBKXN6-8M2tv6o=",
    education: "Ingeniería Informática, Universidad de Madrid. Cursando el último año de la carrera con un enfoque en desarrollo de software y algoritmos.",
    work_experience: "Desarrollador Junior en XYZ Tech, 1 año de experiencia en desarrollo web, trabajando en proyectos de frontend utilizando JavaScript, React y HTML/CSS.",
    skills: "JavaScript, React, HTML, CSS, Node.js, Git, Firebase, desarrollo ágil con Scrum",
    languages: "Español (nativo), Inglés (avanzado)",
    title: "Desarrollador de Software Junior"
});

addPoste({
    full_name: "Ana García",
    email: "ana.garcia@example.com",
    phone: "+34 698 765 432",
    location: "Barcelona, España",
    profile_picture_url: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?cs=srgb&dl=pexels-hannah-nelson-390257-1065084.jpg&fm=jpg",
    education: "Licenciatura en Diseño Gráfico, Universidad de Barcelona. Especialización en diseño de interfaces interactivas y experiencia de usuario (UX/UI).",
    work_experience: "Diseñadora UX/UI en Creativa Studio, 3 años de experiencia en diseño de interfaces, desarrollo de prototipos y mejora de la experiencia de usuario en plataformas digitales.",
    skills: "Figma, Adobe XD, Sketch, HTML, CSS, prototipado rápido, investigación de usuarios, diseño inclusivo, pruebas de usabilidad",
    languages: "Español (nativo), Inglés (intermedio)",
    title: "Diseñadora UX/UI"
});

addPoste({
    full_name: "Carlos Fernández",
    email: "carlos.fernandez@example.com",
    phone: "+34 623 890 123",
    location: "Valencia, España",
    profile_picture_url: "https://png.pngtree.com/thumb_back/fw800/background/20220416/pngtree-businessman-real-people-one-person-suit-photo-photo-image_36091008.jpg",
    education: "Máster en Administración de Empresas, Universidad Politécnica de Valencia. Con enfoque en marketing digital, gestión de proyectos y estrategias comerciales.",
    work_experience: "Consultor de Marketing Digital en Marketing Pro, 2 años de experiencia en estrategia digital, gestión de campañas de Google Ads, SEO y análisis de datos.",
    skills: "SEO, Google Ads, Marketing de contenidos, Redes Sociales, análisis de datos, automatización de marketing, marketing de influencia",
    languages: "Español (nativo), Inglés (básico)",
    title: "Consultor de Marketing Digital"
});

addPoste({
    full_name: "Laura Rodríguez",
    email: "laura.rodriguez@example.com",
    phone: "+34 635 456 789",
    location: "Sevilla, España",
    profile_picture_url: "https://media.istockphoto.com/id/1153955734/es/foto/feliz-sonriente-mujer-afroamericana-en-vestimenta-formal-de-negocios.jpg?s=612x612&w=0&k=20&c=E7KgYSC66cnqSL_mYFbwDgITrNrsZ-YX7muDPHVMPNc=",
    education: "Licenciatura en Psicología, Universidad de Sevilla. Formación adicional en coaching organizacional y evaluación de competencias laborales.",
    work_experience: "Gestora de Recursos Humanos en Recursos Humanos & Co., 4 años de experiencia en selección de personal, diseño de estrategias de bienestar y desarrollo organizacional.",
    skills: "Selección de personal, Evaluación psicológica, Coaching, formación de equipos, gestión de conflictos, liderazgo y motivación de equipos",
    languages: "Español (nativo), Inglés (avanzado)",
    title: "Gestora de Recursos Humanos"
});

addUser({ name: "Ana García", email: "ana.garcia@example.com", password: "password123", foto: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?cs=srgb&dl=pexels-hannah-nelson-390257-1065084.jpg&fm=jpg", ubicación: "Barcelona, España", nacimiento: "1995-08-15", estudios: "Licenciatura en Diseño Gráfico, Universidad de Barcelona", trabajos: "Diseñadora UX/UI en Creativa Studio", userType: "empresa" });