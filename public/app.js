import * as service from '../src/Service.js'
 

export function getValidation(email,name){


    const users= service.getUsers();
    const isregistered= users.find(user => user.email===email && user.name===name)
    if(isregistered){
        return false;
    }
    return true;
    
}

export function getValidationLogin(email,password){


    const users= service.getUsers();
    const isregistered= users.find(user => user.email===email && user.password===password)
    if(!isregistered){
        return false;
    }
    return true;
    
}


