import * as service from '../src/Service.js'
 
/* const form=document.getElementById('form-login')
const button=document.getElementById('button-login') */

export function getValidation(email){


    const users= service.getUsers();
    const isregistered= users.find(user => user.email===email)
    if(isregistered){
        return false;
    }
    return true;
    
}
/*
const formu=document.getElementById('form-login')
const buton=document.getElementById('button-loginn')

buton.addEventListener('click', (e) =>{
    e.preventDefault()
    const email=document.getElementById('email-loginn').value
    const password=document.getElementById('password-loginn').value
    const isregistered= users.find(user => user.email===email && user.password===password)
    if(!isregistered){
        return alert ('No existe este usuario')
    }
    alert("Exito")
    
}) */