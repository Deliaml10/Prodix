export const users= new Map();
let nextId = 0;

export function addUser(user){
    let id= nextId++;
    user.id=id.toString();
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
