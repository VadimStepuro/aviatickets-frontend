import { loginUser, register } from "../../api/apiCalls";

export function LoginHandler(user){

    loginUser({
        login:user.login,
        password:user.password
    })
}

export function RegisterHandler(user){
    console.log(user);
    register({
        login:user.login,
        password:user.password,
        weight:user.weight,
        height:user.height,
        birthdate:user.birthdate
    })
}