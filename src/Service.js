/// USERS

export const users= new Map();
let nextId = 0;

export function addUser(user){
    let id= nextId++;
    user.id=id.toString();
    user.posts = []; // Agregar un array vacío para almacenar los posts del usuario
    users.set(user.id,user);
    return user.id;
}

//EJEMPLO

// CASO PRUEBA EJEMPLO ESTUDIANTE

 addUser( {
    name: "Johnathan Smith",
    email: "john.smith@gmail.com",
    password: "mypassword123",  // Al menos 10 caracteres
    foto: "https://www.clarin.com/2023/12/01/rhVeUAooY_2000x1500__1.jpg",
    ubicación: "New York, USA", // Al menos 10 caracteres
    nacimiento: "1990-04-15",   // Fecha de nacimiento en formato "YYYY-MM-DD"
    estudios: "Computer Science Degree",  // Al menos 10 caracteres
    trabajos: "Software Developer at XYZ Corp",  // Al menos 10 caracteres
    userType: "estudiante"
}); 

//CASO PRUEBA EJEMPLO EMPRESA

addUser({name: "Innovative Solutions LLC",
    email: "contact@gmail.com",
    password: "securepassword456",  // Al menos 10 caracteres
    foto: "https://media.revistagq.com/photos/621343d2c789a63cc825a58b/16:9/w_2367,h_1331,c_limit/virgen%20a%20lo%2040.jpeg",
    ubicación: "San Francisco, California", // Al menos 10 caracteres
    nacimiento: "2010-07-20",   // Fecha de creación de la empresa en formato "YYYY-MM-DD"
    estudios: "Business and Tech Training",  // Al menos 10 caracteres
    trabajos: "Software and IT Services",  // Al menos 10 caracteres
    userType: "empresa"
}) 

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

export function editUser(id, updatedData){

    let user= users.get(id);
    if (user) {
        Object.assign(user, updatedData);
        return user;
    }
    return null;

}


//POSTS
const posts = new Map();
let postId = 0;
const posts_e = new Map();
let postId_e = 0;

export function addPost(post, pid) {
    if (!pid) {
        pid = postId++;
    }
    post.comments = [];
    post.pid = pid.toString();

    // Guarda el post en el mapa global
    posts.set(post.pid, post);
    
    const user = getUser(post.id);
    if (user) {
        if (!user.posts) {
            user.posts = [];
        }

        // Verifica si ya existe el post en la lista del usuario antes de añadirlo
        const existingIndex = user.posts.findIndex(p => p.pid === post.pid);
        if (existingIndex === -1) {
            user.posts.push(post); 
        }
    }
    
    return pid;
}


export function getUserPosts(id) {
    return getUser(id).posts; 
}

export function deletePost(pid) {
    if (!posts.has(pid)) {
        return false; 
    }

    const post = posts.get(pid);
    posts.delete(pid);

    const user = getUser(post.id);
    if (user && Array.isArray(user.posts)) {
        const postIndex = user.posts.findIndex(p => p.pid === pid);
        if (postIndex !== -1) {
            user.posts.splice(postIndex, 1);
        }
    }

    return true; 
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
export function addPoste(poste,pid) {

    if (!pid) {
        pid = postId_e++;
    }
    poste.pid = pid.toString();
    posts_e.set(poste.pid, poste);
    let user = getUser(poste.id);
    if (user) {
        if (!user.posts) {
            user.posts = [];
        }

        // Verifica si ya existe el post en la lista del usuario antes de añadirlo
        const existingIndex = user.posts.findIndex(p => p.pid === poste.pid);
        if (existingIndex === -1) {
            user.posts.push(poste); 
        }
    }
    return pid
}

export function deletePoste(pid){
    if (!posts_e.has(pid)) {
        return false; 
    }

    const post = posts_e.get(pid);
    posts_e.delete(pid);

    const user = getUser(post.id);
    if (user && Array.isArray(user.posts)) {
        const postIndex = user.posts.findIndex(p => p.pid === pid);
        if (postIndex !== -1) {
            user.posts.splice(postIndex, 1); 
        }
    }

    return true; 
}

export function getPostse(){
    return [...posts_e.values()];
}

export function getPoste(pid){
    return posts_e.get(pid);
}



addPost({
    company_name: "FinTech Vision",
    job_title: "Especialista en Seguridad Informática",
    job_subtitle: "Protege nuestros sistemas financieros y la información de los clientes",
    job_description: "Estamos buscando un Especialista en Seguridad Informática para desarrollar y mantener estrategias que aseguren la integridad y confidencialidad de nuestros sistemas.",
    salary: 85000.00,
    job_category: "Seguridad Informática",
    job_requirements: "Conocimientos avanzados en ciberseguridad, criptografía, y detección de vulnerabilidades. Certificaciones como CISSP o CEH son un plus.",
    location: "Híbrido - Madrid",
    job_duration: "Tiempo Completo",
    posting_date: "2024-11-11",
    image_url: "https://www.grupocibernos.com/hubfs/expertos-ciberseguridad.jpg"
});

addPost({
    company_name: "QuantumTech",
    job_title: "Ingeniero de Software para IoT",
    job_subtitle: "Desarrolla soluciones innovadoras para dispositivos conectados",
    job_description: "Estamos en busca de un Ingeniero de Software especializado en IoT para diseñar y programar sistemas que integren dispositivos inteligentes y aplicaciones.",
    salary: 88000.00,
    job_category: "Internet de las Cosas",
    job_requirements: "Experiencia en C/C++, Python y protocolos IoT (MQTT, CoAP). Conocimiento en desarrollo de firmware es deseable.",
    location: "Híbrido - Berlín",
    job_duration: "Tiempo Completo",
    posting_date: "2024-11-11",
    image_url: "https://www.cloudblue.com/wp-content/uploads/2024/06/what-is-the-internet-of-things-iot.png"
});

addPost({
    company_name: "Robotics Inc.",
    job_title: "Ingeniero en Robótica",
    job_subtitle: "Diseña e implementa soluciones robóticas innovadoras",
    job_description: "Únete a nuestro equipo para desarrollar sistemas robóticos avanzados que combinen hardware y software de manera eficiente.",
    salary: 93000.00,
    job_category: "Robótica",
    job_requirements: "Conocimientos en ROS, Python, y diseño mecánico. Experiencia en visión por computadora es una ventaja.",
    location: "Presencial - Tokio",
    job_duration: "Tiempo Completo",
    posting_date: "2024-11-11",
    image_url: "https://www.santanderopenacademy.com/es/blog/robotica-colaborativa/_jcr_content/root/hero/imageDesktopLG.coreimg.jpeg/1712566730587/robotica-colaborativa-1.jpeg"
});

addPost({
    company_name: "Cloudify Solutions",
    job_title: "Ingeniero DevOps",
    job_subtitle: "Optimiza y automatiza la infraestructura de nuestros servicios en la nube",
    job_description: "Buscamos un Ingeniero DevOps para implementar prácticas de integración y entrega continua, asegurando el rendimiento y la escalabilidad de nuestros sistemas.",
    salary: 90000.00,
    job_category: "DevOps",
    job_requirements: "Experiencia en AWS, Docker, Kubernetes y herramientas CI/CD como Jenkins o GitLab. Conocimientos en scripting (Python, Bash) son esenciales.",
    location: "Remoto",
    job_duration: "Tiempo Completo",
    posting_date: "2024-11-11",
    image_url: "https://www.strongdm.com/hubfs/devops-security.png"
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


addPost({
    company_name: "AI NextGen",
    job_title: "Especialista en Machine Learning",
    job_subtitle: "Desarrolla modelos de aprendizaje automático que impulsen la innovación",
    job_description: "Únete a nuestro equipo como Especialista en Machine Learning para diseñar y entrenar modelos que resuelvan problemas complejos en diferentes industrias.",
    salary: 95000.00,
    job_category: "Inteligencia Artificial",
    job_requirements: "Experiencia con Python, TensorFlow, PyTorch y bibliotecas de machine learning. Conocimientos en procesamiento de datos y algoritmos de optimización.",
    location: "Híbrido - San Francisco",
    job_duration: "Tiempo Completo",
    posting_date: "2024-11-11",
    image_url: "https://designindc.com/wp-content/uploads/2022/12/Machine-Learning.jpg"
});

addPost({
    company_name: "EduTech Global",
    job_title: "Diseñador de UX/UI",
    job_subtitle: "Crea experiencias de usuario intuitivas y atractivas para la educación",
    job_description: "Buscamos un Diseñador de UX/UI que colabore con nuestro equipo para desarrollar interfaces educativas innovadoras que sean fáciles de usar y visualmente impactantes.",
    salary: 65000.00,
    job_category: "Diseño UX/UI",
    job_requirements: "Dominio de herramientas de diseño como Figma, Sketch o Adobe XD. Conocimientos en pruebas de usabilidad y diseño centrado en el usuario.",
    location: "Presencial - Barcelona",
    job_duration: "Tiempo Completo",
    posting_date: "2024-11-11",
    image_url: "https://weareshifta.com/wp-content/uploads/diseno-ux-1.jpg"
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
    full_name: "Pablo Moreno",
    email: "pablo.moreno@example.com",
    phone: "+34 620 678 123",
    location: "Santander, España",
    profile_picture_url: "https://img.freepik.com/premium-photo/portrait-smiling-young-male-office-employee-working-laptop_116547-25535.jpg",
    education: "Licenciatura en Matemáticas, Universidad de Cantabria. Especialización en modelado matemático y simulación computacional.",
    work_experience: "Modelador Matemático en SimuTech, 3 años de experiencia en desarrollo de modelos matemáticos aplicados a la industria energética.",
    skills: "Modelado matemático, simulación, MATLAB, Python, optimización, análisis de sistemas",
    languages: "Español (nativo), Inglés (intermedio)",
    title: "Modelador Matemático"
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

addPoste({
    full_name: "Sofía Martínez",
    email: "sofia.martinez@example.com",
    phone: "+34 679 321 654",
    location: "Granada, España",
    profile_picture_url: "https://institutosantalucia.es/wp-content/uploads/2020/10/caracteristicas-de-las-mujeres-trabajadoras.jpg",
    education: "Licenciatura en Ciencias de la Computación, Universidad de Granada. Especialización en inteligencia artificial y aprendizaje automático.",
    work_experience: "Analista de Datos en DataLab Solutions, 2 años de experiencia en análisis predictivo y visualización de datos utilizando Python y Tableau.",
    skills: "Python, R, SQL, Tableau, Power BI, aprendizaje automático, análisis estadístico",
    languages: "Español (nativo), Inglés (intermedio)",
    title: "Analista de Datos"
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
    full_name: "Miguel López",
    email: "miguel.lopez@example.com",
    phone: "+34 654 789 012",
    location: "Bilbao, España",
    profile_picture_url: "https://img.freepik.com/fotos-premium/joven-trabajador-oficina-masculino-lugar-trabajo_1301-2824.jpg",
    education: "Máster en Ingeniería Industrial, Universidad del País Vasco. Formación adicional en gestión de proyectos y diseño de procesos industriales.",
    work_experience: "Ingeniero de Procesos en Industria Vasca, 3 años de experiencia en optimización de procesos de producción y diseño de líneas automatizadas.",
    skills: "Lean Manufacturing, AutoCAD, SolidWorks, gestión de proyectos, Six Sigma, análisis de datos industriales",
    languages: "Español (nativo), Inglés (básico)",
    title: "Ingeniero de Procesos"
});

addPoste({
    full_name: "Isabel Torres",
    email: "isabel.torres@example.com",
    phone: "+34 622 567 890",
    location: "Málaga, España",
    profile_picture_url: "https://img.freepik.com/foto-gratis/imagen-joven-trabajadora-asiatica-anteojos-sonriendo-sosteniendo-tableta-digital-pie-sobre-fondo-blanco_1258-89376.jpg",
    education: "Licenciatura en Comunicación Audiovisual, Universidad de Málaga. Enfocada en producción de contenido digital y estrategias multimedia.",
    work_experience: "Productora Multimedia en MediaHouse, 5 años de experiencia en producción audiovisual, edición de video y desarrollo de campañas digitales.",
    skills: "Adobe Premiere, After Effects, Final Cut Pro, storytelling, diseño gráfico, estrategia de contenido digital",
    languages: "Español (nativo), Inglés (avanzado)",
    title: "Productora Multimedia"
});

addPoste({
    full_name: "Raúl Sánchez",
    email: "raul.sanchez@example.com",
    phone: "+34 617 456 987",
    location: "Zaragoza, España",
    profile_picture_url: "https://img.freepik.com/foto-gratis/joven-practicas_23-2149315589.jpg",
    education: "Grado en Ingeniería Electrónica, Universidad de Zaragoza. Especializado en sistemas embebidos y desarrollo de hardware.",
    work_experience: "Ingeniero Electrónico en TechEmbed, 2 años de experiencia en diseño y prueba de circuitos electrónicos para dispositivos IoT.",
    skills: "C/C++, diseño PCB, programación de microcontroladores, MATLAB, diseño de hardware",
    languages: "Español (nativo), Inglés (intermedio)",
    title: "Ingeniero Electrónico"
});


addPoste({
    full_name: "Elena Gutiérrez",
    email: "elena.gutierrez@example.com",
    phone: "+34 610 234 678",
    location: "Valladolid, España",
    profile_picture_url: "https://img.freepik.com/fotos-premium/trabajadora-joven-sienta-oficina-casa-leyendo-documento-papel-o-contrato-freelancer-hermosa-mujer-que-toma-nota-informacion-planificacion-proyecto-haciendo-trabajo-remoto-traves-computadora-portatil_1212-3819.jpg",
    education: "Máster en Biotecnología, Universidad de Valladolid. Con experiencia en investigación y desarrollo de productos biotecnológicos.",
    work_experience: "Investigadora en BioTech Labs, 4 años de experiencia en análisis de datos biológicos, desarrollo de pruebas clínicas y biología molecular.",
    skills: "Biología molecular, análisis genético, desarrollo de ensayos clínicos, R&D, Python para biología",
    languages: "Español (nativo), Inglés (básico)",
    title: "Investigadora en Biotecnología"
});





export function editPoste(pid, updatedPost) {
    
    if (!posts_e.has(pid)) {
        console.log('Post no encontrado para editar');
        return false;
    }

   
    const originalPost = posts_e.get(pid);

    deletePoste(pid);

    updatedPost.pid = pid;

    updatedPost.id = originalPost.id;

    addPoste(updatedPost, pid);

    return true; 
}

export function editPost(pid, updatedPost) {
    
    if (!posts.has(pid)) {
        console.log('Post no encontrado para editar');
        return false;
    }

   
    const originalPost = posts.get(pid);

   
    deletePost(pid);

    
    updatedPost.pid = pid;

   
    updatedPost.id = originalPost.id;

   
    addPost(updatedPost, pid);

    return true; 
}


