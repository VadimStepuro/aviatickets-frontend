import { createContext, useReducer} from "react";

export const TicketRequestContext = createContext();

export const TicketRequestDispatcher = createContext();

export default function TicketRequestProvider({children}){
    const [state, dispatch] = useReducer(ticketRequestReducer, {
        request:null
    })

    return(
        <TicketRequestContext.Provider value={state.request}>
            <TicketRequestDispatcher.Provider value={dispatch}>
                {children}
            </TicketRequestDispatcher.Provider>
        </TicketRequestContext.Provider>
    )
}

function ticketRequestReducer(state, action){
    switch(action.type){
        case 'change_request':{
            return {...state, request: action.item}
        }
        case 'delete_request': {
            return {...state, request: null}
        }
        default:
            throw new Error('Unknown action' + action.type);
    }
}