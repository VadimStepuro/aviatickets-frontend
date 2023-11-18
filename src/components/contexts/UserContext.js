import { createContext, useReducer } from "react";

export const LoginContext = createContext();

export const LoginDispatch = createContext();

export default function LoginContextProvider({children, initialUser}){
    const [state, dispatch] = useReducer(UserReducer, {
        login: initialUser,
        user: initialUser
    })

    return(
        <div>
            <LoginContext.Provider value={state}>
                <LoginDispatch.Provider value={dispatch}>
                    {children}
                </LoginDispatch.Provider>
            </LoginContext.Provider>
        </div>
    )
}

function UserReducer(state, action){
    switch(action.type){
        case 'CHANGE_LOGIN':{
            return {...state, login: action.item}
        }
        case 'REMOVE_LOGIN':{
            return {...state, login: undefined}
        }
        case 'CHANGE_USER':{
            return {...state, user: action.item}
        }
        case 'REMOVE_USER':{
            return {...state, user: undefined}
        }

        default:{
            throw new Error("Unknown action: " + action.type);
        }
    }
}
